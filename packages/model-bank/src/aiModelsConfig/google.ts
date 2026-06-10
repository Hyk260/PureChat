import { DEFAULT_AGENT_CONFIG } from "@pure/const"

const { VITE_GOOGLE_API_KEY, VITE_GOOGLE_BASE_URL } = import.meta.env

export const GoogleConfig = {
  ...DEFAULT_AGENT_CONFIG.params,
  model: "gemini-3.1-pro-preview",
  historyCount: 8,
  token: VITE_GOOGLE_API_KEY,
  openaiUrl: VITE_GOOGLE_BASE_URL,
}
