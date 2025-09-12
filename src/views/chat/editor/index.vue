<template>
  <div
    v-show="!isMultiSelectMode"
    v-if="isChatBoxVisible"
    id="editor"
    class="wangeditor"
    :class="{ 'wang-h-full': isFullscreenInputActive }"
  >
    <Inputbar />
    <Editor
      v-model="valueHtml"
      class="editor-content"
      :mode="mode"
      :default-config="editorConfig"
      @drop="handleDrop"
      @on-change="handleEditorChange"
      @on-created="handleEditorCreated"
      @custom-paste="handlePaste"
      @custom-alert="customAlert"
      @keyup.enter="handleEnter"
    />
    <!-- @提及弹框 -->
    <MentionModal v-if="isMentionModalVisible" pinyin-search :is-owner="isOwner" :editor="editorRef" />
    <div class="send-button">
      <span class="tip">{{ placeholderMap[getOperatingSystem()] }}</span>
      <el-button :loading="isSending" :class="{ 'pointer-events-none': disabled }" @click="handleEnter">
        <template #loading>
          <div class="iconify-icon svg-spinners mr-8"></div>
        </template>
        <span> {{ $t("chat.sending") }} </span>
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onActivated, onBeforeUnmount, onDeactivated, onMounted, ref, shallowRef, watch } from "vue"
import { Editor } from "@wangeditor/editor-for-vue"

import { debounce } from "lodash-es"
import { storeToRefs } from "pinia"

import MentionModal from "@/components/Chat/MentionModal.vue"
import { useState } from "@/hooks/useState"
import { useChatStore, useGroupStore } from "@/stores"
import { bytesToSize, fileToBase64, insertMention } from "@/utils/chat"
import { isMobile } from "@/utils/common"
import { getOperatingSystem } from "@/utils/common"
import emitter from "@/utils/mitt-bus"

import Inputbar from "../Inputbar/index.vue"
import { editorConfig, placeholderMap } from "../utils/configure"
import {
  extractAitInfo,
  extractEmojiInfo,
  extractFilesInfo,
  extractImageInfo,
  // extractVideoInfo,
  filterMentionList,
  sendChatMessage,
} from "../utils/utils"
import { createMediaElement, customAlert, handleAssistantFile, handleEditorKeyDown, insertEmoji } from "./utils"

import type { DraftData } from "@/types"
import type { IDomEditor } from "@wangeditor/editor"

import "../utils/custom-menu"
import "@/styles/wangeditor/index.css"

const MAX_FILE_SIZE_MB = 100
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024
const mode = "simple"
const editorRef = shallowRef<IDomEditor>()
const valueHtml = ref("")

const [disabled, setDisabled] = useState(false)

const chatStore = useChatStore()
const groupStore = useGroupStore()

const { isOwner } = storeToRefs(groupStore)
const {
  isSending,
  isGroupChat,
  toAccount,
  isAssistant,
  currentType,
  isMultiSelectMode,
  isChatBoxVisible,
  isMentionModalVisible,
  isFullscreenInputActive,
  currentSessionId,
  replyMsgData,
} = storeToRefs(chatStore)

const handleEditorCreated = (editor: IDomEditor) => {
  if (!editor) return
  editorRef.value = editor
}

const destroyEditor = (editor: IDomEditor | undefined) => {
  editor?.destroy()
}

const handleAt = ({ id, name }) => {
  insertMention({ id, name, backward: false, editor: editorRef.value })
}

const handleSetHtml = (html: string) => {
  if (!html) return
  editorRef.value?.insertNode({ text: html })
  editorRef.value?.focus(true)
}

const handleInsertDraft = (option) => {
  const { sessionId } = option
  const editor = editorRef.value
  if (!sessionId || !editor) return
  if (!isMobile) editor.focus(true)
  clearInput()
  const draft = chatStore.chatDraftMap.get(sessionId)
  if (!draft) return
  draft?.forEach((t) => editor.insertNode(t.children))
}

const handleToolbarAction = ({ data, key }) => {
  const editor = editorRef.value
  if (!editor) return

  const actions = {
    setEmoji: () => insertEmoji(data, editor),
    setPicture: () => handleFiles(data.files, "image"),
    setParseFile: () => handleFiles(data.files, "file"),
    setEditHtml: () => handleSetHtml(data),
  }

  actions[key]?.()
}

const handleFileViewer = (data) => {
  console.log("handleFileViewer", data)
}

const updateDraft = debounce((data: DraftData) => {
  chatStore.updateChatDraft({ ID: currentSessionId.value, payload: data })
}, 300)

const handleAtMention = debounce((editor) => {
  if (isGroupChat.value) {
    filterMentionList({
      str: editor.getText(),
      list: groupStore.currentMembersWithoutSelf,
    })
  }
}, 100)

const handleEditorChange = (editor: IDomEditor) => {
  setDisabled(editor.isEmpty())
  updateDraft(editor.children)
  handleAtMention(editor)
}

const handleFiles = async (file: File | null, type: "image" | "file" = "file") => {
  const editor = editorRef.value
  if (!editor) throw new Error("editor is not ready")
  if (!file) throw new Error("file is not ready")

  if (isAssistant.value) {
    return handleAssistantFile(file, editor)
  }

  try {
    const base64Url = await fileToBase64(file)

    editor.restoreSelection()

    if (type === "image") {
      const imageElement = createMediaElement("image", {
        src: base64Url,
        fileName: file.name,
        style: { width: "125px" },
      })
      editor.insertNode(imageElement)
    } else if (type === "file") {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        window.$message?.warning(`文件不能大于${MAX_FILE_SIZE_MB}MB`)
        return
      }
      const fileElement = createMediaElement("attachment", {
        fileName: file.name,
        fileSize: bytesToSize(file.size),
        link: base64Url,
        path: file?.path || "",
      })
      editor.insertNode(fileElement)
    }

    editor.move(1)
  } catch (error) {
    console.error(`${type}处理错误:`, error)
    window.$message?.error(`${type}处理失败`)
  }
}

const handleString = (item: DataTransferItem, editor: IDomEditor) => {
  if (item.type === "text/plain") {
    item.getAsString((str) => {
      editor.insertText(str.trimStart())
      console.log("handleString text/plain:", str)
    })
  } else if (item.type === "text/html") {
    item.getAsString((html) => {
      console.log("handleString text/html:", html)
    })
  }
}

const handlePaste = (editor: IDomEditor, event: ClipboardEvent, callback?: Function) => {
  console.log("text/plain:", event?.clipboardData?.getData("text/plain"))
  const clipboardItems = Array.from(event?.clipboardData?.items || [])

  clipboardItems.forEach((item) => {
    if (item.kind === "file") {
      handleFiles(item.getAsFile(), item.type.match("^image/") ? "image" : "file")
    } else if (item.kind === "string") {
      handleString(item, editor)
    }
  })

  event.preventDefault()
  callback?.(false)
}

const handleDrop = (event: DragEvent) => {
  if (event?.dataTransfer?.getData("text/plain")) {
    return
  }

  const droppedFiles = Array.from(event.dataTransfer?.files || [])
  droppedFiles.forEach((file) => handleFiles(file, file.type.match("^image/") ? "image" : "file"))

  event.preventDefault()
}

const handleEnter = async (event: MouseEvent) => {
  if (isSending.value || event?.ctrlKey) return

  if (isMentionModalVisible.value) {
    emitter.emit("handleInputKeyupHandler", event)
    return
  }

  const messageData = prepareMessageData()
  messageData.isHave ? await sendMessage(messageData) : clearInput()
}

const clearInput = () => {
  chatStore.setReplyMsgData(null)
  chatStore.$patch({ isFullscreenInputActive: false })
  editorRef.value?.clear()
}

const prepareMessageData = () => {
  const editor = editorRef.value
  if (!editor) throw new Error("Editor reference is required")

  const text = editor.getText().trim()
  const extractions = {
    ...extractAitInfo(editor),
    ...extractFilesInfo(editor),
    // ...extractVideoInfo(editor),
    ...extractImageInfo(editor),
  }
  const { aitStr = "", atUserList = [], files = [], video = [], images = [] } = extractions
  const emoticons = extractEmojiInfo(editor)

  const hasContent = [
    // video.length,
    images.length,
    files.length,
    atUserList.length,
    aitStr,
    emoticons,
    text,
  ].some(Boolean)

  const finalText = emoticons || text

  return {
    to: toAccount.value,
    type: currentType.value,
    text: finalText,
    aitStr: atUserList.length ? emoticons || aitStr : "",
    atUserList,
    images,
    files,
    // video,
    custom: replyMsgData.value,
    isHave: hasContent,
  }
}

const sendMessage = async (data) => {
  try {
    const message = await sendChatMessage(data)
    clearInput()
    chatStore.updateSendingState(data.to, "add")
    message.forEach((msg, index) => {
      chatStore.sendSessionMessage({
        message: msg,
        last: index === message.length - 1,
      })
    })
  } catch (error) {
    console.error("Send message failed:", error)
    window.$message?.error("发送消息失败")
  }
}

const handleScreenCapture = (url) => {
  const imageElement = createMediaElement("image", { src: url, style: { width: "125px" } })
  editorRef.value?.insertNode(imageElement)
}

const setupEventListeners = () => {
  const events = {
    handleSetHtml: handleSetHtml,
    handleInsertDraft: handleInsertDraft,
    handleToolbar: handleToolbarAction,
    handleFileViewer: handleFileViewer,
    handleScreenCapture: handleScreenCapture,
  }

  Object.entries(events).forEach(([event, handler]) => {
    emitter.on(event, handler)
  })

  emitter.on("handleAt", handleAt)
  emitter.on("handleFileDrop", handleFiles)
}

const removeEventListeners = () => {
  Object.keys({
    handleAt: null,
    handleSetHtml: null,
    handleInsertDraft: null,
    handleFileDrop: null,
    handleToolbar: null,
    handleFileViewer: null,
    handleScreenCapture: null,
  }).forEach((event) => emitter.off(event))
}

watch(isChatBoxVisible, () => {
  handleEditorKeyDown(isMentionModalVisible.value)
})
// watch(lang, () => {
//   handleToggleLanguage();
// });
onActivated(() => {
  handleEditorKeyDown(isMentionModalVisible.value)
})
onMounted(() => {
  setupEventListeners()
})
onDeactivated(() => {
  removeEventListeners()
})
onBeforeUnmount(() => {
  destroyEditor(editorRef.value)
})
</script>

<style lang="scss" scoped>
.wang-h-full {
  height: calc(100% - 60px) !important;
}
.wangeditor {
  position: relative;
  z-index: 2;
  word-break: break-all;
  border-top: 1px solid var(--color-border-default);
  height: 200px;
  display: flex;
  flex-direction: column;
  .editor-content {
    flex: 1;
    overflow-y: hidden;
  }
  .send-button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0px 10px 10px;
    gap: 8px;
    user-select: none;
    .tip {
      font-size: 12px;
    }
    span {
      color: rgb(153, 153, 153);
    }
  }
}
</style>
