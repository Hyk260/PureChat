import { DEFAULT_AGENT_CONFIG } from "@pure/const"

const { VITE_OPENAI_API_KEY, VITE_OPENAI_PROXY_URL } = import.meta.env

export const OpenaiConfig = {
  ...DEFAULT_AGENT_CONFIG.params,
  model: "gpt-4o-mini",
  // temperature: 1,
  // top_p: 0.9,
  // max_tokens: 1024,
  // presence_penalty: 0,
  // frequency_penalty: 0,
  historyCount: 8,
  token: VITE_OPENAI_API_KEY,
  openaiUrl: VITE_OPENAI_PROXY_URL,
}
