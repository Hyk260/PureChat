import { DEFAULT_AGENT_CONFIG } from "@pure/const"

const { VITE_MINIMAX_API_KEY, VITE_MINIMAX_BASE_URL } = import.meta.env

export const MinimaxConfig = {
  ...DEFAULT_AGENT_CONFIG.params,
  model: "MiniMax-M2",
  historyCount: 8,
  token: VITE_MINIMAX_API_KEY,
  openaiUrl: VITE_MINIMAX_BASE_URL,
}
