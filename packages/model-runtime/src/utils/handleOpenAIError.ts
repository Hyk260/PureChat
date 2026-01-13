import OpenAI from "openai"

import { AgentRuntimeErrorType } from "../types/error"

export const handleOpenAIError = (error: any): { RuntimeError?: "AgentRuntimeError"; errorResult: any } => {
  let errorResult: any

  // 检查错误是否为 OpenAI APIError
  if (error instanceof OpenAI.APIError) {
    // 如果错误确实是 OpenAI APIError，会有一个 error 对象
    if (error.error) {
      errorResult = error.error
    }
    // 或者如果有 cause，我们使用 error cause
    // 这通常发生在 `openai` 包存在 bug 时
    else if (error.cause) {
      errorResult = error.cause
    }
    // 如果没有其他请求错误，错误对象是一个类似 Response 的对象
    else {
      errorResult = { headers: error.headers, status: error.status }
    }

    return {
      errorResult,
    }
  } else {
    const err = error as Error

    errorResult = { cause: err.cause, message: err.message, name: err.name }

    return {
      RuntimeError: AgentRuntimeErrorType.AgentRuntimeError,
      errorResult,
    }
  }
}
