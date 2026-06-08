import { DEFAULT_AGENT_CONFIG } from "@pure/const"

const { VITE_GITHUB_API_KEY, VITE_GITHUB_PROXY_URL } = import.meta.env

export const GitHubConfig = {
  ...DEFAULT_AGENT_CONFIG.params,
  model: "gpt-4o-mini",
  historyCount: 8,
  token: VITE_GITHUB_API_KEY,
  openaiUrl: VITE_GITHUB_PROXY_URL,
}
