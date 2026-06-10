import { ModelProvider } from "../const/modelProvider"
import type { LLMParams } from "../types/aiModel"
import { DeepseekConfig } from "./deepseek"
import { GitHubConfig } from "./github"
import { AnthropicConfig } from "./anthropic"
import { MinimaxConfig } from "./minimax"
import { MistralConfig } from "./mistral"
import { OllamaConfig } from "./ollama"
import { OpenaiConfig } from "./openai"
import { QwenConfig } from "./qwen"
import { ZeroOneConfig } from "./zeroone"
import { ZhiPuConfig } from "./zhipu"
import { GoogleConfig } from "./google"

export const aiModelsConfig: Record<ModelProvider, LLMParams> = {
  [ModelProvider.OpenAI]: OpenaiConfig,
  [ModelProvider.GitHub]: GitHubConfig,
  [ModelProvider.ZhiPu]: ZhiPuConfig,
  [ModelProvider.ZeroOne]: ZeroOneConfig,
  [ModelProvider.Qwen]: QwenConfig,
  [ModelProvider.Ollama]: OllamaConfig,
  [ModelProvider.DeepSeek]: DeepseekConfig,
  [ModelProvider.Mistral]: MistralConfig,
  [ModelProvider.Minimax]: MinimaxConfig,
  [ModelProvider.Anthropic]: AnthropicConfig,
  [ModelProvider.Google]: GoogleConfig,
}

export { AnthropicConfig } from "./anthropic"
export { DeepseekConfig } from "./deepseek"
export { GitHubConfig } from "./github"
export { MinimaxConfig } from "./minimax"
export { MistralConfig } from "./mistral"
export { OllamaConfig } from "./ollama"
export { OpenaiConfig } from "./openai"
export { QwenConfig } from "./qwen"
export { ZeroOneConfig } from "./zeroone"
export { ZhiPuConfig } from "./zhipu"
export { GoogleConfig } from "./google"
