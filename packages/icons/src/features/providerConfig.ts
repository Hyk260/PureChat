import OpenAI from "../Icon/OpenAI"
import DeepSeek from "../Icon/DeepSeek"
import Qwen from "../Icon/Qwen"
import Zhipu from "../Icon/Zhipu"
import Mistral from "../Icon/Mistral"
import ZeroOne from "../Icon/ZeroOne"
import Github from "../Icon/Github"
import Ollama from "../Icon/Ollama"

import type { Component } from "vue"
import { ModelProvider } from "model-bank"

type ProviderIconType = Component & {
  Avatar?: Component
  Combine?: Component
  Text?: Component
}

export interface ProviderMapping {
  Icon?: ProviderIconType
  keywords: string[]
  props?: any
}

export const providerMappings: ProviderMapping[] = [
  { Icon: Qwen, keywords: [ModelProvider.Qwen] },
  { Icon: OpenAI, keywords: [ModelProvider.OpenAI] },
  { Icon: DeepSeek, keywords: [ModelProvider.DeepSeek] },
  { Icon: Zhipu, keywords: [ModelProvider.ZhiPu] },
  { Icon: Mistral, keywords: [ModelProvider.Mistral] },
  { Icon: ZeroOne, keywords: [ModelProvider.ZeroOne] },
  { Icon: Github, keywords: [ModelProvider.GitHub] },
  { Icon: Ollama, keywords: [ModelProvider.Ollama] },
]
