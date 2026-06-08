import { DEFAULT_AGENT_CONFIG } from "@pure/const"

const { VITE_ZEROONE_API_KEY, VITE_ZEROONE_BASE_URL } = import.meta.env

export const ZeroOneConfig = {
  ...DEFAULT_AGENT_CONFIG.params,
  model: "yi-large",
  historyCount: 8,
  token: VITE_ZEROONE_API_KEY,
  openaiUrl: VITE_ZEROONE_BASE_URL,
}
