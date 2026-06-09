import { ModelProvider } from "../const/modelProvider"
import { AnthropicModelValue } from "./anthropic"
import { DeepseekModelValue } from "./deepseek"
import { GitHubModelValue } from "./github"
import { MinimaxModelValue } from "./minimax"
import { MistralModelValue } from "./mistral"
import { OllamaModelValue } from "./ollama"
import { OpenAIModelValue } from "./openai"
import { QwenModelValue } from "./qwen"
import { ZeroOneModelValue } from "./zeroone"
import { ZhiPuModelValue } from "./zhipu"

export const aiModelsValue = {
  [ModelProvider.OpenAI]: OpenAIModelValue,
  [ModelProvider.GitHub]: GitHubModelValue,
  [ModelProvider.ZhiPu]: ZhiPuModelValue,
  [ModelProvider.ZeroOne]: ZeroOneModelValue,
  [ModelProvider.Qwen]: QwenModelValue,
  [ModelProvider.Ollama]: OllamaModelValue,
  [ModelProvider.DeepSeek]: DeepseekModelValue,
  [ModelProvider.Mistral]: MistralModelValue,
  [ModelProvider.Minimax]: MinimaxModelValue,
  [ModelProvider.Anthropic]: AnthropicModelValue,
}

export { AnthropicModelValue } from "./anthropic"
export { DeepseekModelValue } from "./deepseek"
export { GitHubModelValue } from "./github"
export { MinimaxModelValue } from "./minimax"
export { MistralModelValue } from "./mistral"
export { OllamaModelValue } from "./ollama"
export { OpenAIModelValue } from "./openai"
export { QwenModelValue } from "./qwen"
export { ZeroOneModelValue } from "./zeroone"
export { ZhiPuModelValue } from "./zhipu"
