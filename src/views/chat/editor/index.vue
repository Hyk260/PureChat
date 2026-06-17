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
      :defaultConfig="editorConfig"
      @drop="handleFileDrop"
      @onChange="handleEditorChange"
      @onCreated="handleEditorCreated"
      @customPaste="handlePaste"
      @customAlert="customAlert"
      @keyup.enter="handleEnter"
    />
    <!-- @提及弹框 -->
    <MentionModal v-if="isMentionModalVisible" pinyinSearch :isOwner="isOwner" :editor="editorRef" />
    <SendMessageButton :disabled="isSendDisabled" @sendMessage="sendChatMessage" />
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
import { useChatStore, useGroupStore } from "@/stores"
import { insertMention } from "@pure/editor"
import { browserInfo, useState } from "@pure/utils"
import emitter, { type ToolbarAction } from "@/utils/mitt-bus"

import Inputbar from "../Inputbar/index.vue"
import { createEditorConfig, setFilePluginOptions } from "@pure/editor"
import {
  customAlert,
  handleEditorKeyDown,
  handleFileDrop as handleEditorFileDrop,
  handleFiles,
  handlePaste as handleEditorPaste,
  insertEmoji,
} from "@pure/editor/editor-utils"
import { placeholderMap } from "@/utils/editor-placeholder"
import { filterMentionList } from "@/utils/pinyin/utils"
import SendMessageButton from "./SendMessageButton.vue"

import type { DraftData } from "@pure/editor/types"
import type { IDomEditor } from "@wangeditor/editor"

import "@pure/editor"

const { editorConfig } = createEditorConfig({
  placeholder: placeholderMap.value.input,
  mentionConfig: {
    showModal: () => useChatStore().toggleMentionModal(true),
    hideModal: () => useChatStore().toggleMentionModal(false),
  },
})

const handleFileViewer = (data) => {
  console.log("handleFileViewer", data)
}

setFilePluginOptions({ onFileClick: handleFileViewer })

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

const handleAt = ({ id, name }: { id: string; name: string }) => {
  insertMention({ id, name, backward: false, editor: editorRef.value })
}

const handleSetHtml = (html: string) => {
  if (!html) return
  editorRef.value?.insertNode({ text: html })
  editorRef.value?.focus(true)
}

const handleInsertDraft = (option: { sessionId: string }) => {
  const { sessionId } = option
  const editor = editorRef.value
  if (!sessionId || !editor) return
  if (!browserInfo.isMobile) editor.focus(true)
  clearInput()
  const draft = chatStore.chatDraftMap.get(sessionId)
  if (!draft) return
  draft?.forEach((t) => editor.insertNode(t.children))
}

const handleToolbarAction = (payload: ToolbarAction) => {
  const { data, key } = payload
  const editor = editorRef.value
  if (!editor) return

  const actions = {
    setEmoji: () => insertEmoji(data.emoji!, editor),
    setPicture: () => onFile(data.files!, "image"),
    setParseFile: () => onFile(data.files!, "file"),
    setEditHtml: () => handleSetHtml(data.html!),
  }

  actions[key]?.()
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
  updateChatDraft(editor.children as DraftData)
  handleMentionSearch(editor)
}

const onFile = (file: File, type: "image" | "file") => {
  handleFiles(file, editorRef.value, type, {
    isAssistant: isAssistant.value,
    callbacks: {
      onWarning: (msg) => window.$message?.warning(msg),
      onError: (msg) => window.$message?.error(msg),
    },
  })
}

const handlePaste = (editor: IDomEditor, event: ClipboardEvent, callback?: Function) => {
  console.log("text/plain:", event?.clipboardData?.getData("text/plain"))
  handleEditorPaste(editor, event, onFile, (continuePaste) => callback?.(continuePaste))
}

const handleFileDrop = (event: DragEvent) => {
  handleEditorFileDrop(event, onFile)
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
      return
    }

    const message = await messageCreator(messageData)
    clearInput()

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
  emitter.on("handleSetHtml", handleSetHtml)
  emitter.on("handleAt", handleAt)
  emitter.on("handleFileDrop", (file: File) => onFile(file, file.type.match("^image/") ? "image" : "file"))
}

const removeEventListeners = () => {
  const events = [
    "handleAt",
    "handleSetHtml",
    "handleInsertDraft",
    "handleFileDrop",
    "handleToolbar",
    "handleScreenCapture",
  ]
  events.forEach((event) => emitter.off(event))
}

// 当 @提及弹窗可见性变化时，控制键盘事件拦截
// 防止 ↑/↓ 键导致输入框光标跳转到文字前方
watch(isMentionModalVisible, handleEditorKeyDown)

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
  height: 100% !important;
  border-top: none;
}
</style>
