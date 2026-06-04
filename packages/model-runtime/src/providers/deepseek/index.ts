import { ModelProvider } from "model-bank"

import { type OpenAICompatibleFactoryOptions, createOpenAICompatibleRuntime } from "../../core/openaiCompatibleFactory"
import { MODEL_LIST_CONFIGS, processModelList } from "../../utils/modelParse"
import type OpenAI from "openai"
import { ChatModelCard } from "@pure/types"

export interface DeepSeekModelCard {
  id: string
}

const fetchDeepSeekModels = async ({ client }: { client: OpenAI }): Promise<ChatModelCard[]> => {
  const modelClient = client as {
    models?: { list?: () => Promise<{ data?: DeepSeekModelCard[] }> }
  }

  if (modelClient.models?.list) {
    const modelsPage = await modelClient.models.list()
    const modelList = modelsPage.data || []

    return processModelList(modelList, MODEL_LIST_CONFIGS.deepseek, "deepseek")
  }

  const { deepseek } = await import("model-bank")

  return processModelList(deepseek.chatModels, MODEL_LIST_CONFIGS.deepseek, "deepseek")
}

export const params = {
  baseURL: "https://api.deepseek.com/v1",
  // chatCompletion: {},
  debug: {
    chatCompletion: () => false,
  },
  models: fetchDeepSeekModels,
  provider: ModelProvider.DeepSeek,
} satisfies OpenAICompatibleFactoryOptions

export const DeepSeekAI = createOpenAICompatibleRuntime(params)
