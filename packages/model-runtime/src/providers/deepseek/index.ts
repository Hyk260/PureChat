import { ModelProvider } from "model-bank"

import { type OpenAICompatibleFactoryOptions, createOpenAICompatibleRuntime } from "../../core/openaiCompatibleFactory"

export interface DeepSeekModelCard {
  id: string
}

export const params = {
  baseURL: "https://api.deepseek.com/v1",
  debug: {
    chatCompletion: () => false,
  },
  provider: ModelProvider.DeepSeek,
} satisfies OpenAICompatibleFactoryOptions

export const DeepSeekAI = createOpenAICompatibleRuntime(params)
