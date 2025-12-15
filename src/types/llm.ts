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
  /**
   * 模型是否支持函数调用
   */
  functionCall?: boolean
  id: string
  /**
   * whether model is custom
   */
  isCustom?: boolean
  /**
   * whether model is legacy (deprecated but not removed yet)
   */
  legacy?: boolean
  maxOutput?: number

  webSearch?: boolean

  // pricing?: Pricing

  /**
   *  whether model supports reasoning
   */
  reasoning?: boolean

  type?: "chat" | "image"

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
   * some provider server like stepfun and aliyun don't support browser request,
   * So we should disable it
   * @deprecated
   * @default false
   */
  disableBrowserRequest?: boolean
  /**
   * whether provider is enabled by default
   */
  enabled?: boolean
  id: string
  /**
   * @deprecated
   */
  modelList?: {
    showModelFetcher?: boolean
  }
  /**
   * the url show the all models in the provider
   */
  modelsUrl?: string
  /**
   * the name show for end user
   */
  name: string
  /**
   * whether show api key in the provider config
   * so provider like ollama don't need api key field
   * @deprecated
   */
  showApiKey?: boolean
  /**
   * whether show checker in the provider config
   * @deprecated
   */
  showChecker?: boolean
  /**
   * whether to show the provider config
   */
  showConfig?: boolean
  /**
   * provider's website url
   */
  url: string
}

export type LLMRoleType = "user" | "system" | "assistant" | "tool"

export interface PromptMeta {
  [key: string]: any
  tags: string[]
  avatar: string
  title: string
  recQuestion?: string[]
}

export interface Prompt {
  [key: string]: any
  id: string
  meta: PromptMeta
  lang: string
  prompt: Array<{
    role: LLMRoleType
    content: string
  }>
}
