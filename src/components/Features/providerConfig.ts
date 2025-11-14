import OpenAI from "@/components/Icon/OpenAI"
import DeepSeek from "@/components/Icon/DeepSeek"
import Qwen from "@/components/Icon/Qwen"
import Zhipu from "@/components/Icon/Zhipu"
import Mistral from "@/components/Icon/Mistral"
import ZeroOne from "@/components/Icon/ZeroOne"
import Github from "@/components/Icon/Github"
import Ollama from "@/components/Icon/Ollama"

import type { Component } from "vue"
import { ModelProvider } from "@/ai/types"

type ProviderIconType = Component & {
  Avatar?: Component
  Brand?: Component
  BrandColor?: Component
  Color?: Component
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
