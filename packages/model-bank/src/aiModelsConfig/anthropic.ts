import { DEFAULT_AGENT_CONFIG } from "@pure/const"

const { VITE_ANTHROPIC_API_KEY, VITE_ANTHROPIC_BASE_URL } = import.meta.env

export const AnthropicConfig = {
  ...DEFAULT_AGENT_CONFIG.params,
  model: "claude-opus-4-6",
  historyCount: 8,
  token: VITE_ANTHROPIC_API_KEY,
  openaiUrl: VITE_ANTHROPIC_BASE_URL,
}
