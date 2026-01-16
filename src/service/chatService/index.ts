import { cloneDeep } from "lodash-es"

import AiProvider from "@/ai"
import { getAiAvatarUrl } from "@/ai/getAiAvatarUrl"
import { ModelProvider, Provider } from "model-bank"
import { prettyObject } from "@/ai/utils"
import { DB_Message } from "@pure/database/schemas"
import { restApi } from "@/service/api"
import { createCustomMessage } from "@/service/im-sdk-api"
import { useChatStore, useRobotStore } from "@/stores"
import { createThinkingCustomData } from "@/utils/chat/customData"
import { getCustomMsgContent, getUnixTimestampSec } from "@/utils/common"
import { generateReferencePrompt } from "@/utils/messageUtils/search"
import { emitUpdateScrollImmediate } from "@/utils/mitt-bus"

import type { messageHandle } from "@/types"
import type { contextParams } from "@pure/utils/fetch"

interface ChatServiceParams {
  messages: DB_Message[]
  chat: DB_Message
  loadMessage?: DB_Message
  provider: Provider
}

class ChatService {
  startMsg: DB_Message
  chatMsg: DB_Message

  // createAssistantMessage = (text: string) => { }

  async sendMessage({ messages, chat, provider, loadMessage }: ChatServiceParams) {
    const api = new AiProvider(provider)
    const startMsg = loadMessage || this.createLoadingMessage(chat)

    if (this.shouldAbortSend(api, startMsg)) return

    this.startMsg = startMsg
    this.chatMsg = chat
    await this.handleWebSearchIfNeeded(chat, startMsg)

    // 发送 AI 聊天请求
    await api.llm.chat({
      requestId: startMsg.ID,
      messages: this.shouldUseCurrentMessages() ? useChatStore().currentMessageList : messages,
      config: {
        stream: true,
        model: api.config.model,
      },
      onUpdate: (data) => {
        console.log("ChatService onUpdate:", data)
        this.updateMessage({ message: startMsg, data })
      },
      onFinish: async (text, context: contextParams) => {
        console.log("ChatService onFinish:", { text, context })
        await this.handleFinish({ text, context })
      },
      onError: (error) => {
        console.log("ChatService onError:", error)
        this.handleError(error)
      },
    })
  }

  /**
   * 通过 REST API 发送消息到服务器
   */
  private async sendRestMessage(params: DB_Message, data: messageHandle) {
    const { text, reasoning } = data

    // 本地模式或消息为空时跳过
    if (__LOCAL_MODE__ || !text) return

    const cloudCustomData = reasoning
      ? createThinkingCustomData({ payload: { text: reasoning?.content || "" } }, data?.reasoning)
      : ""

    try {
      const data = await restApi({
        params: {
          To_Account: params.from,
          From_Account: params.to,
          Text: text,
          CloudCustomData: cloudCustomData,
        },
        funName: "restSendMsg",
      })
      console.log("REST API 发送消息成功:", data)
    } catch (error) {
      console.error("REST API 发送消息失败:", error)
    }
  }

  /**
   * 更新聊天消息状态
   */
  private updateMessage({ message, data }: { message?: DB_Message; data?: messageHandle }) {
    const chat = message || this.chatMsg
    if (!chat) return

    const { text = "", thinking = "", done: isFinish = false, reasoning } = data ?? {}

    console.log("text:", text)

    chat.payload!.text = text
    Object.assign(chat, {
      // payload: { text: text },
      // clientTime: getUnixTimestampSec(),
      status: isFinish ? "success" : "sending",
    })

    if (reasoning?.content) {
      console.log("thinking:", thinking)
      chat.cloudCustomData = createThinkingCustomData({ payload: { text: thinking } }, data?.reasoning)
    } else if (isFinish) {
      // chat.cloudCustomData = handleWebSearchData(chat, true)
      if (chat.type === "TIMTextElem") {
        chat.payload = { text: chat.payload?.text || "" }
      }
    }

    useChatStore().updateMessages({
      sessionId: `C2C${chat.from}`,
      message: cloneDeep(chat),
    })

    emitUpdateScrollImmediate("robot")
  }

  private createLoadingMessage(params: DB_Message): DB_Message {
    const { to: from, from: to } = params
    const msg = createCustomMessage({ to, customType: "loading" })

    Object.assign(msg, {
      conversationID: `C2C${from}`,
      sessionId: `C2C${from}`,
      avatar: getAiAvatarUrl(from),
      flow: "in",
      to,
      from,
      nick: "",
      status: "success",
    })

    this.updateMessage({
      message: msg,
    })

    Object.assign(msg, { type: "TIMTextElem" })
    return msg
  }

  private createAssistantAlertMessage(startMsg: DB_Message) {
    const alertData = cloneDeep(startMsg)

    Object.assign(alertData, {
      clientTime: getUnixTimestampSec(),
      type: "TIMCustomElem",
      status: "success",
      payload: getCustomMsgContent({ data: null, type: "warning" }),
    })

    useChatStore().updateMessages({
      sessionId: `C2C${alertData.from}`,
      message: alertData,
    })
  }

  /**
   * 检查是否应该中止发送消息
   */
  private shouldAbortSend(api: AiProvider, startMsg: DB_Message): boolean {
    // Ollama 模型不需要 token 检查
    if (api.llm.provider === ModelProvider.Ollama || api.config.token) {
      return false
    }

    setTimeout(() => {
      this.createAssistantAlertMessage(startMsg)
      useChatStore().updateSendingState(startMsg.from, "delete")
    }, 500)

    return true
  }

  private shouldUseCurrentMessages(): boolean {
    const robotStore = useRobotStore()
    return robotStore.enableWebSearch && robotStore.isWebSearchModel
  }

  private async handleWebSearchIfNeeded(chat: DB_Message, startMsg: DB_Message) {
    if (!this.shouldUseCurrentMessages() || !__LOCAL_MODE__) return

    try {
      const webSearchResult = await generateReferencePrompt(chat, {
        content: chat.payload?.text || "",
      })
      window.sessionStg.set(`web-search-${startMsg.ID}`, webSearchResult)
    } catch (error) {
      console.error("网络搜索处理失败:", error)
    }
  }

  /**
   * 处理消息发送完成
   */
  private async handleFinish(data: { text: string; context?: contextParams }) {
    const { text, context } = data
    const startMsg = this.startMsg
    const chatParams = this.chatMsg
    console.log("handleFinish", { text, context, startMsg, chatParams })

    const finishedData = { text, done: true, reasoning: context?.reasoning }

    try {
      this.updateMessage({
        message: startMsg,
        data: finishedData,
      })
      emitUpdateScrollImmediate("robot")
      if (context?.type === "done") {
        useChatStore().updateSendingState(chatParams.to, "delete")
        await this.sendRestMessage(chatParams, finishedData)
      }
    } catch (error) {
      console.error("handleFinish error:", error)
    } finally {
      useChatStore().updateSendingState(chatParams.to, "delete")
    }
  }

  /**
   * 处理错误情况
   */
  private async handleError(errorText) {
    const chatParams = this.chatMsg
    console.log("[chat] onError:", errorText)

    const errorMessage = errorText || "未知错误"
    const content = `\n\n${prettyObject({ error: true, message: errorMessage })}`

    try {
      this.updateMessage({
        message: this.startMsg,
        data: { text: content, done: true },
      })

      // 非本地模式下发送错误信息到服务器
      if (!__LOCAL_MODE__ && errorMessage) {
        await this.sendRestMessage(chatParams, { text: content })
      }
    } catch (error) {
      console.error("处理错误消息时出错:", error)
    } finally {
      emitUpdateScrollImmediate("robot")
      useChatStore().updateSendingState(chatParams.to, "delete")
    }
  }
}

export const chatService = new ChatService()

export const sendChatAssistantMessage = (params: ChatServiceParams) => chatService.sendMessage(params)
