import { cloneDeep } from "lodash-es"

import AiProvider from "@/ai"
import { getAiAvatarUrl } from "@/ai/getAiAvatarUrl"
import { ModelProvider, ModelProviderKey } from "@/ai/types"
import { prettyObject } from "@/ai/utils"
import { DB_Message } from "@/database/schemas/message"
import { restApi } from "@/service/api"
import { createCustomMessage } from "@/service/im-sdk-api"
import { useChatStore, useRobotStore } from "@/stores"
import { createDeepThinkingCustomData } from "@/utils/chat/customData"
import { getCustomMsgContent, getUnixTimestampSec } from "@/utils/common"
import { generateReferencePrompt, handleWebSearchData } from "@/utils/messageUtils/search"
import { emitUpdateScrollImmediate } from "@/utils/mitt-bus"

import type { AIResponse } from "@/types"

interface ChatServiceParams {
  messages: DB_Message[]
  chat: DB_Message
  loadMessage?: DB_Message
  provider: ModelProviderKey
}

class ChatService {
  async sendMessage({ messages, chat, provider, loadMessage }: ChatServiceParams) {
    const api = new AiProvider(provider)
    const startMsg = loadMessage || this.createStartMessage(chat)

    if (this.shouldAbortSend(api, startMsg)) return

    await this.handleWebSearchIfNeeded(chat, startMsg)

    // 发送 AI 聊天请求
    await api.llm.chat({
      requestId: startMsg.ID,
      messages: this.shouldUseCurrentMessages() ? useChatStore().currentMessageList : messages,
      config: {
        stream: true,
        model: api.config.model,
      },
      onUpdate: (data: AIResponse) => this.handleUpdate(startMsg, data),
      onFinish: (data: AIResponse) => {
        this.handleFinish(data, startMsg, chat)
      },
      onReasoningMessage: (think: string) => this.handleReasoningMessage(startMsg, think),
      onError: (errorText: string) => {
        this.handleError(startMsg, chat, errorText)
      },
      onController: (controller) => this.handleController(controller),
    })
  }

  /**
   * 通过 REST API 发送消息到服务器
   */
  private async sendRestMessage(params: DB_Message, data: AIResponse) {
    const { message, think } = data

    // 本地模式或消息为空时跳过
    if (__LOCAL_MODE__ || !message) return

    const cloudCustomData = think ? createDeepThinkingCustomData({ payload: { text: think } }) : ""

    try {
      const data = await restApi({
        params: {
          To_Account: params.from,
          From_Account: params.to,
          Text: message,
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
  private updateMessage(chat: DB_Message, data?: AIResponse) {
    if (!chat) return

    const { message = "", think = "", done: isFinish = false } = data ?? {}
    chat.payload.text = message
    Object.assign(chat, {
      // payload: { text: message },
      // clientTime: getUnixTimestampSec(),
      status: isFinish ? "success" : "sending",
    })

    if (think) {
      chat.cloudCustomData = createDeepThinkingCustomData({ payload: { text: think } })
    } else if (isFinish) {
      chat.cloudCustomData = handleWebSearchData(chat, true)
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

  private createStartMessage(params: DB_Message): DB_Message {
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

    this.updateMessage(msg)

    Object.assign(msg, { type: "TIMTextElem" })
    return msg
  }

  private createAlertMessage(startMsg: DB_Message) {
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
      this.createAlertMessage(startMsg)
      useChatStore().updateSendingState(startMsg.from, "delete")
    }, 1000)

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
   * 处理消息更新
   */
  private handleUpdate(startMsg: DB_Message, data: AIResponse) {
    this.updateMessage(startMsg, data)
  }

  /**
   * 处理消息发送完成
   */
  private async handleFinish(data: AIResponse, startMsg: DB_Message, chatParams: DB_Message) {
    const { message = "" } = data ?? {}
    console.log("[chat] onFinish:", message)

    if (!message) {
      useChatStore().updateSendingState(chatParams.to, "delete")
      return
    }

    try {
      const finishedData = { ...data, done: true }
      this.updateMessage(startMsg, finishedData)
      emitUpdateScrollImmediate("robot")
      await this.sendRestMessage(chatParams, finishedData)
    } catch (error) {
      console.error("处理消息完成时出错:", error)
    } finally {
      useChatStore().updateSendingState(chatParams.to, "delete")
    }
  }

  /**
   * 处理推理消息
   */
  private handleReasoningMessage(startMsg: DB_Message, think: string) {
    console.log("[chat] onReasoningMessage:", think)
    this.updateMessage(startMsg, { message: "", think })
  }

  /**
   * 处理错误情况
   */
  private async handleError(startMsg: DB_Message, chatParams: DB_Message, errorText: string) {
    console.error("[chat] onError:", errorText)

    const errorMessage = errorText || "未知错误"
    const content = `\n\n${prettyObject({ error: true, message: errorMessage })}`

    try {
      this.updateMessage(startMsg, { message: content, done: true })

      // 非本地模式下发送错误信息到服务器
      if (!__LOCAL_MODE__ && errorMessage) {
        await this.sendRestMessage(chatParams, { message: content })
      }
    } catch (error) {
      console.error("处理错误消息时出错:", error)
    } finally {
      emitUpdateScrollImmediate("robot")
      useChatStore().updateSendingState(chatParams.to, "delete")
    }
  }

  /**
   * 处理控制器
   */
  private handleController(controller: AbortController) {
    console.log("[chat] onController:", controller)
  }
}

export const chatService = new ChatService()

export const sendChatAssistantMessage = (params: ChatServiceParams) => chatService.sendMessage(params)
