export type LLMRoleType = "user" | "system" | "assistant" | "tool"

export interface LLMMessage {
  content: string
  role: LLMRoleType
}

export type FewShots = LLMMessage[]
