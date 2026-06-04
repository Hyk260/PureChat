import { fetchSSE } from "@pure/utils"
import { cleanObject } from "@pure/utils/object"
import { REQUEST_TIMEOUT_MS } from "@pure/const"
import { Provider, LLMConfig, LLMParams, ModelProvider } from "model-bank"
import { isClaudeReasoningModel, isNotSupportTemperatureAndTopP } from "@pure/utils"
import { useAccessStore } from "@/ai/utils"
import { useRobotStore } from "@/stores"
import { addAbortController, removeAbortController, hostPreview, transformContent } from "@pure/utils"
import { initializeWithClientStore } from "@/service/chatService/clientModelRuntime"
import { ChatErrorType } from "@pure/types"
import { ChatCompletionErrorPayload, createErrorResponse } from "@pure/model-runtime"
import type { FewShots, ChatOptions, ChatPayload, ChatStreamPayload } from "@pure/types"

export abstract class OpenAIBaseClient {
  provider: Provider = ModelProvider.OpenAI
  finalPayload: ChatStreamPayload

  constructor(provider: Provider) {
    this.provider = provider
  }

  protected getBaseURL(): string {
    return useAccessStore(this.provider).openaiUrl
  }

  getPath(path?: string): string {
    const baseUrl = this.getBaseURL()
    const fullPath = hostPreview(baseUrl, path)
    return fullPath
  }

  getPromptStore() {
    try {
      const prompts = useRobotStore().currentProviderPrompt?.prompt
      const validPrompts = prompts?.filter((t) => t.content) || []
      return validPrompts
    } catch (error) {
      console.error("获取提示词失败:", error)
      return []
    }
  }

  processPromptMessages(messages: FewShots, modelConfig: LLMParams) {
    let combinedMessages: FewShots = []
    const validPrompts = this.getPromptStore()
    const historyCount = Math.max(Number(modelConfig.historyMessageCount) || 0, 0)
    const recentMessages = messages.slice(-historyCount)

    if (validPrompts.length > 0) {
      combinedMessages = [...validPrompts, ...recentMessages] // prompt
    } else {
      combinedMessages = recentMessages // 上下文
    }

    return combinedMessages
  }

  accessStore(model = this.provider) {
    return useAccessStore(model)
  }

  getHeaders(): Record<string, string> {
    const headers = {
      "Content-Type": "application/json",
      // "x-requested-with": "XMLHttpRequest",
      Authorization: `Bearer ${this.accessStore().token?.trim()}`,
    }
    return headers
  }

  async extractMessage(res: any) {
    if (res?.error) {
      return "```\n" + JSON.stringify(res, null, 4) + "\n```"
    }
    return res.choices?.[0]?.message?.content ?? res
  }

  private async fetchOnClient(params: { payload: Partial<ChatStreamPayload>; provider: string; signal?: AbortSignal }) {
    const data = params.payload as ChatStreamPayload

    const agentRuntime = initializeWithClientStore({
      provider: params.provider,
      payload: {
        apiKey: this.accessStore().token?.trim(),
        baseURL: this.accessStore().openaiUrl?.trim(),
        ...params.payload,
      },
    })
    const headers = this.getHeaders()
    return await agentRuntime.chat(data, { requestHeaders: headers, signal: params.signal })
  }

  private getFetchOnClient() {
    let fetcher: typeof fetch | undefined = undefined
    fetcher = async () => {
      try {
        return await this.fetchOnClient({
          payload: this.finalPayload,
          provider: this.provider,
        })
      } catch (error) {
        const { errorType = ChatErrorType.BadRequest, error: errorContent } = error as ChatCompletionErrorPayload
        const errorMessage = errorContent || error

        console.error(`Route: [${this.provider}] ${errorType}:`, errorMessage)

        return createErrorResponse(errorType, {
          error,
          provider: this.provider,
        })
      }
    }
    return fetcher
  }

  private getTools() {
    return null
  }

  private getTopP(top_p: number | undefined, model: any): number | undefined {
    if (isClaudeReasoningModel(model)) {
      return undefined
    }
    if (isNotSupportTemperatureAndTopP(model)) {
      return undefined
    }

    return top_p ? top_p : undefined
  }

  private generateRequestPayload(messages: FewShots, modelConfig: LLMParams, options: LLMConfig) {
    const payload = {
      messages: this.processPromptMessages(messages, modelConfig),
      stream: options.stream, // 流式传输
      model: modelConfig.model, // 模型
      // max_tokens: modelConfig.max_tokens, // 单次回复限制
      temperature: modelConfig.temperature, // 随机性
      presence_penalty: modelConfig.presence_penalty, //话题新鲜度
      frequency_penalty: modelConfig.frequency_penalty, // 频率惩罚度
      top_p: this.getTopP(modelConfig?.top_p, { id: modelConfig.model }), // 核采样
      tools: this.getTools(), // 工具
    }
    const cleanPayload = cleanObject(payload)

    this.finalPayload = cleanPayload

    return cleanPayload
  }

  async chat(options: ChatOptions) {
    const { requestId } = options
    if (!requestId) {
      // options.onError?.("请求终止功能需要传入 requestId")
      return
    }

    const messages = await transformContent(options.messages)
    const modelConfig = {
      ...this.accessStore(),
      model: options.config.model,
    }

    const requestPayload = this.generateRequestPayload(messages, modelConfig, options.config)
    console.log("[Request] OpenAI payload: ", requestPayload)

    const shouldStream = !!options.config.stream
    const controller = new AbortController()

    const abortFn = () => controller.abort()
    addAbortController(requestId, abortFn)

    const cleanUp = () => {
      removeAbortController(requestId, abortFn)
    }

    try {
      const chatPayload: ChatPayload = {
        method: "POST",
        body: JSON.stringify(requestPayload),
        signal: controller.signal,
        headers: this.getHeaders(),
      }

      chatPayload.fetch = this.getFetchOnClient()

      // 流式输出
      if (shouldStream) {
        await this.handleStreamingChat(chatPayload, options)
      } else {
        await this.handleNonStreamingChat(chatPayload, options, controller, cleanUp)
      }
    } catch (error) {
      console.error("[Request] failed to make a chat reqeust", error)
      // options?.onError?.(error instanceof Error ? error.message : "请求失败，请稍后重试")
    }
  }

  /**
   * 处理流式聊天的响应。
   */
  private async handleStreamingChat(chatPayload: ChatPayload, options: ChatOptions) {
    let output = ""
    let thinking = ""
    let thinkingStartAt: number
    let duration: number

    const chatPath = this.getPath()

    return await fetchSSE(chatPath, {
      ...chatPayload,
      fetcher: chatPayload.fetch,
      onAbort: (data) => {
        console.log("onAbort", data)
      },
      onClose: () => {
        console.log("onClose")
      },
      onOpenHandle: (res) => {
        console.log("onOpenHandle:", res)
      },
      onErrorHandle: (data) => {
        console.log("onErrorHandle:", data)
        options?.onError?.(data)
      },
      onFinish: async (text, context) => {
        console.log("onFinish: [text]", text)
        console.log("onFinish: [context]", context)
        await options?.onFinish?.(text, context)
      },
      onMessageHandle: (chunk) => {
        console.log("onMessageHandle:", chunk)
        switch (chunk.type) {
          case "text": {
            output += chunk.text
            // 推理结束
            if (!duration && thinkingStartAt !== undefined) {
              console.log("推理结束")
              duration = Date.now() - thinkingStartAt
              // toggleChatReasoning(false)
            }
            options?.onUpdate?.({
              text: output,
              reasoning: duration ? { content: thinking, reasoningType: "done", duration } : undefined,
            })
            break
          }
          case "reasoning": {
            thinking += chunk.text
            // 推理开始
            if (!thinkingStartAt) {
              console.log("推理开始")
              thinkingStartAt = Date.now()
              // toggleChatReasoning(true)
            }
            if (thinkingStartAt !== undefined) {
              duration = Date.now() - thinkingStartAt
            }
            options?.onUpdate?.({ thinking, reasoning: { content: thinking, reasoningType: "thinking", duration } })
            break
          }
        }
      },
      responseAnimation: {
        speed: 100,
        text: "smooth",
      },
    })
  }

  /**
   * 处理非流式聊天
   */
  private async handleNonStreamingChat(
    chatPayload: ChatPayload,
    options: ChatOptions,
    controller: AbortController,
    cleanUp: () => void
  ) {
    const requestTimeoutId = setTimeout(() => {
      controller?.abort()
      cleanUp()
    }, REQUEST_TIMEOUT_MS)

    try {
      const chatPath = this.getPath()
      const response = await fetch(chatPath, chatPayload)
      clearTimeout(requestTimeoutId)

      if (response.status === 401) {
        cleanUp()
        return
      }

      if (!response.ok) {
        cleanUp()
        return
      }

      const responseJson = await response.json()
      const message: string = await this.extractMessage(responseJson)

      options?.onFinish?.(message)
      cleanUp()
    } catch {
      clearTimeout(requestTimeoutId)
      cleanUp()
    }
  }

  /**
   * 检查连通性
   */
  // async checkConnectivity({ model = "" }: { model: string }): Promise<{ valid: boolean; error: string }> {
  //   const url = this.getPath()
  //   if (!url.startsWith("http")) {
  //     return {
  //       valid: false,
  //       error: "接口地址格式错误",
  //     }
  //   }
  //   const payload = this.accessStore()

  //   const chatPayload = {
  //     method: "POST",
  //     body: JSON.stringify({
  //       messages: [{ role: "user", content: "Hi, hello" }],
  //       model: model || payload?.model,
  //       stream: true,
  //       stream_options: {
  //         include_usage: true,
  //       },
  //       temperature: 1,
  //       top_p: 1,
  //     }),
  //     headers: this.getHeaders(),
  //   }

  //   try {
  //     const res = await fetch(url, chatPayload)
  //     if (!res.ok) {
  //       const resJson = await res.json()
  //       console.log("[Check] Response received:", resJson)
  //       return {
  //         valid: false,
  //         error: resJson?.error?.message || "未知错误",
  //       }
  //     }
  //     return {
  //       valid: true,
  //       error: "未知错误",
  //     }
  //   } catch (error) {
  //     return {
  //       valid: false,
  //       error: error instanceof Error ? error.message : "未知错误",
  //     }
  //   }
  // }
}
