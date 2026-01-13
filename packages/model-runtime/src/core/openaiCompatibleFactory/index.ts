import OpenAI, { ClientOptions } from "openai"
// import { Stream } from "openai/streaming"
// import dayjs from "dayjs"
// import utc from "dayjs/plugin/utc"
// import { DEFAULT_MODEL_LIST } from "model-bank"

import { debugResponse, debugStream } from "../../utils/debugStream"
import { StreamingResponse } from "../../utils/response"
import { handleOpenAIError } from "../../utils/handleOpenAIError"
import { RuntimeAI } from "../BaseAI"
import { OpenAIStream, OpenAIStreamOptions } from "../streams"
import { transformResponseToStream } from "./nonStreamToStream"
import { AgentRuntimeError } from "../../utils/createError"
import { ChatCompletionErrorPayload, IAgentRuntimeErrorType, AgentRuntimeErrorType } from "../../types"

export * from "./nonStreamToStream"
import type { ChatModelCard } from "@pure/types"
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
    bizError: IAgentRuntimeErrorType
    invalidAPIKey: IAgentRuntimeErrorType
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
  errorType,
  models,
  debug: debugParams,
  constructorOptions,
}: OpenAICompatibleFactoryOptions<T>) => {
  const ErrorType = {
    bizError: errorType?.bizError || AgentRuntimeErrorType.ProviderBizError,
    invalidAPIKey: errorType?.invalidAPIKey || AgentRuntimeErrorType.InvalidProviderAPIKey,
  }

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

      if (!apiKey) throw AgentRuntimeError.createError(ErrorType?.invalidAPIKey)

      const initOptions = { apiKey, baseURL, ...constructorOptions, ...res }

      this.client = new OpenAI(initOptions)

      this.baseURL = baseURL || this.client.baseURL

      this.id = options.id || provider
      this.logPrefix = `model-runtime:${this.id}`
    }

    async chat({ responseMode, ...payload }: ChatStreamPayload, options?: ChatMethodOptions) {
      try {
        const inputStartAt = Date.now()

        console.log(`${this.logPrefix} chat called with model: %s, stream: %s`, payload.model, payload.stream ?? true)

        const isStreaming = payload.stream

        const postPayload = {
          messages: payload.messages,
          model: payload.model,
          top_p: payload.top_p,
          temperature: payload.temperature,
          presence_penalty: payload.presence_penalty,
          frequency_penalty: payload.frequency_penalty,
          // input: "",
          stream: isStreaming,
        }
        // as OpenAI.Responses.ResponseCreateParamsStreaming | OpenAI.Responses.ResponseCreateParams

        const response = await this.client.chat.completions.create(postPayload, {
          headers: {
            Accept: "*/*",
            ...options?.requestHeaders,
          },
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

        if (responseMode === "json") {
          console.log("returning JSON response mode")
          return Response.json(response)
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

    async models() {
      console.log("fetching available models")

      let resultModels: ChatModelCard[] = []

      if (typeof models === "function") {
        console.log("using custom models function")
        // resultModels = await models({ client: this.client })
      } else {
        console.log("fetching models from client API")
        const list = await this.client.models.list()

        resultModels = list.data
      }
    }

    protected handleError(error: any): ChatCompletionErrorPayload {
      console.log("handling error: %O", error)

      let desensitizedEndpoint = this.baseURL

      if ("status" in (error as any)) {
        const status = (error as Response).status

        switch (status) {
          case 401: {
            return AgentRuntimeError.chat({
              endpoint: desensitizedEndpoint,
              error: error as any,
              errorType: ErrorType.invalidAPIKey,
              provider: this.id,
            })
          }

          default: {
            break
          }
        }
      }

      const { errorResult, RuntimeError } = handleOpenAIError(error)

      console.log("error code: %s, message: %s", errorResult?.code, errorResult?.message)

      return AgentRuntimeError.chat({
        endpoint: desensitizedEndpoint,
        error: error as any,
        errorType: RuntimeError || ErrorType.bizError,
        provider: this.id,
      })
    }
  }
}
