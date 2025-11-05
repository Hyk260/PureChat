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
      @drop="handleFileDrop"
      @on-change="handleEditorChange"
      @on-created="handleEditorCreated"
      @custom-paste="handlePaste"
      @custom-alert="customAlert"
      @keyup.enter="handleEnter"
    />
    <!-- @提及弹框 -->
    <MentionModal v-if="isMentionModalVisible" pinyin-search :is-owner="isOwner" :editor="editorRef" />
    <SendMessageButton :disabled="isSendDisabled" @send-message="sendChatMessage" />
  </div>
</template>

<script setup lang="ts">
import { onActivated, onBeforeUnmount, onDeactivated, onMounted, ref, shallowRef, watch } from "vue"
import { Editor } from "@wangeditor/editor-for-vue"

import { debounce } from "lodash-es"
import { storeToRefs } from "pinia"

import MentionModal from "@/components/Chat/MentionModal.vue"
import { useMessageCreator } from "@/hooks/useMessageCreator"
import { usePrepareMessageData } from "@/hooks/useMessageOperations"
import { useState } from "@/hooks/useState"
import { useChatStore, useGroupStore } from "@/stores"
import { bytesToSize, fileToBase64, insertMention } from "@/utils/chat"
import { isMobile } from "@/utils/common"
import emitter from "@/utils/mitt-bus"

import Inputbar from "../Inputbar/index.vue"
import { editorConfig } from "@/utils/wangEditor/editor-config"
import { filterMentionList } from "@/utils/pinyin/utils"
import SendMessageButton from "./SendMessageButton.vue"
import { customAlert, handleAssistantFile, handleEditorKeyDown, handleString, insertEmoji } from "./utils"

import type { DraftData } from "@/types"
import type { IDomEditor } from "@wangeditor/editor"

import "@/utils/wangEditor/editor-config/plugin"
import "@/styles/wangeditor/index.css"

const MAX_FILE_SIZE_MB = 100
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024
const mode = "simple"
const editorRef = shallowRef<IDomEditor>()
const valueHtml = ref("")

const [isSendDisabled, setIsSendDisabled] = useState(false)
const { prepareMessageData } = usePrepareMessageData()
const { messageCreator } = useMessageCreator()

const chatStore = useChatStore()
const groupStore = useGroupStore()

const { isOwner } = storeToRefs(groupStore)
const {
  isSending,
  isGroupChat,
  isAssistant,
  isMultiSelectMode,
  isChatBoxVisible,
  isMentionModalVisible,
  isFullscreenInputActive,
  currentSessionId,
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

const updateChatDraft = debounce((data: DraftData) => {
  chatStore.updateChatDraft({ ID: currentSessionId.value, payload: data })
}, 300)

const handleMentionSearch = debounce((editor) => {
  if (isGroupChat.value) {
    filterMentionList({
      str: editor.getText(),
      list: groupStore.currentMembersWithoutSelf,
    })
  }
}, 100)

const handleEditorChange = (editor: IDomEditor) => {
  setIsSendDisabled(editor.isEmpty())
  updateChatDraft(editor.children)
  handleMentionSearch(editor)
}

const handleFiles = async (file: File | null, type: "image" | "file" = "file") => {
  const editor = editorRef.value
  if (!editor || !file) throw new Error("file editor is not ready")

  if (file.size > MAX_FILE_SIZE_BYTES) {
    window.$message?.warning(`文件不能大于${MAX_FILE_SIZE_MB}MB`)
    return
  }

  if (isAssistant.value) {
    return handleAssistantFile(file, editor)
  }

  try {
    const base64Url = await fileToBase64(file)

    editor.restoreSelection()

    if (type === "image") {
      const imageElement = {
        type: "image",
        src: base64Url,
        fileName: file.name,
        style: { width: "125px" },
        children: [{ text: "" }],
      }
      editor.insertNode(imageElement)
    } else if (type === "file") {
      const fileElement = {
        type: "attachment",
        fileName: file.name,
        fileSize: bytesToSize(file.size),
        link: base64Url,
        path: file?.path || "",
        children: [{ text: "" }],
      }
      editor.insertNode(fileElement)
    }

    editor.move(1)
  } catch (error) {
    console.error(`${type}处理错误:`, error)
    window.$message?.error(`${type}处理失败`)
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

const handleFileDrop = (event: DragEvent) => {
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

  await sendChatMessage()
}

const clearInput = () => {
  chatStore.setReplyMsgData(null)
  chatStore.$patch({ isFullscreenInputActive: false })
  editorRef.value?.clear()
}

const sendChatMessage = async () => {
  try {
    const messageData = prepareMessageData(editorRef.value)
    console.log("messageData", messageData)
    if (!messageData.isHave) {
      clearInput()
      return
    }

    const message = await messageCreator(messageData)
    clearInput()

    chatStore.updateSendingState(messageData.to, "add")

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

const handleScreenCapture = (url: string) => {
  const imageElement = {
    type: "image",
    src: url,
    style: { width: "125px" },
    children: [{ text: "" }],
  }
  editorRef.value?.insertNode(imageElement)
}

const setupEventListeners = () => {
  emitter.on("handleInsertDraft", handleInsertDraft)
  emitter.on("handleToolbar", handleToolbarAction)
  emitter.on("handleScreenCapture", handleScreenCapture)
  emitter.on("handleFileViewer", handleFileViewer)
  emitter.on("handleSetHtml", handleSetHtml)
  emitter.on("handleAt", handleAt)
  emitter.on("handleFileDrop", handleFiles)
}

const removeEventListeners = () => {
  const events = [
    "handleAt",
    "handleSetHtml",
    "handleInsertDraft",
    "handleFileDrop",
    "handleToolbar",
    "handleFileViewer",
    "handleScreenCapture",
  ]
  events.forEach((event) => emitter.off(event))
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
}
.wang-h-full {
  height: calc(100% - 60px) !important;
  border-top: none;
}
</style>
