import { ModelProvider, minimax as minimaxChatModels } from "model-bank"

import { createOpenAICompatibleRuntime } from "../../core/openaiCompatibleFactory"

export const getMinimaxMaxOutputs = (modelId: string): number | undefined => {
  const model = minimaxChatModels.find((model) => model.id === modelId)
  return model ? model.maxOutput : undefined
}

export const LobeMinimaxAI = createOpenAICompatibleRuntime({
  baseURL: "https://api.minimaxi.com/v1",
  // chatCompletion: {},
  debug: {
    chatCompletion: () => false,
  },
  provider: ModelProvider.Minimax,
})
