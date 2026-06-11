import { AiModelType } from "model-bank"

import { AiProviderSettings } from "@pure/types"

export type LLMRoleType = "user" | "system" | "assistant" | "function" | "tool"

export interface LLMMessage {
  content: string
  images?: string[]
  role: LLMRoleType
}

export type FewShots = LLMMessage[]

export interface OpenAIListModelResponse {
  object: string
  data: Array<{
    id: string
    object: string
    created: number
    owned_by: string
    root: string
  }>
}

export interface ChatModelCard {
  /**
   * 上下文窗口（或输入 + 输出令牌限制）
   */
  tokens?: number
  description?: string
  /**
   * the name show for end user
   */
  displayName?: string
  /**
   * 模型是否默认启用
   */
  enabled?: boolean
  /**
   * whether model supports file upload
   */
  files?: boolean
  id: string
  /**
   * whether model is custom
   */
  isCustom?: boolean
  maxOutput?: number

  webSearch?: boolean

  type?: AiModelType
  /**
   *  whether model supports reasoning
   */
  reasoning?: boolean
  /**
   * 模型是否支持函数调用
   */
  functionCall?: boolean
  /**
   *  whether model supports vision
   */
  vision?: boolean
}

export interface ModelProviderCard {
  /**
   * url to get api key
   */
  apiKeyUrl?: string
  chatModels: ChatModelCard[]
  /**
   * the default model that used for connection check
   */
  checkModel?: string
  description?: string
  /**
   * whether provider is enabled by default
   */
  enabled?: boolean
  id: string
  /**
   * the url show the all models in the provider
   */
  modelsUrl?: string
  /**
   * the name show for end user
   */
  name: string
  /**
   * whether to show the provider config
   */
  showConfig?: boolean
  /**
   * provider's website url
   */
  url: string

  settings?: AiProviderSettings
}

export interface PromptMeta {
  tags: string[]
  avatar: string
  title: string
  recQuestion?: string[]
}

export interface Prompt {
  id: string
  meta: PromptMeta
  lang: string
  prompt: Array<{
    role: LLMRoleType
    content: string
  }>
}
