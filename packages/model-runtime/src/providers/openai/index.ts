import { ModelProvider } from "model-bank"
import { OpenAICompatibleFactoryOptions, createOpenAICompatibleRuntime } from "../../core/openaiCompatibleFactory"

export interface OpenAIModelCard {
  id: string
}

export const params = {
  baseURL: "https://api.openai.com/v1",
  debug: {
    chatCompletion: () => false,
    responses: () => false,
  },
  provider: ModelProvider.OpenAI,
} satisfies OpenAICompatibleFactoryOptions

export const OpenAI = createOpenAICompatibleRuntime(params)
