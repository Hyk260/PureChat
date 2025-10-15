import { cloneDeep } from "lodash-es"
import { storeToRefs } from "pinia"

import { getAiAvatarUrl } from "@/ai/getAiAvatarUrl"
import { getModelId } from "@/ai/utils"
// import { getModelType } from "@/ai/utils"
import { sendChatAssistantMessage } from "@/service/chatService"
import { createTextMessage } from "@/service/im-sdk-api"
import { useChatStore, useRobotStore, useUserStore } from "@/stores"
import { abortCompletion } from "@/utils/abortController"
import { getCloudCustomData, getFileType } from "@/utils/chat"
// import { createCustomMessage } from "@/service/im-sdk-api"
import { getCustomMsgContent } from "@/utils/common"

import type { MessagePayload } from "./types"
import type { AttachmentElement, DB_Message, EmojiElement, ImageElement, MentionElement } from "@/types"
import type { IDomEditor } from "@wangeditor/editor"

export const isVideoFile = (fileName: string) => {
  const video = ["mp4", "wmv", "webm"]
  const name = fileName.toLowerCase()
  const regex = new RegExp(`(${video.join("|")})$`, "i")
  return regex.test(name)
}

/**
 * 将包含表情图像的 HTML 字符串转换为对应的表情符号文本
 * @param editor 编辑器实例
 * @returns 转换后的表情文本
 * <p>12<img src="*" alt="[我最美]" />333</p>
 * 12[我最美]333
 */
export const extractEmojiInfo = (editor: IDomEditor) => {
  const html = editor.getHtml() // 非格式化的 html
  const emojiMap = editor.getElemsByType("image") as EmojiElement[] // 所有图片
  if (!html || !emojiMap || !Array.isArray(emojiMap)) return ""
  const filtered = emojiMap.filter((item) => item.class === "EmoticonPack")
  if (filtered.length === 0) return ""
  const convertedData = filtered.map((item) => ({ [item.src]: item.alt }))
  const extended = { ...Object.assign(...convertedData) }
  // 清除文件消息包含的字符串
  const fileRegex = /<span\s+data-w-e-type="attachment"[^>]*>(.*?)<\/span>/g
  const str = html.replace(fileRegex, "")
  // 替换表情包图片为字符串 -> '[**]'
  const regex = /<img src="([^"]+)"[^>]+>/g
  const result = str.replace(regex, (match, src) => {
    const emojiText = extended[src] || ""
    return emojiText
  })
  const text = result.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, "")
  return text
}

/**
 * 提取图片信息
 */
export const extractImageInfo = (editor: IDomEditor) => {
  let images: ImageElement[] = []
  const image = editor.getElemsByType("image") as ImageElement[]
  // 过滤表情包消息
  images = image.filter((item) => item?.class !== "EmoticonPack")
  return { images }
}

/**
 * 提取文件信息
 */
export const extractFilesInfo = (editor: IDomEditor) => {
  let file: AttachmentElement[] = []
  const files = editor.getElemsByType("attachment") as unknown as AttachmentElement[]
  file = files.filter((t) => !isVideoFile(getFileType(t.fileName)))
  return { files: file }
}

/**
 * 提取视频信息
 */
// export const extractVideoInfo = (editor: IDomEditor) => {
//   let video = []
//   const files = editor.getElemsByType("attachment")
//   video = files.map((t) => isVideoFile(getFileType(t.fileName)))
//   return { video }
// }

/**
 * 从编辑器中提取ait信息和纯文本内容
 * @param editor 编辑器实例
 * @returns 包含纯文本内容和aitID列表的对象
 */
export const extractAitInfo = (editor: IDomEditor) => {
  let aitStr = ""
  const atUserList = []

  const html = editor.getHtml()
  const mentions = editor.getElemsByType("mention") as unknown as MentionElement[]

  if (!mentions.length) {
    return { aitStr, atUserList }
  }
  // 移除附件标签
  const fileTagRegex = /<span\s+data-w-e-type="attachment"[^>]*>.*?<\/span>/g
  // 移除HTML标签
  const htmlTagRegex = /<[^>]+>/g
  // 移除&nbsp
  const nbspRegex = /&nbsp;/gi

  aitStr = html.replace(fileTagRegex, "").replace(htmlTagRegex, "").replace(nbspRegex, "")

  const uniqueUserIds = new Set()
  mentions.forEach((item) => {
    if (item?.info?.id) {
      uniqueUserIds.add(item.info.id)
    }
  })

  return {
    aitStr,
    atUserList: Array.from(uniqueUserIds) as string[],
  }
}

export const usePrepareMessageData = () => {
  const chatStore = useChatStore()
  const userStore = useUserStore()
  const robotStore = useRobotStore()

  const { toAccount, currentType, replyMsgData } = storeToRefs(chatStore)

  const prepareMessageData = (editor: IDomEditor | undefined | null): MessagePayload => {
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
    const to = userStore?.userProfile?.userID
    const defaultBot = robotStore.defaultProvider
    const from = getModelId(defaultBot)
    const meta = robotStore.promptStore[defaultBot]?.[0]?.meta
    const text = `你好，我是 ${meta?.avatar} ${meta?.title} ${meta?.description} 让我们开始对话吧！`
    const msg = createTextMessage({ to: from, text, cache: false })
    const promptContent = getCloudCustomData(
      { key: "messagePrompt", payload: { text: "预设提示词" } },
      { recQuestion: meta?.recQuestion || [] }
    )
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
      type: "TIMCustomElem",
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
