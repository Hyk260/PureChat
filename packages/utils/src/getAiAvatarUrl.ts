import { isRobot, getModelType } from "./agent"
import { ModelProvider, Provider } from "model-bank"

import deepseekPng from "../assets/model-provider/deepseek.png"
import githubSvg from "../assets/model-provider/github.svg"
import mistralPng from "../assets/model-provider/mistral.png"
import ollamaSvg from "../assets/model-provider/ollama.svg"
import openaiPng from "../assets/model-provider/openai.png"
import qwenPng from "../assets/model-provider/qwen.png"
import zeroonePng from "../assets/model-provider/zeroone.png"
import zhipuPng from "../assets/model-provider/zhipu.png"

const assistantAvatar: Partial<Record<Provider, string>> = {
  [ModelProvider.OpenAI]: openaiPng,
  [ModelProvider.ZhiPu]: zhipuPng,
  [ModelProvider.ZeroOne]: zeroonePng,
  [ModelProvider.Qwen]: qwenPng,
  [ModelProvider.Ollama]: ollamaSvg,
  [ModelProvider.GitHub]: githubSvg,
  [ModelProvider.DeepSeek]: deepseekPng,
  [ModelProvider.Mistral]: mistralPng,
}

export function getAiAvatarUrl(id?: string): string {
  if (!id || !isRobot(id)) return ""

  return assistantAvatar[getModelType(id)] || ""
}
