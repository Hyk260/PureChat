export interface ModelTokensUsage {
  // Input tokens breakdown
  /**
   * user prompt input
   */
  // Input cache tokens
  inputCachedTokens?: number
  inputCacheMissTokens?: number
  inputWriteCacheTokens?: number

  inputTextTokens?: number
  /**
   * user prompt image
   */
  inputImageTokens?: number
  inputAudioTokens?: number
  /**
   * currently only pplx has citation_tokens
   */
  inputCitationTokens?: number

  // Output tokens breakdown
  outputTextTokens?: number
  outputImageTokens?: number
  outputAudioTokens?: number
  outputReasoningTokens?: number

  // Prediction tokens
  acceptedPredictionTokens?: number
  rejectedPredictionTokens?: number

  // Total tokens
  // TODO: make all following fields required
  totalInputTokens?: number
  totalOutputTokens?: number
  totalTokens?: number
}

export interface ModelUsage extends ModelTokensUsage {
  /**
   * dollar
   */
  cost?: number
}

export interface ModelPerformance {
  /**
   * tokens per second
   * 每秒令牌数
   */
  tps?: number
  /**
   * time to first token (ms)
   * 首次标记时间（毫秒）
   */
  ttft?: number
  /**
   * 从输出开始到输出完成（毫秒）
   */
  duration?: number
  /**
   * 从输入开始到输出完成（毫秒）
   */
  latency?: number
}

export interface MessageMetadata extends ModelUsage, ModelPerformance {}
