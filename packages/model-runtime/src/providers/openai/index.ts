import { ModelProvider } from "model-bank"
import { OpenAICompatibleFactoryOptions, createOpenAICompatibleRuntime } from "../../core/openaiCompatibleFactory"

export interface OpenAIModelCard {
  id: string
}

export const params = {
  baseURL: "https://api.openai.com/v1",
  // chatCompletion: {},
  debug: {
    chatCompletion: () => false,
    responses: () => false,
  },
  // models: async ({ client }) => {},
  provider: ModelProvider.OpenAI,
  // responses: {
  //   handlePayload: (payload) => {},
  // },
} satisfies OpenAICompatibleFactoryOptions

export const OpenAI = createOpenAICompatibleRuntime(params)
