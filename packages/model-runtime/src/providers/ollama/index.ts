import { Ollama } from "ollama/browser"
import { ClientOptions } from "openai"
import { ModelProvider } from "model-bank"

import { RuntimeAI } from "../../core/BaseAI"
import { convertIterableToStream, parseDataUri } from "../../core/streams/protocol"
import { OllamaStream } from "../../core/streams"
import { debugStream } from "../../utils/debugStream"
import { StreamingResponse } from "../../utils/response"

import { OllamaMessage } from "./type"
import type { ChatMethodOptions, ChatStreamPayload, OpenAIChatMessage } from "@pure/types"
import type { Tool } from "ollama/browser"

export const params = {
  baseURL: undefined,
  debug: {
    chatCompletion: () => false,
  },
  provider: ModelProvider.Ollama,
}

export class OllamaAI implements RuntimeAI {
  private client: Ollama

  baseURL?: string

  constructor({ baseURL }: ClientOptions = {}) {
    try {
      if (baseURL) new URL(baseURL)
    } catch {
      throw new Error(`Invalid baseURL: ${baseURL}`)
    }

    if (baseURL) this.baseURL = baseURL
    this.client = this.createOllamaClient(!baseURL ? undefined : baseURL)
  }

  private createOllamaClient(url?: string) {
    const host = url || import.meta.env.VITE_OLLAMA_PROXY_URL
    return new Ollama({
      host: host,
      // fetch: (input: RequestInfo | URL, init: RequestInit = {}) => {
      //   const headers = new Headers(init.headers)
      //   const authToken = "ollama-token"

      //   if (authToken) headers.set("Authorization", `Bearer ${authToken}`)

      //   return fetch(input, { ...init, headers })
      // },
    })
  }

  private buildOllamaMessages(messages: OpenAIChatMessage[]) {
    return messages.map((t) => this.convertContentToOllamaMessage(t))
  }

  private convertContentToOllamaMessage = (message: OpenAIChatMessage): OllamaMessage => {
    if (typeof message.content === "string") {
      return { content: message.content, role: message.role }
    }

    const ollamaMessage: OllamaMessage = {
      content: "",
      role: message.role,
    }

    for (const content of message.content) {
      switch (content.type) {
        case "text": {
          ollamaMessage.content = content.text
          break
        }
        case "image_url": {
          const { base64 } = parseDataUri(content.image_url.url)
          if (base64) {
            ollamaMessage.images ??= []
            ollamaMessage.images.push(base64)
          }
          break
        }
      }
    }

    return ollamaMessage
  }

  async chat(payload: ChatStreamPayload, options?: ChatMethodOptions) {
    try {
      const abort = () => {
        this.client.abort()
        options?.signal?.removeEventListener("abort", abort)
      }

      options?.signal?.addEventListener("abort", abort)

      const response = await this.client.chat({
        messages: this.buildOllamaMessages(payload.messages),
        model: payload.model,
        options: {
          frequency_penalty: payload.frequency_penalty || 0,
          presence_penalty: payload.presence_penalty || 0,
          temperature: payload.temperature !== undefined ? payload.temperature / 2 : undefined,
          top_p: payload.top_p || 1,
          // images: [],
        },
        stream: true,
        tools: payload?.tools as Tool[],
      })

      const stream = convertIterableToStream(response)

      const [prod, debug] = stream.tee()

      if (import.meta.env.DEBUG_OLLAMA_CHAT_COMPLETION === "1") {
        debugStream(debug).catch(console.error)
      }

      return StreamingResponse(OllamaStream(prod, options?.callback), {
        headers: options?.headers || {},
      })
    } catch (error) {
      const e = error as {
        error: any
        message: string
        name: string
        status_code: number
      }

      if (e.message === "Failed to fetch") {
        const Error = {
          message: "请检查您的olama服务是否可用",
          errorType: "请求 Ollama 服务出错，请检查后重试",
          provider: ModelProvider.Ollama,
        }
        throw Error
      }
      const Error = {
        message: e,
        errorType: "请求 Ollama 服务出错，请检查后重试",
        provider: ModelProvider.Ollama,
      }
      throw Error
    }
  }

  async models() {
    // const { models } = await this.client.list()
    // return models.map((model) => ({
    //   id: model.name,
    //   icon: getIcon(model.name),
    // }))
  }
}

export default OllamaAI
