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
  historyCount: 10,
  reasoningBudgetToken: 1024,
  searchFCModel: DEFAULT_AGENT_SEARCH_FC_MODEL,
  searchMode: "off",
}

export const DEFAULT_AGENT_CONFIG = {
  chatConfig: DEFAULT_AGENT_CHAT_CONFIG,
  model: DEFAULT_MODEL,
  openingQuestions: [],
  params: {
    max_tokens: 1024,
    frequency_penalty: 0,
    presence_penalty: 0,
    temperature: 1,
    top_p: 1,
  },
  plugins: [],
  provider: DEFAULT_PROVIDER,
  systemRole: "",
}
