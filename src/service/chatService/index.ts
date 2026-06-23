import { cloneDeep, merge } from "lodash-es"

import debug from "debug"
import { getAiAvatarUrl } from "@pure/utils"
import { ModelProvider, Provider } from "model-bank"
import { prettyObject, getUnixTimestampSec } from "@pure/utils"
import { DB_Message } from "@pure/database/schemas"
import { restApi } from "@/service/api"
import { createCustomMessage } from "@/service/im-sdk-api"
import { useChatStore, useRobotStore, useAppStore } from "@/stores"
import { createThinkingCustomData, hostPreview } from "@pure/utils"
import { getCustomMsgContent } from "@/utils/common"
import { generateReferencePrompt } from "@/utils/messageUtils/search"
import { emitUpdateScrollImmediate } from "@/utils/mitt-bus"
import { fetchSSE, FetchOptions, standardizeAnimationStyle } from "@pure/fetch-sse"

import { initializeWithClientStore } from "@/service/chatService/clientModelRuntime"
import { DEFAULT_AGENT_CONFIG } from "@pure/const"

import { contextEngineering } from "./mecha"
import { animationSpeedMap } from "@/views/settings/settings"

import type { messageHandle } from "@/types"
import type { contextParams, FetchSSEOptions } from "@pure/fetch-sse"
import { ChatErrorType } from "@pure/types"
import { ChatCompletionErrorPayload, createErrorResponse } from "@pure/model-runtime"
import type { ChatStreamPayload, OpenAIChatMessage } from "@pure/types"

import { StreamingHandler } from "./agents/StreamingHandler"
import type { StreamChunk } from "./agents/types/streaming"

interface ChatServiceParams {
  messages: DB_Message[]
  chat: DB_Message
  loadMessage?: DB_Message
  provider: Provider
}

interface GetChatCompletionPayload extends Partial<Omit<ChatStreamPayload, "messages">> {
  messages: OpenAIChatMessage[] | DB_Message[]
}

type ChatStreamInputParams = Partial<Omit<ChatStreamPayload, "messages">> & {
  messages?: OpenAIChatMessage[]
}

interface FetchAITaskResultParams extends FetchSSEOptions {
  abortController?: AbortController
  onError?: (e: Error, rawError?: any) => void
  /**
   * Loading state change handler function
   * @param loading - Whether in loading state
   */
  onLoadingChange?: (loading: boolean) => void
  /**
   * Request object
   */
  params: ChatStreamInputParams
}

interface CreateAssistantMessageStream extends FetchSSEOptions {
  abortController?: AbortController
  historySummary?: string
  /** Initial context for page editor (captured at operation start) */
  params: GetChatCompletionPayload
}

const log = debug("service:agent-executors")

class ChatService {
  protected getBaseURL(provider: any): string {
    return useRobotStore().getAccessStore(provider).openaiUrl
  }

  private getPath(provider: any, path?: string): string {
    const baseUrl = this.getBaseURL(provider)
    const fullPath = hostPreview(baseUrl, path)
    return fullPath
  }

  private getHeaders(provider: any): Record<string, string> {
    const headers = {
      "Content-Type": "application/json",
      // "x-requested-with": "XMLHttpRequest",
      Authorization: `Bearer ${useRobotStore().getAccessStore(provider).token?.trim()}`,
    }
    return headers
  }

  private async fetchOnClient(params: { payload: Partial<ChatStreamPayload>; provider: string; signal?: AbortSignal }) {
    const data = params.payload as ChatStreamPayload

    const agentRuntime = initializeWithClientStore({
      provider: params.provider,
      payload: {
        ...params.payload,
      },
    })
    return await agentRuntime.chat(data, { signal: params.signal })
  }

  private getFetchOnClient({ provider, payload }: { provider: any; payload: Partial<ChatStreamPayload> }) {
    let fetcher: typeof fetch | undefined = undefined
    fetcher = async () => {
      try {
        return await this.fetchOnClient({
          payload,
          provider,
        })
      } catch (error) {
        const { errorType = ChatErrorType.BadRequest, error: errorContent } = error as ChatCompletionErrorPayload
        const errorMessage = errorContent || error

        console.error(`Route: [${provider}] ${errorType}:`, errorMessage)

        return createErrorResponse(errorType, {
          error,
          provider,
        })
      }
    }
    return fetcher
  }

  async createAssistantMessage({ messages, ...params }: GetChatCompletionPayload, options?: FetchOptions) {
    const payload = merge(
      {
        model: DEFAULT_AGENT_CONFIG.model,
        stream: true,
        ...DEFAULT_AGENT_CONFIG.params,
      },
      params
    )
    console.log("payload", payload)

    const modelMessages = await contextEngineering({
      messages,
      model: payload.model,
      // plugins,
      provider: payload.provider!,
      historyCount: payload?.historyCount,
    })

    return this.getChatCompletion(
      {
        ...params,
        // ...extendParams,
        messages: modelMessages,
        // Use the chatConfig from the target agent for streaming preference
        stream: true,
        // tools,
      },
      { ...options }
    )
  }

  async createAssistantMessageStream({
    params,
    abortController,
    historySummary,
    onAbort,
    onMessageHandle,
    onErrorHandle,
    onFinish,
  }: CreateAssistantMessageStream) {
    await this.createAssistantMessage(params, {
      historySummary,
      onAbort,
      onErrorHandle,
      onFinish,
      onMessageHandle,
      signal: abortController?.signal,
    })
  }

  async getChatCompletion(params: Partial<ChatStreamPayload>, options?: FetchOptions) {
    const { signal, responseAnimation } = options ?? {}

    const { provider = ModelProvider.OpenAI, ...res } = params
    const chatPath = this.getPath(provider)

    let fetcher: typeof fetch | undefined = undefined

    const payload = {
      ...res,
      messages: res.messages || [],
    }

    fetcher = this.getFetchOnClient({ provider, payload })

    const appStore = useAppStore()
    const userPreferTransitionMode = animationSpeedMap[appStore.responseAnimation]

    // The order of the array is very important —— user preference as base, responseAnimation overrides it.
    const mergedResponseAnimation = [userPreferTransitionMode, responseAnimation].reduce(
      (acc, cur) => merge(acc, standardizeAnimationStyle(cur)),
      {}
    )

    return fetchSSE(chatPath, {
      body: JSON.stringify(payload),
      fetcher: fetcher,
      headers: this.getHeaders(provider),
      method: "POST",
      onAbort: options?.onAbort,
      onErrorHandle: options?.onErrorHandle,
      onFinish: options?.onFinish,
      onMessageHandle: options?.onMessageHandle,
      responseAnimation: mergedResponseAnimation,
      signal,
    })
  }

  async fetchPresetTaskResult({
    params,
    onMessageHandle,
    onFinish,
    onError,
    onLoadingChange,
    abortController,
  }: FetchAITaskResultParams) {
    const errorHandle = (error: Error, errorContent?: any) => {
      onLoadingChange?.(false)
      if (abortController?.signal.aborted) {
        return
      }
      onError?.(error, errorContent)
      console.error(error)
    }

    onLoadingChange?.(true)

    try {
      const llmMessages = params.messages

      await this.getChatCompletion(
        { ...params, messages: llmMessages },
        {
          onErrorHandle: (error) => {
            errorHandle(new Error(error.message), error)
          },
          onFinish,
          onMessageHandle,
          signal: abortController?.signal,
        }
      )

      onLoadingChange?.(false)
    } catch (e) {
      errorHandle(e as Error)
    }
  }
}

export const chatService = new ChatService()

class ChatServiceMessage {
  private startMsg?: DB_Message
  private chatMsg?: DB_Message

  async sendMessage({ messages, chat, provider, loadMessage }: ChatServiceParams) {
    const chatStore = useChatStore()
    chatStore.updateSendingState(chat?.to, "add")
    const startMsg = loadMessage || this.createLoadingMessage(chat)

    if (this.shouldAbortSend(provider, startMsg)) return

    this.startMsg = startMsg
    this.chatMsg = chat
    await this.handleWebSearchIfNeeded(chat, startMsg)

    const llmMessages = this.shouldUseCurrentMessages() ? chatStore.currentMessageList : messages

    const handler = new StreamingHandler(
      {
        messageId: startMsg?.ID,
      },
      {
        onContentUpdate: (content, reasoning) => {
          this.updateMessage({
            message: startMsg,
            data: {
              text: content,
              reasoning,
            },
          })
        },
        onReasoningUpdate: (reasoning) => {
          this.updateMessage({
            message: startMsg,
            data: { reasoning },
          })
        },
      }
    )

    await chatService.createAssistantMessageStream({
      params: {
        messages: llmMessages,
        provider,
        ...useRobotStore().getAccessStore(provider),
      },
      onMessageHandle: (chunk) => {
        handler.handleChunk(chunk as StreamChunk)
      },
      onFinish: async (text, context) => {
        const result = await handler.handleFinish(text, context || {})
        await this.handleFinish({
          text,
          context: {
            reasoning: result.metadata.reasoning,
            type: result.finishType as contextParams["type"],
          },
        })
      },
      onErrorHandle: (error) => {
        this.handleError(error)
      },
    })

    const content = handler.getOutput()

    // Log llm result
    if (content) {
      log(`[${this.chatMsg?.ID}][content]`, content)
    }
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
    log("[updateMessage] data=%0", data)
    const chatStore = useChatStore()
    const chat = message || this.chatMsg
    if (!chat) return

    const { text = "", done: isFinish = false, reasoning } = data ?? {}

    chat.payload!.text = text
    Object.assign(chat, {
      // payload: { text: text },
      // clientTime: getUnixTimestampSec(),
      status: isFinish ? "success" : "sending",
    })

    if (reasoning?.content) {
      chat.cloudCustomData = createThinkingCustomData({ payload: { text: reasoning.content } }, reasoning)
    } else if (isFinish) {
      // chat.cloudCustomData = handleWebSearchData(chat, true)
      if (chat.type === "TIMTextElem") {
        chat.payload = { text: chat.payload?.text || "" }
      }
    }

    const messages = {
      sessionId: `C2C${chat.from}`,
      message: cloneDeep(chat),
    }

    chatStore.updateMessages(messages)

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
  private shouldAbortSend(provider: any, startMsg: DB_Message): boolean {
    const params = useRobotStore().getAccessStore(provider)
    // Ollama 模型不需要 token 检查
    if (provider === ModelProvider.Ollama || params.token) {
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
    const chatStore = useChatStore()
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
        chatStore.updateSendingState(chatParams.to, "delete")
        await this.sendRestMessage(chatParams, finishedData)
      }
    } catch (error) {
      console.error("handleFinish error:", error)
    } finally {
      chatStore.updateSendingState(chatParams.to, "delete")
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

export const chatServiceMessage = new ChatServiceMessage()

export const sendChatAssistantMessage = (params: ChatServiceParams) => chatServiceMessage.sendMessage(params)
