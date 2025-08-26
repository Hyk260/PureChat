import { cloneDeep } from "lodash-es"

import { ClientApi } from "@/ai/api"
import { FewShots, ModelProvider, ModelProviderKey } from "@/ai/types"
import { getAiAvatarUrl, prettyObject } from "@/ai/utils"
import { restApi } from "@/service/api"
import { createCustomMessage } from "@/service/im-sdk-api"
import { useChatStore } from "@/stores/modules/chat"
import { getCloudCustomData } from "@/utils/chat"
import { getCustomMsgContent, getTime } from "@/utils/common"
import emitter from "@/utils/mitt-bus"
import { localStg } from "@/utils/storage"

const handleWebSearchData = (flag = false) => {
  const webSearchResult = localStg.get("webSearchReferences")
  if (!webSearchResult) return ""
  const result = getCloudCustomData({ payload: { text: "web-search" } }, { webSearchResult })
  if (flag) localStg.remove("webSearchReferences")
  return result
}

/**
 * 通过 REST API 发送消息
 * @param {Object} params - 聊天会话参数 (from, to)
 * @param {Object} data - 消息数据 (message, think)
 */
const restSendMsg = async (params, data) => {
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
    cloudCustomData = handleWebSearchData(true)
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
 * @param {Object} chat - 聊天消息对象引用
 * @param {Object} [data={}] - 更新数据 (message, think, done)
 */
const updateMessage = (chat, data = {}) => {
  if (!chat) return

  const { message = "", think = "", done: isFinish = false } = data

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
    chat.cloudCustomData = handleWebSearchData()
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

  if (isFinish && __LOCAL_MODE__) {
    localStg.remove("webSearchReferences")
  }
}

/**
 * 创建并发送初始的“开始”消息（加载状态）
 * @param {Object} params - 聊天会话参数 (to, from)
 * @returns {Object} 创建的消息对象
 */
const createStartMsg = (params) => {
  const { to: from, from: to } = params
  const msg = createCustomMessage({ to, customType: "loading" })

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

const createAlertMsg = (startMsg, provider) => {
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
const beforeSend = (api: ClientApi, startMsg: any) => {
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
  messages: FewShots
  chat: { from: string; to: string }
  provider: ModelProviderKey
}) => {
  const api = new ClientApi(provider)
  const startMsg = createStartMsg(chat)

  if (beforeSend(api, startMsg)) return

  await api.llm.chat({
    messages,
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
 * 处理 API 响应的更新事件
 * @param {Object} startMsg - 初始消息对象引用
 * @returns {Function} onUpdate 回调函数
 */
const handleUpdate = (startMsg) => (data) => {
  // const { message = "", think = "" } = data || {};
  // console.log("[chat] onUpdate:", message);
  updateMessage(startMsg, data)
}

/**
 * 处理 API 响应的完成事件
 * @param {Object} startMsg - 初始消息对象引用
 * @param {Object} chatParams - 聊天会话参数
 * @returns {Function} onFinish 回调函数
 */
const handleFinish = (startMsg, chatParams) => async (data) => {
  const { message = "", think = "" } = data || {}
  console.log("[chat] onFinish:", message)
  if (message) {
    data.done = true
    updateMessage(startMsg, data)
    await restSendMsg(chatParams, data)
  }
  useChatStore().updateSendingState(chatParams.to, "delete")
}

/**
 * 处理 API 响应的推理消息事件
 * @param {Object} startMsg - 初始消息对象引用
 * @returns {Function} onReasoningMessage 回调函数
 */
const handleReasoningMessage = (startMsg) => (think) => {
  console.log("[chat] onReasoningMessage:", think)
  updateMessage(startMsg, { message: "", think })
}

/**
 * 处理 API 响应的错误事件
 * @param {Object} startMsg - 初始消息对象引用
 * @param {Object} chatParams - 聊天会话参数
 * @returns {Function} onError 回调函数
 */
const handleError = (startMsg, chatParams) => async (error) => {
  console.error("[chat] onError:", error)
  const errorMessage = error?.message || "未知错误"
  const content = `\n\n${prettyObject({ error: true, message: errorMessage })}`

  // 在本地模式下，直接更新消息显示错误内容
  if (__LOCAL_MODE__) {
    updateMessage(startMsg, { message: content, done: true })
  }
  // 如果有错误消息，尝试通过 REST API 发送
  if (errorMessage) {
    await restSendMsg(chatParams, { message: content })
  }

  useChatStore().updateSendingState(chatParams.to, "delete")
}

const handleController = (controller: AbortController) => {
  console.log("[chat] onController:", controller)
}
