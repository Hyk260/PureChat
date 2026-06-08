import { DEFAULT_AGENT_CONFIG } from "@pure/const"

const { VITE_MISTRAL_API_KEY, VITE_MISTRAL_BASE_URL } = import.meta.env

export const MistralConfig = {
  ...DEFAULT_AGENT_CONFIG.params,
  model: "open-mistral-nemo",
  historyCount: 8,
  token: VITE_MISTRAL_API_KEY,
  openaiUrl: VITE_MISTRAL_BASE_URL,
}
