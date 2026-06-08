import { DEFAULT_AGENT_CONFIG } from "@pure/const"

const { VITE_ZHIPU_API_KEY, VITE_ZHIPU_BASE_URL } = import.meta.env

export const ZhiPuConfig = {
  ...DEFAULT_AGENT_CONFIG.params,
  model: "glm-3-turbo",
  historyCount: 8,
  token: VITE_ZHIPU_API_KEY,
  openaiUrl: VITE_ZHIPU_BASE_URL,
}
