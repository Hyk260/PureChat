import { ModelProviderCard, ChatModelCard } from "@pure/types"
import OpenAIProvider from "./openai"
import ZhiPuProvider from "./zhipu"
import ZeroOneProvider from "./zeroone"
import OllamaProvider from "./ollama"
import GithubProvider from "./github"
import DeepSeekProvider from "./deepseek"
import QwenProvider from "./qwen"
import MistralProvider from "./mistral"
import MinimaxProvider from "./minimax"

export const DEFAULT_MODEL_PROVIDER_LIST: ChatModelCard[] = [
  OpenAIProvider,
  ZhiPuProvider,
  QwenProvider,
  ZeroOneProvider,
  OllamaProvider,
  GithubProvider,
  DeepSeekProvider,
  MistralProvider,
  MinimaxProvider,
]

export const buildDefaultModelList = (map: Record<string, ModelProviderCard>) => {
  let models: ChatModelCard[] = []

  Object.entries(map).forEach(([_provider, providerCard]) => {
    if (providerCard?.chatModels && Array.isArray(providerCard.chatModels)) {
      const newModels = providerCard.chatModels.map((model) => ({
        ...model,
      }))
      models = models.concat(newModels)
    }
  })

  return models
}

export const DEFAULT_MODEL_LIST = buildDefaultModelList({
  openai: OpenAIProvider,
  zhipu: ZhiPuProvider,
  qwen: QwenProvider,
  zeroone: ZeroOneProvider,
  ollama: OllamaProvider,
  github: GithubProvider,
  deepseek: DeepSeekProvider,
  mistral: MistralProvider,
  minimax: MinimaxProvider,
})

export { default as deepseek } from "./deepseek"
export { default as github } from "./github"
export { default as minimax } from "./minimax"
export { default as mistral } from "./mistral"
export { default as ollama } from "./ollama"
export { default as openai } from "./openai"
export { default as qwen } from "./qwen"
export { default as zeroone } from "./zeroone"
export { default as zhipu } from "./zhipu"
