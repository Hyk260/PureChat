import { OpenAI } from "openai"
import { fetchSSE, FetchOptions } from "@pure/utils"
import { cleanObject } from "@pure/utils/object"
import { REQUEST_TIMEOUT_MS } from "@pure/const"
import { Provider, LLMConfig, LLMParams, ModelProvider } from "model-bank"
import { isClaudeReasoningModel, getLowerBaseModelName } from "@/ai/reasoning"
import { isNotSupportTemperatureAndTopP } from "@/ai/utils"
import {
  adjustForDeepseek,
  createErrorResponse,
  extractImageMessage,
  generateDalle3RequestPayload,
  isDalle3 as _isDalle3,
  useAccessStore,
} from "@/ai/utils"
import { useRobotStore } from "@/stores"
import { addAbortController, removeAbortController } from "@pure/utils"
import { hostPreview } from "@/utils/api"
import { transformData } from "@/utils/chat"
import { initializeWithClientStore } from "@/service/chatService/clientModelRuntime"

import type { FewShots, OpenAIListModelResponse, ChatOptions, ChatPayload, ChatStreamPayload } from "@pure/types"

export const OpenaiPath = {
  ChatPath: "chat/completions", // chatgpt 聊天接口
  UsagePath: "dashboard/billing/usage", // 用量查询，数据单位为 token
  SubsPath: "dashboard/billing/subscription", // 总量查询，数据单位为 token
  ListModelPath: "models", // 查询可用模型
  EmbeddingPath: "embeddings", // 文本向量化
}

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

    // DeepSeek 推理模型特殊处理
    if (modelConfig.model === "deepseek-reasoner") {
      return adjustForDeepseek(combinedMessages)
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
    // DALL-E 3模型返回图片URL
    if (res.data) {
      return await extractImageMessage(res)
    }
    return res.choices?.[0]?.message?.content ?? res
  }

  private async fetchOnClient(messages: FewShots) {
    debugger
    const payload = this.accessStore()
    const options = { messages, ...payload }

    const agentRuntime = initializeWithClientStore({
      provider: this.provider,
      payload: {
        apiKey: options.token,
        baseURL: options.openaiUrl,
        ...options,
      },
    })

    return await agentRuntime.chat(this.finalPayload)
  }

  private enableFetchOnClient(messages: FewShots, modelConfig: LLMParams) {
    let fetcher: typeof fetch | undefined = undefined
    const processedMessages = this.processPromptMessages(messages, modelConfig)
    fetcher = async () => {
      try {
        return await this.fetchOnClient(processedMessages)
      } catch (error) {
        const { errorType, error: errorContent } = error
        const errorMessage = errorContent || error
        // 跟踪服务器端的错误
        console.error(`Route: [${this.provider}] ${errorType}:`, errorMessage)
        return createErrorResponse(errorType, {
          error,
          // ...rest,
          // provider: this.provider
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
    // DALL-E 3特殊处理
    if (_isDalle3(modelConfig.model)) {
      return generateDalle3RequestPayload(modelConfig)
    }
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
      options.onError?.("请求终止功能需要传入 requestId")
      return
    }

    const messages = await transformData(options.messages)
    const modelConfig = {
      ...this.accessStore(),
      model: options.config.model,
    }

    const requestPayload = this.generateRequestPayload(messages, modelConfig, options.config)
    console.log("[Request] OpenAI payload: ", requestPayload)

    const isDalle3 = _isDalle3(options.config.model)
    const shouldStream = !isDalle3 && !!options.config.stream
    const controller = new AbortController()

    const abortFn = () => controller.abort()
    addAbortController(requestId, abortFn)

    options.onController?.(controller)

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

      chatPayload.fetch = this.enableFetchOnClient(messages, modelConfig)

      // 流式输出
      if (shouldStream) {
        await this.handleStreamingChat(chatPayload, options)
      } else {
        await this.handleNonStreamingChat(chatPayload, options, controller, cleanUp)
      }
    } catch (error) {
      console.error("[Request] failed to make a chat reqeust", error)
      options?.onError?.(error instanceof Error ? error.message : "请求失败，请稍后重试")
    }
  }

  async getChatCompletion(params: Partial<ChatStreamPayload>, options?: FetchOptions) {
    const { signal, responseAnimation } = options ?? {}

    const { provider = ModelProvider.OpenAI, ...res } = params
    const chatPath = this.getPath()

    let fetcher: typeof fetch | undefined = undefined

    return fetchSSE(chatPath, {
      // body: JSON.stringify(payload),
      fetcher: fetcher,
      headers: this.getHeaders(),
      method: "POST",
      onAbort: options?.onAbort,
      onErrorHandle: options?.onErrorHandle,
      onFinish: options?.onFinish,
      onMessageHandle: options?.onMessageHandle,
      responseAnimation,
      signal,
    })
  }

  /**
   * 处理流式聊天的响应。
   */
  private async handleStreamingChat(chatPayload: ChatPayload, options: ChatOptions) {
    let output = ""
    let thinking = ""

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
      },
      onFinish: (text, context) => {
        console.log("onFinish: [text]", text)
        console.log("onFinish: [context]", context)
        options?.onFinish?.(text, context)
      },
      onMessageHandle: (chunk) => {
        console.log("onMessageHandle:", chunk)
        switch (chunk.type) {
          case "text": {
            output += chunk.text
            options?.onUpdate?.({ text: output })
            break
          }
          case "reasoning": {
            thinking += chunk.text
            options?.onUpdate?.({ thinking })
            break
          }
        }
      },
      responseAnimation: "smooth",
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
      options.onError?.("请求超时")
      cleanUp()
    }, REQUEST_TIMEOUT_MS)

    try {
      const chatPath = this.getPath()
      const response = await fetch(chatPath, chatPayload)
      clearTimeout(requestTimeoutId)

      if (response.status === 401) {
        const errorData = await response.json()
        options?.onError?.(errorData.error?.message || "认证失败")
        cleanUp()
        return
      }

      if (!response.ok) {
        const errorData = await response.json()
        options?.onError?.(errorData.error?.message || `请求失败 (${response.status})`)
        cleanUp()
        return
      }

      const responseJson = await response.json()
      const message: string = await this.extractMessage(responseJson)

      options?.onFinish?.(message)
      cleanUp()
    } catch (error) {
      clearTimeout(requestTimeoutId)
      if (error.name === "AbortError") {
        options?.onError?.("请求超时，请稍后重试")
      } else {
        options?.onError?.(error instanceof Error ? error.message : "网络请求失败")
      }
      cleanUp()
    }
  }

  /**
   * 获取原始模型列表
   */
  async listModels(): Promise<OpenAI.Models.Model[]> {
    const url = this.getPath(OpenaiPath.ListModelPath)
    if (!url.startsWith("http")) {
      window.$message?.error("接口地址格式错误")
      throw new Error("接口地址格式错误")
    }

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: this.getHeaders(),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const errorMessage = errorData.error?.message || `获取模型列表失败 (${response.status})`
        window.$message?.error(errorMessage)
        throw new Error(errorMessage)
      }

      const responseJson = (await response.json()) as OpenAIListModelResponse
      return responseJson.data.map((model) => ({
        id: model.id,
        object: model?.object || "model",
        created: model?.created || 0,
        owned_by: model?.owned_by || "",
      })) as OpenAI.Models.Model[]
    } catch (error) {
      if (error instanceof Error && error.message) throw error
      const errorMessage = error instanceof Error ? error.message : "获取模型列表失败"
      window.$message?.error(errorMessage)
      throw new Error(errorMessage)
    }
  }

  /**
   * 判断模型是否应该被包含在结果中
   * 子类可以覆盖此方法来实现自定义过滤逻辑
   */
  protected shouldIncludeModel(model: OpenAI.Models.Model): boolean {
    const modelId = model.id.toLowerCase()
    return modelId.startsWith("gpt-") || modelId.startsWith("openai")
  }

  /**
   * 获取模型列表
   */
  async getModels() {
    const { DEFAULT_MODEL_LIST } = await import("@/config/modelProviders")
    const models = await this.listModels()
    const filteredModels = models.filter((model) => this.shouldIncludeModel(model))

    const seen = new Set<string>()
    const uniqueModels: OpenAI.Models.Model[] = []
    for (const model of filteredModels) {
      if (!seen.has(model.id)) {
        seen.add(model.id)
        uniqueModels.push(model)
      }
    }

    return uniqueModels.map((model) => {
      const knownModel = DEFAULT_MODEL_LIST.find(
        (m) => m.id === getLowerBaseModelName(model.id) || m.displayName === model.id
      )
      return {
        id: model.id,
        icon: "",
        tokens: knownModel?.tokens || 0,
        // enabled: knownModel?.enabled || false,
        functionCall: knownModel?.functionCall || false,
        reasoning: knownModel?.displayName?.toLowerCase().includes("deepseek-r1") || knownModel?.reasoning || false,
        vision: knownModel?.vision || false,
        displayName: model.id,
      }
    })
  }

  /**
   * 检查连通性
   */
  async checkConnectivity({ model = "" }: { model: string }): Promise<{ valid: boolean; error: string }> {
    const url = this.getPath()
    if (!url.startsWith("http")) {
      return {
        valid: false,
        error: "接口地址格式错误",
      }
    }
    const payload = this.accessStore()

    const chatPayload = {
      method: "POST",
      body: JSON.stringify({
        messages: [{ role: "user", content: "Hi, hello" }],
        model: model || payload?.model,
        stream: true,
        stream_options: {
          include_usage: true,
        },
        temperature: 1,
        top_p: 1,
      }),
      headers: this.getHeaders(),
    }

    try {
      const res = await fetch(url, chatPayload)
      if (!res.ok) {
        const resJson = await res.json()
        console.log("[Check] Response received:", resJson)
        return {
          valid: false,
          error: resJson?.error?.message || "未知错误",
        }
      }
      return {
        valid: true,
        error: "未知错误",
      }
    } catch (error) {
      return {
        valid: false,
        error: error instanceof Error ? error.message : "未知错误",
      }
    }
  }
}
