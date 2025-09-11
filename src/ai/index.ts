import { cloneDeep } from "lodash-es"

import { ClientApi } from "@/ai/api"
import { FewShots, ModelProvider, ModelProviderKey } from "@/ai/types"
import { getAiAvatarUrl, prettyObject } from "@/ai/utils"
import { DB_Message } from "@/database/schemas/message"
import { restApi } from "@/service/api"
import { createCustomMessage } from "@/service/im-sdk-api"
import { useChatStore, useRobotStore } from "@/stores"
import { getCloudCustomData } from "@/utils/chat"
import { getCustomMsgContent, getTime } from "@/utils/common"
import { generateReferencePrompt, handleWebSearchData } from "@/utils/messageUtils/search"
import emitter from "@/utils/mitt-bus"

interface AIResponse {
  message: string
  think?: string
  done?: boolean
}

/**
 * 通过 REST API 发送消息
 */
const restSendMsg = async (params: DB_Message, data: AIResponse) => {
  const { message, think } = data
  // 在本地模式或消息为空时，不发送 REST 请求
  if (__LOCAL_MODE__ || !message) return

  let cloudCustomData = ""
  if (think) {
    cloudCustomData = getCloudCustomData(think, {
      messageAbstract: think,
      thinking: "思考中...",
      deeplyThought: "已深度思考",
    })
  } else {
    cloudCustomData = handleWebSearchData(params, true)
  }

  try {
    await restApi({
      params: {
        To_Account: params.from,
        From_Account: params.to,
        Text: message,
        CloudCustomData: cloudCustomData,
      },
      funName: "restSendMsg",
    })
  } catch (error) {
    console.error("REST API 发送消息失败:", error)
  }
}

/**
 * 更新聊天消息状态
 */
const updateMessage = (chat: DB_Message, data?: AIResponse) => {
  if (!chat) return

  const { message = "", think = "", done: isFinish = false } = data || {}

  chat.payload.text = message
  chat.clientTime = getTime()
  chat.status = isFinish ? "success" : "sending"

  if (think) {
    chat.cloudCustomData = getCloudCustomData(think, {
      messageAbstract: think,
      thinking: "思考中...",
      deeplyThought: "已深度思考",
    })
  } else if (isFinish) {
    chat.cloudCustomData = handleWebSearchData(chat)
    if (chat.type === "TIMTextElem") {
      chat.payload = {
        text: chat.payload.text,
      }
    }
  }

  useChatStore().updateMessages({
    sessionId: `C2C${chat.from}`,
    message: cloneDeep(chat),
  })

  emitter.emit("updateScroll", "robot")
}

/**
 * 创建并发送初始消息（加载状态）
 */
const createStartMsg = (params: DB_Message) => {
  const { to: from, from: to } = params
  const msg = createCustomMessage({ to, customType: "loading" }) as unknown as DB_Message

  msg.conversationID = `C2C${from}`
  msg.avatar = getAiAvatarUrl(from)
  msg.flow = "in"
  msg.to = to
  msg.from = from
  msg.nick = ""
  msg.status = "success"
  // 初始消息创建后立即更新到 UI，显示加载状态
  updateMessage(msg)

  msg.type = "TIMTextElem"
  return msg
}

const createAlertMsg = (startMsg: DB_Message, provider: ModelProviderKey) => {
  const alertData = cloneDeep(startMsg)
  alertData.clientTime = getTime()
  alertData.type = "TIMCustomElem"
  alertData.status = "success"
  alertData.payload = getCustomMsgContent({ data: { provider }, type: "warning" })

  useChatStore().updateMessages({ sessionId: `C2C${alertData.from}`, message: alertData })
}

/**
 * 在发送消息前进行预检查
 */
const beforeSend = (api: ClientApi, startMsg: DB_Message) => {
  // Ollama 模型不需要 token 检查
  if (api.llm.provider === ModelProvider.Ollama) {
    return false
  }
  // 检查 token 是否存在
  if (api.config().token) {
    return false
  } else {
    setTimeout(() => {
      createAlertMsg(startMsg, api.llm.provider)
      useChatStore().updateSendingState(startMsg.from, "delete")
    }, 600)
    return true
  }
}

export const chatService = async ({
  messages,
  chat,
  provider,
}: {
  messages: DB_Message[]
  chat: DB_Message
  provider: ModelProviderKey
}) => {
  const api = new ClientApi(provider)
  const startMsg = createStartMsg(chat)

  if (beforeSend(api, startMsg)) return

  const enableWebSearch = useRobotStore().enableWebSearch && useRobotStore().isWebSearchModel

  if (enableWebSearch && __LOCAL_MODE__) {
    const webSearchResult = await generateReferencePrompt(chat, { content: chat?.payload?.text })

    window.localStg.set(`web-search-${startMsg.ID}`, webSearchResult)
  }

  await api.llm.chat({
    messages: enableWebSearch ? useChatStore().currentMessageList : messages,
    config: {
      stream: true,
      model: api.config().model,
    },
    onUpdate: handleUpdate(startMsg),
    onFinish: handleFinish(startMsg, chat),
    onReasoningMessage: handleReasoningMessage(startMsg),
    onError: handleError(startMsg, chat),
    onController: handleController,
  })
}

/**
 * 更新
 */
const handleUpdate = (startMsg: DB_Message) => (data: AIResponse) => {
  updateMessage(startMsg, data)
}

/**
 * 结束
 */
const handleFinish = (startMsg: DB_Message, chatParams: DB_Message) => async (data: AIResponse) => {
  const { message = "" } = data || {}
  console.log("[chat] onFinish:", message)
  if (message) {
    data.done = true
    updateMessage(startMsg, data)
    await restSendMsg(chatParams, data)
  }
  useChatStore().updateSendingState(chatParams.to, "delete")
}

/**
 * 推理
 */
const handleReasoningMessage = (startMsg: DB_Message) => (think: string) => {
  console.log("[chat] onReasoningMessage:", think)
  updateMessage(startMsg, { message: "", think })
}

/**
 * 错误
 */
const handleError = (startMsg: DB_Message, chatParams: DB_Message) => async (errorText: string) => {
  console.error("[chat] onError:", errorText)
  const errorMessage = errorText || "未知错误"
  const content = `\n\n${prettyObject({ error: true, message: errorMessage })}`

  if (__LOCAL_MODE__) {
    updateMessage(startMsg, { message: content, done: true })
  } else {
    if (errorMessage) {
      updateMessage(startMsg, { message: content, done: true })
      await restSendMsg(chatParams, { message: content })
    }
  }
  useChatStore().updateSendingState(chatParams.to, "delete")
}

const handleController = (controller: AbortController) => {
  console.log("[chat] onController:", controller)
}
