import debug from "debug"
import OpenAI, { ClientOptions } from "openai"
// import { Stream } from "openai/streaming"

import { debugResponse, debugStream } from "../../utils/debugStream"
import { StreamingResponse } from "../../utils/response"
import { RuntimeAI } from "../BaseAI"
import { OpenAIStream, OpenAIStreamOptions } from "../streams"
import { transformResponseToStream } from "./nonStreamToStream"

export * from "./nonStreamToStream"
import type { ChatMethodOptions, ChatStreamPayload } from "@pure/types"

export const CHAT_MODELS_BLOCK_LIST = [
  "embedding",
  "davinci",
  "curie",
  "moderation",
  "ada",
  "babbage",
  "tts",
  "whisper",
  "dall-e",
]

type ConstructorOptions<T extends Record<string, any> = any> = ClientOptions & T

export type CreateImageOptions = Omit<ClientOptions, "apiKey"> & {
  apiKey: string
  provider: string
}

export interface OpenAICompatibleFactoryOptions<T extends Record<string, any> = any> {
  apiKey?: string
  baseURL?: string
  chatCompletion?: (options: any) => Promise<any>
  constructorOptions?: ConstructorOptions<T>
  debug?: {
    chatCompletion: () => boolean
    responses?: () => boolean
  }
  errorType?: {
    bizError: any
    invalidAPIKey: any
  }
  generateObject?: {
    /**
     * Transform schema before sending to the provider (e.g., filter unsupported properties)
     */
    handleSchema?: (schema: any) => any
    /**
     * If true, route generateObject requests to Responses API path directly
     */
    useResponse?: boolean
    /**
     * Allow only some models to use Responses API by simple matching.
     * If any string appears in model id or RegExp matches, Responses API is used.
     */
    useResponseModels?: Array<string | RegExp>
    /**
     * Use tool calling to simulate structured output for providers that don't support native structured output
     */
    useToolsCalling?: boolean
  }
  models?: any
  provider: string
  responses?: {
    handlePayload?: (payload: ChatStreamPayload, options: ConstructorOptions<T>) => ChatStreamPayload
  }
}

export const createOpenAICompatibleRuntime = <T extends Record<string, any> = any>({
  provider,
  baseURL: DEFAULT_BASE_URL,
  apiKey: DEFAULT_API_LEY,
  debug: debugParams,
  constructorOptions,
}: OpenAICompatibleFactoryOptions<T>) => {
  return class OpenAICompatibleAI implements RuntimeAI {
    client!: OpenAI
    baseURL!: string

    private id: string
    private logPrefix: string

    protected _options: ConstructorOptions<T>

    constructor(options: ClientOptions & Record<string, any> = {}) {
      const _options = {
        ...options,
        apiKey: options.apiKey?.trim() || DEFAULT_API_LEY,
        baseURL: options.baseURL?.trim() || DEFAULT_BASE_URL,
      }
      const { apiKey, baseURL = DEFAULT_BASE_URL, ...res } = _options
      this._options = _options as ConstructorOptions<T>

      if (!apiKey) throw new Error("apiKey is required")

      const initOptions = { apiKey, baseURL, ...constructorOptions, ...res }

      this.client = new OpenAI(initOptions)

      this.baseURL = baseURL || this.client.baseURL

      this.id = options.id || provider
      this.logPrefix = `model-runtime:${this.id}`
    }

    async chat({ ...payload }: ChatStreamPayload, options?: ChatMethodOptions) {
      try {
        const inputStartAt = Date.now()

        const isStreaming = payload.stream !== false

        const postPayload = {
          // ...payload,
          messages: payload.messages,
          model: payload.model,
          // stream: payload.stream,
          // input: [],
          stream: !isStreaming ? undefined : isStreaming,
        }
        // as OpenAI.Responses.ResponseCreateParamsStreaming | OpenAI.Responses.ResponseCreateParams

        const response = await this.client.chat.completions.create(postPayload, {
          headers: { Accept: "*/*", ...options?.requestHeaders },
          signal: options?.signal,
        })

        const streamOptions: OpenAIStreamOptions = {
          // bizErrorTypeTransformer: "",
          callbacks: options?.callback,
          payload: {
            model: payload.model,
            pricing: "",
            provider: this.id,
          },
        }

        if (payload.stream) {
          const [prod, debug] = response.tee()

          if (debugParams?.chatCompletion?.()) {
            const dStream = debug instanceof ReadableStream ? debug : debug.toReadableStream()

            debugStream(dStream).catch(console.error)
          }

          return StreamingResponse(
            OpenAIStream(prod, {
              ...streamOptions,
              inputStartAt,
            }),
            {
              headers: options?.headers,
            }
          )
        }

        if (debugParams?.chatCompletion?.()) {
          debugResponse(response)
        }

        const transformHandler = transformResponseToStream
        const stream = transformHandler(response as unknown as OpenAI.ChatCompletion)

        return StreamingResponse(OpenAIStream(stream, { ...streamOptions, enableStreaming: false, inputStartAt }), {
          headers: options?.headers,
        })
      } catch (error) {
        throw this.handleError(error)
      }
    }

    async models() {}

    protected handleError(error: any) {
      const log = debug(`${this.logPrefix}:error`)
      log("handling error: %O", error)
    }
  }
}
