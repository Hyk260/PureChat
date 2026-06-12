import { cloneDeep } from "lodash-es"
import { storeToRefs } from "pinia"

import { extractAitInfo, extractEmojiInfo, extractFilesInfo, extractImageInfo } from "@pure/editor"
import { getAiAvatarUrl } from "@pure/utils"
import { sendChatAssistantMessage } from "@/service/chatService"
import { createTextMessage } from "@/service/im-sdk-api"
import { useChatStore, useRobotStore, useUserStore } from "@/stores"
import { abortCompletion, getModelId } from "@pure/utils"
import { createPromptMessageCustomData } from "@pure/utils"

// import { createCustomMessage } from "@/service/im-sdk-api"
import { getCustomMsgContent } from "@/utils/common"

import type { MessagePayload } from "./types"

import type { MessageType, DB_Message } from "@pure/database/schemas"
import type { IDomEditor } from "@wangeditor/editor"

export const usePrepareMessageData = () => {
  const chatStore = useChatStore()
  const userStore = useUserStore()
  const robotStore = useRobotStore()

  const { toAccount, currentType, replyMsgData } = storeToRefs(chatStore)

  const prepareMessageData = (editor?: IDomEditor | null): MessagePayload => {
    if (!editor) {
      throw new Error("编辑器实例不能为空")
    }

    const text = editor.getText().trim()
    const { aitStr, atUserList } = extractAitInfo(editor)
    const { files } = extractFilesInfo(editor)
    const { images } = extractImageInfo(editor)
    const emoticons = extractEmojiInfo(editor)

    const hasContent = [images.length, files.length, atUserList.length, aitStr, emoticons, text].some(Boolean)

    const finalText = emoticons || text

    return {
      to: toAccount.value,
      type: currentType.value,
      text: finalText,
      aitStr: atUserList.length ? emoticons || aitStr : "",
      atUserList,
      images,
      files,
      custom: replyMsgData.value,
      isHave: hasContent,
    }
  }

  const createAssistantPromptMessage = () => {
    const to = userStore?.userProfile?.userID || ""
    const defaultBot = robotStore.defaultProvider
    const from = getModelId(defaultBot)
    const meta = robotStore.promptStore[defaultBot]?.[0]?.meta
    const text = `你好，我是 ${meta?.avatar} ${meta?.title} ${meta?.description} 让我们开始对话吧！`
    const msg = createTextMessage({ to: from, text, cache: false })
    const promptContent = createPromptMessageCustomData({ payload: { text: "预设提示词" } }, meta?.recQuestion)
    msg.conversationID = `C2C${from}`
    msg.avatar = getAiAvatarUrl(from)
    msg.cloudCustomData = promptContent
    msg.flow = "in"
    msg.to = to
    msg.from = from
    msg.nick = ""
    msg.status = "success"
    return { sessionId: `C2C${msg.from}`, message: msg }
  }

  return {
    createAssistantPromptMessage,
    prepareMessageData,
  }
}

export const useMessageOperations = () => {
  const chatStore = useChatStore()
  /**
   * 暂停当前正在进行的消息生成
   */
  const pauseMessages = () => {
    const topicMessages = chatStore.currentMessageList
    if (!topicMessages) return

    const streamingMessages = topicMessages.filter((m) => m.status === "sending")

    const askIds = [...new Set(streamingMessages?.map((m) => m.ID).filter((id) => !!id))]

    if (!askIds.length) return

    for (const askId of askIds) {
      abortCompletion(askId)
    }

    useChatStore().updateSendingState(chatStore.toAccount, "delete")
  }

  /**
   * AI助手从新生成消息
   */
  const resendMessage = async (messageId: string, data: DB_Message) => {
    const payload = getCustomMsgContent({ data: null, type: "loading" })
    const message = {
      ...data,
      type: "TIMCustomElem" as MessageType,
      payload,
    }

    const deepMessage = cloneDeep(message)

    useChatStore().modifiedMessages(deepMessage)

    Object.assign(message, { type: "TIMTextElem" })

    // 取到当前消息列表中与 messageId 匹配之前的数据（不包含匹配的消息）
    const allMessages = useChatStore().currentMessageList || []
    // 有些消息对象可能使用 ID 或 id 字段，兼容两种情况
    const matchIndex = allMessages.findIndex((m) => m.ID === messageId)
    const priorMessages = matchIndex > -1 ? allMessages.slice(0, matchIndex) : allMessages

    await sendChatAssistantMessage({
      chat: message,
      loadMessage: message,
      provider: useChatStore().currentSessionProvider,
      messages: cloneDeep(priorMessages),
    })
  }

  return {
    resendMessage,
    pauseMessages,
  }
}
