import OpenAI from 'openai';

import { ChatStreamPayload } from './chat';

export interface CreateChatCompletionOptions {
  chatModel: OpenAI;
  payload: ChatStreamPayload;
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

export type ModelProviderKey = Lowercase<keyof typeof ModelProvider>;
