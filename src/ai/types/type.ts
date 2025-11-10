import type { ChatStreamPayload } from "./chat"
import type OpenAI from "openai"

export interface CreateChatCompletionOptions {
  chatModel: OpenAI
  payload: ChatStreamPayload
}

export enum ModelProvider {
  OpenAI = "openai",
  ZhiPu = "zhipu",
  ZeroOne = "zeroone",
  Qwen = "qwen",
  Ollama = "ollama",
  GitHub = "github",
  DeepSeek = "deepseek",
  Mistral = "mistral",
  // V0 = 'v0',
}

export type Provider = Lowercase<keyof typeof ModelProvider>

export type ModelProviderKey = Lowercase<keyof typeof ModelProvider>
