import OpenAIProvider from "./openai"
import ZhiPuProvider from "./zhipu"
import ZeroOneProvider from "./zeroone"
import OllamaProvider from "./ollama"
import GithubProvider from "./github"
import DeepSeekProvider from "./deepseek"
import QwenProvider from "./qwen"
import MistralProvider from "./mistral"

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

export { default as DeepSeekProviderCard } from "./deepseek"
export { default as GithubProviderCard } from "./github"
export { default as MistralProviderCard } from "./mistral"
export { default as OllamaProviderCard } from "./ollama"
export { default as OpenAIProviderCard } from "./openai"
export { default as QwenProviderCard } from "./qwen"
export { default as ZeroOneProviderCard } from "./zeroone"
export { default as ZhiPuProviderCard } from "./zhipu"
