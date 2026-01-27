/**
 * 基础消息数据接口
 */
export interface BaseMessageData {
  ID?: string
  nick?: string
  model?: string
  payload?: { text?: string }
}

/**
 * Web搜索自定义数据参数
 */
export interface WebSearchParams {
  webSearchResult?: any
}

/**
 * 深度思考自定义数据参数
 */
export interface DeepThinkingParams {
  thinking?: string | undefined
  content?: string | undefined
  reasoningType?: "thinking" | "done" | undefined
  duration?: number | undefined
}
/**
 * 提示消息自定义数据参数
 */
export interface PromptMessageParams {
  recQuestion?: string[]
}
