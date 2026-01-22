import { DEFAULT_MODEL, DEFAULT_PROVIDER } from "./llm"

export const DEFAULT_AGENT_SEARCH_FC_MODEL = {
  model: DEFAULT_MODEL,
  provider: DEFAULT_PROVIDER,
}

export const DEFAULT_AGENT_CHAT_CONFIG = {
  autoCreateTopicThreshold: 2,
  displayMode: "chat",
  enableAutoCreateTopic: true,
  enableCompressHistory: true,
  enableHistoryCount: true,
  enableReasoning: false,
  enableStreaming: true,
  historyCount: 20,
  reasoningBudgetToken: 1024,
  searchFCModel: DEFAULT_AGENT_SEARCH_FC_MODEL,
  searchMode: "off",
}
