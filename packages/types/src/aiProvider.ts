/**
 * fadeIn: 淡入效果
 * smooth: 平滑效果
 * none: 无效果
 */
export type ResponseAnimationStyle = "smooth" | "fadeIn" | "none"
export type ResponseAnimation =
  | {
      speed?: number
      text?: ResponseAnimationStyle
    }
  | ResponseAnimationStyle

/**
 * only when provider use different sdk
 * we will add a type
 */
export const AiProviderSDKEnum = {
  Anthropic: "anthropic",
  Google: "google",
  Ollama: "ollama",
  Openai: "openai",
  Qwen: "qwen",
} as const

/**
 * Authentication type for AI providers
 */
export const AiProviderAuthTypeEnum = {
  ApiKey: "apiKey",
  OAuthDeviceFlow: "oauthDeviceFlow",
} as const

export type AiProviderSDKType = (typeof AiProviderSDKEnum)[keyof typeof AiProviderSDKEnum]

export type AiProviderAuthType = (typeof AiProviderAuthTypeEnum)[keyof typeof AiProviderAuthTypeEnum]

export interface AiProviderSettings {
  /**
   * Authentication type for the provider
   * @default 'apiKey'
   */
  authType?: AiProviderAuthType
  /**
   * whether provider show browser request option by default
   *
   * @default false
   */
  defaultShowBrowserRequest?: boolean
  /**
   * some provider server like stepfun and aliyun don't support browser request,
   * So we should disable it
   *
   * @default false
   */
  disableBrowserRequest?: boolean
  /**
   * whether provider support edit model
   *
   * @default true
   */
  modelEditable?: boolean

  proxyUrl?:
    | {
        desc?: string
        placeholder: string
        title?: string
      }
    | false

  responseAnimation?: ResponseAnimation
  /**
   * default openai
   */
  sdkType?: AiProviderSDKType
  showModelFetcher?: boolean
}
