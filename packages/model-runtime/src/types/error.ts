// ******* Runtime Biz Error ******* //
export const AgentRuntimeErrorType = {
  AgentRuntimeError: "AgentRuntimeError",
  LocationNotSupportError: "LocationNotSupportError",

  QuotaLimitReached: "QuotaLimitReached",
  InsufficientQuota: "InsufficientQuota",

  ModelNotFound: "ModelNotFound",

  PermissionDenied: "PermissionDenied",
  ExceededContextWindow: "ExceededContextWindow",

  InvalidProviderAPIKey: "InvalidProviderAPIKey",
  ProviderBizError: "ProviderBizError",

  InvalidOllamaArgs: "InvalidOllamaArgs",
  OllamaBizError: "OllamaBizError",
  OllamaServiceUnavailable: "OllamaServiceUnavailable",

  InvalidComfyUIArgs: "InvalidComfyUIArgs",
  ComfyUIBizError: "ComfyUIBizError",
  ComfyUIServiceUnavailable: "ComfyUIServiceUnavailable",
  ComfyUIEmptyResult: "ComfyUIEmptyResult",
  ComfyUIUploadFailed: "ComfyUIUploadFailed",
  ComfyUIWorkflowError: "ComfyUIWorkflowError",
  ComfyUIModelError: "ComfyUIModelError",

  InvalidBedrockCredentials: "InvalidBedrockCredentials",
  InvalidVertexCredentials: "InvalidVertexCredentials",
  StreamChunkError: "StreamChunkError",

  InvalidGithubToken: "InvalidGithubToken",

  ConnectionCheckFailed: "ConnectionCheckFailed",

  /**
   * @deprecated
   */
  NoOpenAIAPIKey: "NoOpenAIAPIKey",
} as const

export const AGENT_RUNTIME_ERROR_SET = new Set<string>(Object.values(AgentRuntimeErrorType))

export type IAgentRuntimeErrorType = (typeof AgentRuntimeErrorType)[keyof typeof AgentRuntimeErrorType]

export const StandardErrorType = {
  // ******* Client Error ******* //
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  ContentNotFound: 404,
  MethodNotAllowed: 405,
  TooManyRequests: 429,

  // ******* Server Error ******* //
  InternalServerError: 500,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
} as const

export type ErrorType = (typeof StandardErrorType)[keyof typeof StandardErrorType]

/**
 * 聊天消息错误对象
 */
export interface ChatMessageError {
  body?: any
  message: string
  type: ErrorType | IAgentRuntimeErrorType
}
