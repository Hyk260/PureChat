import { DEFAULT_AGENT_CONFIG } from "@pure/const"

const { VITE_OPENAI_API_KEY, VITE_OPENAI_PROXY_URL } = import.meta.env

export const OpenaiConfig = {
  ...DEFAULT_AGENT_CONFIG.params,
  model: "gpt-4o-mini",
  historyCount: 8,
  token: VITE_OPENAI_API_KEY,
  openaiUrl: VITE_OPENAI_PROXY_URL,
}
