import { DEFAULT_AGENT_CONFIG } from "@pure/const"

const { VITE_QWEN_API_KEY, VITE_QWEN_BASE_URL } = import.meta.env

export const QwenConfig = {
  ...DEFAULT_AGENT_CONFIG.params,
  model: "qwen-plus-latest",
  historyCount: 8,
  token: VITE_QWEN_API_KEY,
  openaiUrl: VITE_QWEN_BASE_URL,
}
