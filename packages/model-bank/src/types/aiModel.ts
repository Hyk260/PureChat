import { z } from "zod"

export type ModelPriceCurrency = "CNY" | "USD"

export const AiModelTypeSchema = z.enum(["chat", "embedding", "tts", "image", "realtime"])

export type AiModelType = z.infer<typeof AiModelTypeSchema>

export interface ModelAbilities {
  /**
   * whether model supports file upload
   */
  files?: boolean
  /**
   * whether model supports function call
   */
  functionCall?: boolean
  /**
   * whether model supports image output
   */
  imageOutput?: boolean
  /**
   * whether model supports reasoning
   */
  reasoning?: boolean
  /**
   * whether model supports search web
   */
  search?: boolean
  /**
   * whether model supports structured output
   */
  structuredOutput?: boolean
  /**
   * whether model supports video
   */
  video?: boolean
  /**
   *  whether model supports vision
   */
  vision?: boolean
}

export const AiModelAbilitiesSchema = z.object({
  // files: z.boolean().optional(),
  functionCall: z.boolean().optional(),
  imageOutput: z.boolean().optional(),
  reasoning: z.boolean().optional(),
  search: z.boolean().optional(),
  video: z.boolean().optional(),
  vision: z.boolean().optional(),
})

export interface LLMConfig {
  model: string
  temperature?: number
  messages?: any[]
  top_p?: number
  stream?: boolean
  presence_penalty?: number
  frequency_penalty?: number
}

// 语言模型的设置参数
export interface LLMParams {
  /**
   * 控制生成文本中的惩罚系数，用于减少重复性
   * @default 0
   */
  frequency_penalty?: number
  /**
   * 生成文本的最大长度
   */
  max_tokens?: number
  /**
   * 控制生成文本中的惩罚系数，用于减少主题的变化
   * @default 0
   */
  presence_penalty?: number
  /**
   * 生成文本的随机度量，用于控制文本的创造性和多样性
   * @default 1
   */
  reasoning_effort?: string
  /**
   * 生成文本的随机度量，用于控制文本的创造性和多样性
   * @default 1
   */
  temperature?: number
  /**
   * 控制生成文本中最高概率的单个 token
   * @default 1
   */
  top_p?: number
  /**
   * 模型标识符，指定要使用的AI模型
   */
  model: string
  /**
   * 附带历史消息数，每次请求携带的历史消息数量
   * @default 8
   */
  historyMessageCount?: number
  /**
   * API Key，用于身份认证
   */
  token: string
  /**
   * API 接口地址，除默认地址外，必须包含 http(s)://
   */
  openaiUrl: string
}

export interface AIBaseModelCard {
  /**
   * the context window (or input + output tokens limit)
   */
  contextWindowTokens?: number
  description?: string
  /**
   * the name show for end user
   */
  displayName?: string
  enabled?: boolean
  id: string
  /**
   * whether model is legacy (deprecated but not removed yet)
   */
  legacy?: boolean
  maxOutput?: number
  /**
   * who create this model
   */
  organization?: string

  releasedAt?: string
}

export interface Model {
  id: string
  provider: string
  name: string
  group: string
  owned_by?: string
  description?: string
  /**
   * @deprecated
   */
  supported_text_delta?: boolean
}
