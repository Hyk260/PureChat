import { DeepSeekApi, DeepseekConfig, DeepseekModelValue } from "@/ai/platforms/deepseek/index"
import { GitHubApi, GitHubConfig, GitHubModelValue } from "@/ai/platforms/github/index"
import { MistralApi, MistralConfig, MistralModelValue } from "@/ai/platforms/mistral/index"
import { OllamaApi, OllamaConfig, OllamaModelValue } from "@/ai/platforms/ollama/index"
import { OpenAiApi, OpenaiConfig, OpenAIModelValue } from "@/ai/platforms/openai/index"
import { QwenApi, QwenConfig, QwenModelValue } from "@/ai/platforms/qwen/index"
import { ZeroOneApi, ZeroOneConfig, ZeroOneModelValue } from "@/ai/platforms/zeroone/index"
import { ZhiPuApi, ZhiPuConfig, ZhiPuModelValue } from "@/ai/platforms/zhipu/index"
import { ModelProvider } from "@/ai/types"

export const ROLES = ["system", "user", "assistant"]

export const REQUEST_TIMEOUT_MS = 15000

export const prompt = [
  {
    id: "0",
    meta: {
      tags: [],
      avatar: "🌟",
      title: "",
    },
    lang: "cn",
    prompt: [{ role: "system", content: "" }],
  },
]

export const AssistantAvatar = {
  [ModelProvider.OpenAI]: "openai.png",
  [ModelProvider.ZhiPu]: "zhipu.png",
  [ModelProvider.ZeroOne]: "zeroone.png",
  [ModelProvider.Qwen]: "qwen.png",
  [ModelProvider.Ollama]: "ollama.svg",
  [ModelProvider.GitHub]: "github.svg",
  [ModelProvider.DeepSeek]: "deepseek.png",
  [ModelProvider.Mistral]: "mistral.png",
}

export const modelConfig = {
  [ModelProvider.OpenAI]: OpenaiConfig(),
  [ModelProvider.GitHub]: GitHubConfig(),
  [ModelProvider.ZhiPu]: ZhiPuConfig(),
  [ModelProvider.ZeroOne]: ZeroOneConfig(),
  [ModelProvider.Qwen]: QwenConfig(),
  [ModelProvider.Ollama]: OllamaConfig(),
  [ModelProvider.DeepSeek]: DeepseekConfig(),
  [ModelProvider.Mistral]: MistralConfig(),
}

export const modelValue = {
  [ModelProvider.OpenAI]: OpenAIModelValue(),
  [ModelProvider.GitHub]: GitHubModelValue(),
  [ModelProvider.ZhiPu]: ZhiPuModelValue(),
  [ModelProvider.ZeroOne]: ZeroOneModelValue(),
  [ModelProvider.Qwen]: QwenModelValue(),
  [ModelProvider.Ollama]: OllamaModelValue(),
  [ModelProvider.DeepSeek]: DeepseekModelValue(),
  [ModelProvider.Mistral]: MistralModelValue(),
}

export const API_PROVIDER_MAP = {
  [ModelProvider.DeepSeek]: DeepSeekApi,
  [ModelProvider.ZhiPu]: ZhiPuApi,
  [ModelProvider.ZeroOne]: ZeroOneApi,
  [ModelProvider.Qwen]: QwenApi,
  [ModelProvider.Ollama]: OllamaApi,
  [ModelProvider.GitHub]: GitHubApi,
  [ModelProvider.OpenAI]: OpenAiApi,
  [ModelProvider.Mistral]: MistralApi,
}
