import { ModelProvider } from "model-bank"
// import OpenAI from "openai"

// import { ChatStreamPayload } from "./chat"
import { IAgentRuntimeErrorType } from "./error"

export interface AgentInitErrorPayload {
  error: object
  errorType: string | number
}

export interface ChatCompletionErrorPayload {
  [key: string]: any
  endpoint?: string
  error: object
  errorType: IAgentRuntimeErrorType
  provider: string
}

export interface CreateImageErrorPayload {
  error: object
  errorType: IAgentRuntimeErrorType
  provider: string
}

// export interface CreateChatCompletionOptions {
//   chatModel: OpenAI;
//   payload: ChatStreamPayload;
// }

export type ModelProviderKey = Lowercase<keyof typeof ModelProvider>
