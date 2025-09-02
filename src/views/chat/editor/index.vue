<template>
  <div
    v-show="!isMultiSelectMode"
    v-if="isChatBoxVisible"
    id="editor"
    class="wangeditor"
    :class="{ 'wang-h-full': isFullscreenInputActive }"
  >
    <!-- 自定义工具栏 -->
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
import "../utils/custom-menu"
import "@/styles/wangeditor/index.css"

import { Editor } from "@wangeditor/editor-for-vue"
import { debounce } from "lodash-es"

import MentionModal from "@/components/Chat/MentionModal.vue"
import { useState } from "@/hooks/useState"
import { useChatStore, useGroupStore } from "@/stores"
import { bytesToSize, fileToBase64, getFileType, insertMention } from "@/utils/chat"
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
import { createMediaElement, customAlert, handleEditorKeyDown, isTextFile } from "./utils"

const MAX_FILE_SIZE_MB = 100
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024
const mode = "simple"
const editorRef = shallowRef()
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

const handleEditorCreated = (editor) => {
  if (!editor) return
  editorRef.value = editor
}

const destroyEditor = (editor) => {
  editor?.destroy()
}

const insertEmoji = (url, item) => {
  const editor = editorRef.value
  const data = createMediaElement("image", {
    class: "EmoticonPack",
    src: url,
    alt: item,
    style: { width: "26px" },
  })
  editor.restoreSelection()
  editor.insertNode(data)
  editor.focus(true)
}

const insertContent = {
  draft: ({ sessionId }) => {
    const editor = editorRef.value
    if (!sessionId || !editor) return
    if (!isMobile) editor.focus(true)
    clearInput()
    const draft = chatStore.chatDraftMap.get(sessionId)
    draft?.forEach((t) => editor.insertNode(t.children))
  },
  html: (text) => {
    if (!text) {
      console.warn("text is empty")
      return
    }
    editorRef.value?.insertNode({ text })
    editorRef.value?.focus(true)
  },
  mention: ({ id, name }) => {
    insertMention({ id, name, backward: false, editor: editorRef.value })
  },
}

const handleToolbarAction = ({ data, key }) => {
  const editor = editorRef.value
  if (!editor) return

  const actions = {
    setEmoji: () => insertEmoji(data.url, data.item),
    setPicture: () => handleFiles(data.files, "image"),
    setParseFile: () => handleFiles(data.files, "file"),
    setEditHtml: () => insertContent.html(data),
  }

  actions[key]?.()
}

const handleFileViewer = (data) => {
  console.log("handleFileViewer", data)
}

const updateDraft = debounce((data) => {
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

const handleEditorChange = (editor) => {
  setDisabled(editor.isEmpty())
  updateDraft(editor.children)
  handleAtMention(editor)
}

const handleAssistantFile = async (file, editor) => {
  const fileType = getFileType(file?.name)

  if (!isTextFile(fileType) || !__IS_ELECTRON__) {
    window.$message?.warning(`暂不支持${fileType}文件`)
    return
  }

  const base64Url = await fileToBase64(file)

  editor.insertNode(
    createMediaElement("attachment", {
      fileName: file.name,
      fileSize: bytesToSize(file.size),
      link: base64Url,
      path: file?.path || "",
    })
  )
}

const handleFiles = async (file, type) => {
  const editor = editorRef.value
  if (!editor) return

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
    } else {
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

const handleString = (item, editor) => {
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

const handlePaste = (editor, event, callback) => {
  const items = event?.clipboardData?.items ?? event?.dataTransfer?.items

  Array.from(items).forEach((item) => {
    if (item.kind === "file") {
      const type = item.type.match("^image/") ? "image" : "file"
      handleFiles(item.getAsFile(), type)
    } else if (item.kind === "string") {
      handleString(item, editor)
    }
  })

  event.preventDefault()
  callback?.(false)
}

const handleDrop = (event: DragEvent) => {
  if (!event.dataTransfer?.getData("text/plain")) {
    handlePaste(editorRef.value, event)
    event.preventDefault()
  }
}

const handleEnter = async (event) => {
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
  console.log("prepareMessageData:", data)
  const message = await sendChatMessage(data)
  console.log("sendChatMessage:", message)
  clearInput()
  chatStore.updateSendingState(data.to, "add")
  message.forEach((t, i) => {
    chatStore.sendSessionMessage({
      message: t,
      last: message.length - 1 === i,
    })
  })
}

const setupEventListeners = () => {
  const events = {
    handleAt: insertContent.mention,
    handleSetHtml: insertContent.html,
    handleInsertDraft: insertContent.draft,
    handleFileDrop: (file) => handleFiles(file, "file"),
    handleToolbar: handleToolbarAction,
    handleFileViewer: handleFileViewer,
    handleScreenCapture: (url) => {
      const imageElement = createMediaElement("image", { src: url, style: { width: "125px" } })
      editorRef.value.insertNode(imageElement)
    },
  }

  Object.entries(events).forEach(([event, handler]) => {
    emitter.on(event, handler)
  })
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
