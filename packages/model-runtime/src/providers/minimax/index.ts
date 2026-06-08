import { ModelProvider } from "model-bank"

import { createOpenAICompatibleRuntime, type OpenAICompatibleFactoryOptions } from "../../core/openaiCompatibleFactory"

// export const getMinimaxMaxOutputs = (modelId: string): number | undefined => {
//   const model = minimaxChatModels.find((model) => model.id === modelId)
//   return model ? model.maxOutput : undefined
// }

export const params = {
  baseURL: "https://api.minimaxi.com/v1",
  // chatCompletion: {},
  debug: {
    chatCompletion: () => false,
  },
  provider: ModelProvider.Minimax,
  constructorOptions: {
    fetch: (input: RequestInfo | URL, init: RequestInit = {}) => {
      if (init?.headers) {
        const headers = new Headers(init.headers)
        headers.delete("x-stainless-timeout")
        headers.delete("x-stainless-os")
        headers.delete("x-stainless-package-version")
        headers.delete("x-stainless-arch")
        headers.delete("x-stainless-lang")
        headers.delete("x-stainless-retry-count")
        headers.delete("x-stainless-runtime")
        headers.delete("x-stainless-runtime-version")
        init = { ...init, headers }
      }

      return fetch(input, { ...init })
    },
  },
} satisfies OpenAICompatibleFactoryOptions

export const MinimaxAI = createOpenAICompatibleRuntime(params)
