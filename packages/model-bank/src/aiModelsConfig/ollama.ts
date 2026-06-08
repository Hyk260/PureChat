import { DEFAULT_AGENT_CONFIG } from "@pure/const"

export const OllamaConfig = {
  ...DEFAULT_AGENT_CONFIG.params,
  model: "llama3.1:8b",
  historyCount: 12,
  token: "",
  openaiUrl: import.meta.env.VITE_OLLAMA_PROXY_URL,
}
