export const ChatErrorType = {
  UnknownChatFetchError: "UnknownChatFetchError",
  StreamChunkError: "StreamChunkError",
  // ******* 客户端错误 ******* //
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  ContentNotFound: 404,
  MethodNotAllowed: 405,
  TooManyRequests: 429,
} as const

export type ErrorType = (typeof ChatErrorType)[keyof typeof ChatErrorType]

export interface ErrorResponse {
  body: any
  errorType: ErrorType
}

/**
 * 聊天消息错误对象
 */
export interface ChatMessageError {
  body?: any
  message: string
  type: ErrorType
}

// export type ChatPayload = Record<string, string>

export interface ChatPayload {
  method: string
  body: any
  fetch?: typeof fetch
  signal?: AbortSignal
  headers?: HeadersInit
}
