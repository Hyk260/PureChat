import { EventStreamContentType, fetchEventSource } from "@microsoft/fetch-event-source"

import { REQUEST_TIMEOUT_MS } from "@/ai/constant"
import { isClaudeReasoningModel } from "@/ai/reasoning"
import {
  ChatOptions,
  FewShots,
  LLMConfig,
  LLMParams,
  ModelProvider,
  ModelProviderKey,
  OpenAIListModelResponse,
} from "@/ai/types"
import { isNotSupportTemperatureAndTopP } from "@/ai/utils"
import {
  adjustForDeepseek,
  createErrorResponse,
  extractImageMessage,
  generateDalle3RequestPayload,
  getModelId,
  isDalle3 as _isDalle3,
  useAccessStore,
} from "@/ai/utils"
import { useChatStore, useRobotStore } from "@/stores"
import { addAbortController, removeAbortController } from "@/utils/abortController"
import { hostPreview } from "@/utils/api"
import { transformData } from "@/utils/chat"

import OllamaAI from "../ollama/ollama"

export * from "./config"
export * from "./modelValue"

export const OpenaiPath = {
  ChatPath: "chat/completions", // chatgpt 聊天接口
  UsagePath: "dashboard/billing/usage", // 用量查询，数据单位为 token
  SubsPath: "dashboard/billing/subscription", // 总量查询，数据单位为 token
  ListModelPath: "models", // 查询可用模型
  EmbeddingPath: "embeddings", // 文本向量化
}

export class OpenAiApi {
  provider: ModelProviderKey = ModelProvider.OpenAI

  constructor(provider: ModelProviderKey) {
    this.provider = provider
  }

  getPath(path?: string): string {
    const baseUrl = this.accessStore().openaiUrl
    const fullPath = hostPreview(baseUrl, path)
    return fullPath
  }

  /**
   * 获取插件工具列表
   */
  getPluginTools() {
    // const pluginList = useToolsStore().tools
    // if (!pluginList.length) return []

    // if (useRobotStore().model?.functionCall) {
    //   return pluginList.map((t) => t.tools[0])
    // }

    return []
  }

  /**
   * 获取提示词存储
   */
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

  /**
   * 处理提示词消息
   */
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

  async fetchOnClient(messages: FewShots) {
    const payload = this.accessStore()
    const options = { messages, ...payload }
    return await new OllamaAI().chat(options, {
      callback: {},
      // signal: ""
      headers: {
        Authorization: `Bearer ${this.accessStore().token?.trim()}`,
      },
    })
  }

  enableFetchOnClient(messages: FewShots, modelConfig: LLMParams) {
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

  getTopP(top_p: number | undefined, model: any): number | undefined {
    if (isClaudeReasoningModel(model)) {
      return undefined
    }
    if (isNotSupportTemperatureAndTopP(model)) {
      return undefined
    }

    return top_p ? top_p : undefined
  }

  /**
   * 生成请求负载
   */
  generateRequestPayload(messages: FewShots, modelConfig: LLMParams, options: LLMConfig) {
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
      // tools: [] // 工具
    }
    // const tools = this.getPluginTools()
    // if (tools.length > 0) {
    //   payload.tools = tools
    //   payload.stream = false
    // }
    return payload
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
      const chatPath = this.getPath()
      const chatPayload = {
        method: "POST",
        body: JSON.stringify(requestPayload),
        // fetch: () => {},
        signal: controller.signal,
        headers: this.getHeaders(),
      }

      // ollama本地模型使用自定义 fetch 请求
      if (this.isOllamaProvider()) {
        chatPayload.fetch = this.enableFetchOnClient(messages, modelConfig)
      }

      // 流式输出
      if (shouldStream) {
        await this.handleStreamingChat(chatPath, chatPayload, options, controller, cleanUp)
      } else {
        await this.handleNonStreamingChat(chatPath, chatPayload, options, controller, cleanUp)
      }
    } catch (error) {
      console.error("[Request] failed to make a chat reqeust", error)
      options?.onError?.(error instanceof Error ? error.message : "请求失败，请稍后重试")
    }
  }

  /**
   * 处理流式响应错误
   */
  async handleStreamError(response: Response, options: ChatOptions, finish: () => void) {
    let errorInfo = ""

    try {
      const responseData = (await response.clone().json()) as string
      errorInfo = JSON.stringify(responseData, null, 2)
    } catch {
      errorInfo = await response.clone().text()
    }

    if (response.status === 401) {
      options?.onError?.("认证失败，请检查 API 密钥")
    } else {
      options?.onError?.(errorInfo || `请求失败 (${response.status})`)
    }

    finish()
  }

  /**
   * 处理流式消息
   */
  handleStreamMessage(msg: any, remainText: string, reasoningText: string, options: ChatOptions, finish: () => void) {
    console.log("[OpenAI] 收到消息:", msg)

    if (msg.data === "[DONE]") {
      finish()
      return null
    }

    try {
      const data = JSON.parse(msg.data)

      if (this.isOllamaProvider()) {
        if (data === "[DONE]") {
          finish()
          return null
        }
        const delta = data.message?.content
        if (delta) {
          remainText += delta
        }
      } else {
        const choice = data.choices?.[0]
        if (!choice) return null

        // 处理普通内容
        const delta = choice.delta?.content
        if (delta) {
          remainText += delta
        } else {
          // 处理推理内容（如 DeepSeek）
          const reasoning = choice.delta?.reasoning_content
          if (reasoning) {
            reasoningText += reasoning
            options?.onReasoningMessage?.(reasoningText)
          }
        }
      }

      // 返回更新后的值
      return { remainText, reasoningText }
    } catch (error) {
      console.error("[OpenAI] 解析消息失败:", error, msg.data)
      return null
    }
  }

  /**
   * 检查是否为 Ollama
   */
  isOllamaProvider(): boolean {
    return this.provider === ModelProvider.Ollama
  }

  /**
   * 处理流式聊天的响应。
   */
  async handleStreamingChat(
    chatPath: string,
    chatPayload: any,
    options: ChatOptions,
    controller: AbortController,
    cleanUp: () => void
  ) {
    let responseText = "" // 用于存储完整的响应文本
    let remainText = "" // 用于存储尚未处理的文本
    let reasoningText = "" // 用于存储完整的推理内容
    let finished = false // 用于标记动画是否已完成

    /**
     * 动画响应文本的显示。
     * 根据剩余文本的长度逐步更新响应文本。
     */
    const animateResponseText = () => {
      // 如果动画已完成或请求已被中止，结束动画
      if (finished || controller.signal.aborted) {
        responseText += remainText
        console.log("[OpenAI] 流式响应完成")
        cleanUp()
        // 如果响应文本为空，触发错误回调
        if (!responseText.trim()) {
          this.updateSendingState("delete")
          // options.onError?.("服务器繁忙，请稍后再试。")
        }
        return
      }
      // 如果有剩余文本，进行文本动画更新
      if (remainText.length > 0) {
        const chunkSize = Math.max(1, Math.round(remainText.length / 60))
        const chunk = remainText.slice(0, chunkSize)

        responseText += chunk
        remainText = remainText.slice(chunkSize)

        options?.onUpdate?.({
          message: responseText,
          fetchCount: chunk,
          think: reasoningText,
        })
      }

      requestAnimationFrame(animateResponseText)
    }

    // 开始动画
    animateResponseText()

    // 完成处理函数
    const finish = () => {
      if (!finished) {
        finished = true
        options?.onFinish?.({
          message: responseText + remainText,
          think: reasoningText,
        })
        cleanUp()
      }
    }

    controller.signal.onabort = () => {
      options.onError?.("请求已手动终止")
      finish()
    }

    // 取消fetch请求
    const requestTimeoutId = setTimeout(() => controller?.abort(), REQUEST_TIMEOUT_MS)

    const handleStreamError = this.handleStreamError

    await fetchEventSource(chatPath, {
      ...chatPayload,
      async onopen(res) {
        console.log("[OpenAI] fetchEventSource", res)
        clearTimeout(requestTimeoutId)
        const contentType = res.headers.get("content-type")
        // text/event-stream; charset=utf-8
        console.log("[OpenAI] request response content type: ", contentType)

        if (contentType?.startsWith("text/plain")) {
          responseText = await res.clone().text()
          return finish()
        }

        // text/event-stream EventStreamContentType
        const stream = contentType?.startsWith(EventStreamContentType)

        // 检查流式响应格式
        const isValidStream = stream && res.ok && res.status === 200

        if (!isValidStream) {
          await handleStreamError(res, options, finish)
        }
      },
      onmessage: (msg) => {
        const result = this.handleStreamMessage(msg, remainText, reasoningText, options, finish)
        if (result) {
          remainText = result.remainText
          reasoningText = result.reasoningText
        }
      },
      onclose: finish,
      onerror(error) {
        console.error("[OpenAI] 流式请求错误:", error)
        options.onError?.(error instanceof Error ? error.message : "流式请求发生错误")
        cleanUp()
        throw error
      },
      openWhenHidden: true,
    })
  }

  /**
   * 处理非流式聊天
   */
  async handleNonStreamingChat(
    chatPath: string,
    chatPayload: any,
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
      const message = await this.extractMessage(responseJson)

      options?.onFinish?.({ message })
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
   * 更新发送状态
   */
  updateSendingState(action: "add" | "delete" = "delete") {
    try {
      const modelId = getModelId(this.provider)
      useChatStore().updateSendingState(modelId, action)
    } catch (error) {
      console.error("更新发送状态失败:", error)
    }
  }

  /**
   * 获取模型列表
   */
  async getModels() {
    const url = this.getPath(OpenaiPath.ListModelPath)
    if (!url.startsWith("http")) {
      window.$message?.error("接口地址格式错误")
      throw new Error("接口地址格式错误")
    }
    const response = await fetch(url, {
      method: "GET",
      headers: this.getHeaders(),
    })

    const responseJson = (await response.json()) as OpenAIListModelResponse
    const chatModels = responseJson.data.filter((model) => model.id.startsWith("gpt-") || model.id.startsWith("openai"))

    const seen = new Set<string>()
    const uniqueModels = [] as typeof chatModels
    for (const m of chatModels) {
      if (!seen.has(m.id)) {
        seen.add(m.id)
        uniqueModels.push(m)
      }
    }

    return uniqueModels.map((model) => ({
      id: model.id,
      icon: "",
      displayName: model.id,
    }))
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
