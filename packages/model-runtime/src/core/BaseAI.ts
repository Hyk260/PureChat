import OpenAI from "openai"
import { AIBaseModelCard } from "model-bank"

import type { ChatMethodOptions, ChatStreamPayload } from "@pure/types"

export interface RuntimeAI {
  baseURL?: string
  chat?(payload: ChatStreamPayload, options?: ChatMethodOptions): Promise<Response>
  models?(): Promise<any>
}

export abstract class OpenAICompatibleRuntime {
  abstract baseURL: string
  abstract client: OpenAI

  abstract chat(payload: ChatStreamPayload, options?: ChatMethodOptions): Promise<Response>

  abstract models(): Promise<AIBaseModelCard[]>
}
