import { AgentInitErrorPayload, ChatCompletionErrorPayload } from "../types"
import { IAgentRuntimeErrorType } from "../types/error"

export const AgentRuntimeError = {
  chat: (error: ChatCompletionErrorPayload): ChatCompletionErrorPayload => error,
  createError: (errorType: IAgentRuntimeErrorType, error?: any): AgentInitErrorPayload => ({ error, errorType }),
}
