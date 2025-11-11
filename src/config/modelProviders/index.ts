import OpenAIProvider from "./openai"
import ZhiPuProvider from "./zhipu"
import ZeroOneProvider from "./zeroone"
import OllamaProvider from "./ollama"
import GithubProvider from "./github"
import DeepSeekProvider from "./deepseek"
import QwenProvider from "./qwen"
import MistralProvider from "./mistral"
import { ModelProviderCard, ChatModelCard } from "@/types/llm"

export const DEFAULT_MODEL_PROVIDER_LIST = [
  OpenAIProvider,
  ZhiPuProvider,
  QwenProvider,
  ZeroOneProvider,
  OllamaProvider,
  GithubProvider,
  DeepSeekProvider,
  MistralProvider,
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
})

export { default as DeepSeekProviderCard } from "./deepseek"
export { default as GithubProviderCard } from "./github"
export { default as MistralProviderCard } from "./mistral"
export { default as OllamaProviderCard } from "./ollama"
export { default as OpenAIProviderCard } from "./openai"
export { default as QwenProviderCard } from "./qwen"
export { default as ZeroOneProviderCard } from "./zeroone"
export { default as ZhiPuProviderCard } from "./zhipu"
