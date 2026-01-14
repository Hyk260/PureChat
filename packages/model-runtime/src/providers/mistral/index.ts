import { ModelProvider } from "model-bank"

import { OpenAICompatibleFactoryOptions, createOpenAICompatibleRuntime } from "../../core/openaiCompatibleFactory"

export const params = {
  baseURL: "https://api.mistral.ai/v1",
  debug: {
    chatCompletion: () => false,
  },
  provider: ModelProvider.Mistral,
  constructorOptions: {
    // defaultHeaders: {
    //   "x-stainless-timeout": undefined,
    //   "x-stainless-os": undefined,
    // },
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

export const MistralAI = createOpenAICompatibleRuntime(params)
