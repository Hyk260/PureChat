import { DeepseekConfig } from "@/ai/platforms/deepseek/config"
import { DeepseekModelValue } from "@/ai/platforms/deepseek/modelValue"

import { GitHubConfig } from "@/ai/platforms/github/config"
import { GitHubModelValue } from "@/ai/platforms/github/modelValue"

import { MistralConfig } from "@/ai/platforms/mistral/config"
import { MistralModelValue } from "@/ai/platforms/mistral/modelValue"

import { OllamaConfig } from "@/ai/platforms/ollama/config"
import { OllamaModelValue } from "@/ai/platforms/ollama/modelValue"

import { OpenaiConfig } from "@/ai/platforms/openai/config"
import { OpenAIModelValue } from "@/ai/platforms/openai/modelValue"

import { QwenConfig } from "@/ai/platforms/qwen/config"
import { QwenModelValue } from "@/ai/platforms/qwen/modelValue"

import { ZeroOneModelValue } from "@/ai/platforms/zeroone/modelValue"
import { ZeroOneConfig } from "@/ai/platforms/zeroone/config"

import { ZhiPuModelValue } from "@/ai/platforms/zhipu/modelValue"
import { ZhiPuConfig } from "@/ai/platforms/zhipu/config"

import { ModelProvider } from "@/ai/types"

export const ROLES = ["system", "user", "assistant"]

export const REQUEST_TIMEOUT_MS = 60000

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

export const modelConfig = {
  [ModelProvider.OpenAI]: OpenaiConfig,
  [ModelProvider.GitHub]: GitHubConfig,
  [ModelProvider.ZhiPu]: ZhiPuConfig,
  [ModelProvider.ZeroOne]: ZeroOneConfig,
  [ModelProvider.Qwen]: QwenConfig,
  [ModelProvider.Ollama]: OllamaConfig,
  [ModelProvider.DeepSeek]: DeepseekConfig,
  [ModelProvider.Mistral]: MistralConfig,
}

export const modelValue = {
  [ModelProvider.OpenAI]: OpenAIModelValue,
  [ModelProvider.GitHub]: GitHubModelValue,
  [ModelProvider.ZhiPu]: ZhiPuModelValue,
  [ModelProvider.ZeroOne]: ZeroOneModelValue,
  [ModelProvider.Qwen]: QwenModelValue,
  [ModelProvider.Ollama]: OllamaModelValue,
  [ModelProvider.DeepSeek]: DeepseekModelValue,
  [ModelProvider.Mistral]: MistralModelValue,
}
