import { DEFAULT_AGENT_CONFIG } from "@pure/const"

const { VITE_DEEPSEEK_API_KEY, VITE_DEEPSEEK_BASE_URL } = import.meta.env

export const DeepseekConfig = {
  ...DEFAULT_AGENT_CONFIG.params,
  model: "deepseek-chat",
  historyCount: 8,
  token: VITE_DEEPSEEK_API_KEY,
  openaiUrl: VITE_DEEPSEEK_BASE_URL,
}
