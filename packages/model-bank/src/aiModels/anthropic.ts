import type { ModelProviderCard } from "@pure/types"
import type { AIChatModelCard } from "../types"

const anthropicChatModels: AIChatModelCard[] = [
  {
    abilities: {
      functionCall: true,
      reasoning: true,
      search: true,
      structuredOutput: true,
      vision: true,
    },
    tokens: 1_000_000,
    description:
      "Claude Opus 4.7 is Anthropic's most capable generally available model for complex reasoning and agentic coding.",
    displayName: "Claude Opus 4.7",
    enabled: true,
    id: "claude-opus-4-7",
    maxOutput: 128_000,
    releasedAt: "2026-04-16",
    type: "chat",
  },
  {
    abilities: {
      functionCall: true,
      reasoning: true,
      search: true,
      structuredOutput: true,
      vision: true,
    },
    tokens: 1_000_000,
    description: "Claude Opus 4.6 is Anthropic’s most intelligent model for building agents and coding.",
    displayName: "Claude Opus 4.6",
    id: "claude-opus-4-6",
    maxOutput: 128_000,
    releasedAt: "2026-02-05",
    type: "chat",
  },
  {
    abilities: {
      functionCall: true,
      reasoning: true,
      search: true,
      structuredOutput: true,
      vision: true,
    },
    tokens: 1_000_000,
    description: "Claude Sonnet 4.6 is Anthropic’s best combination of speed and intelligence.",
    displayName: "Claude Sonnet 4.6",
    enabled: true,
    id: "claude-sonnet-4-6",
    maxOutput: 64_000,
    releasedAt: "2026-02-17",
    type: "chat",
  },
  {
    abilities: {
      functionCall: true,
      reasoning: true,
      search: true,
      structuredOutput: true,
      vision: true,
    },
    tokens: 200_000,
    description:
      "Claude Opus 4.5 is Anthropic’s flagship model, combining top-tier intelligence with scalable performance for complex, high-quality reasoning tasks.",
    displayName: "Claude Opus 4.5",
    id: "claude-opus-4-5-20251101",
    maxOutput: 64_000,
    releasedAt: "2025-11-24",
    type: "chat",
  },
  {
    abilities: {
      functionCall: true,
      reasoning: true,
      search: true,
      structuredOutput: true,
      vision: true,
    },
    tokens: 200_000,
    description: "Claude Sonnet 4.5 is Anthropic’s most intelligent model to date.",
    displayName: "Claude Sonnet 4.5",
    id: "claude-sonnet-4-5-20250929",
    maxOutput: 64_000,
    releasedAt: "2025-09-29",
    type: "chat",
  },
  {
    abilities: {
      functionCall: true,
      reasoning: true,
      search: true,
      structuredOutput: true,
      vision: true,
    },
    tokens: 200_000,
    description:
      "Claude Haiku 4.5 is Anthropic’s fastest and smartest Haiku model, with lightning speed and extended reasoning.",
    displayName: "Claude Haiku 4.5",
    enabled: true,
    id: "claude-haiku-4-5-20251001",
    maxOutput: 64_000,
    releasedAt: "2025-10-16",
    type: "chat",
  },
  {
    abilities: {
      functionCall: true,
      reasoning: true,
      search: true,
      vision: true,
    },
    tokens: 200_000,
    description:
      "Claude Opus 4.1 is Anthropic’s newest and most powerful model for highly complex tasks, excelling in performance, intelligence, fluency, and comprehension.",
    displayName: "Claude Opus 4.1",
    id: "claude-opus-4-1-20250805",
    maxOutput: 32_000,
    releasedAt: "2025-08-05",
    type: "chat",
  },
  {
    abilities: {
      functionCall: true,
      reasoning: true,
      search: true,
      vision: true,
    },
    tokens: 200_000,
    description:
      "Claude Opus 4 is Anthropic’s most powerful model for highly complex tasks, excelling in performance, intelligence, fluency, and comprehension.",
    displayName: "Claude Opus 4",
    id: "claude-opus-4-20250514",
    maxOutput: 32_000,
    releasedAt: "2025-05-23",
    type: "chat",
  },
  {
    abilities: {
      functionCall: true,
      reasoning: true,
      search: true,
      vision: true,
    },
    tokens: 200_000,
    description:
      "Claude Sonnet 4 can produce near-instant responses or extended step-by-step reasoning that users can see. API users can finely control how long the model thinks.",
    displayName: "Claude Sonnet 4",
    id: "claude-sonnet-4-20250514",
    maxOutput: 64_000,
    releasedAt: "2025-05-23",
    type: "chat",
  },
]

export const allModels = [...anthropicChatModels]

const Anthropic: ModelProviderCard = {
  chatModels: allModels,
  checkModel: "claude-opus-4-5-20251101",
  description:
    "Anthropic builds advanced language models like Claude 3.5 Sonnet, Claude 3 Sonnet, Claude 3 Opus, and Claude 3 Haiku, balancing intelligence, speed, and cost for workloads from enterprise to rapid-response use cases.",
  enabled: true,
  id: "anthropic",
  modelList: { showModelFetcher: true },
  modelsUrl: "https://docs.anthropic.com/en/docs/about-claude/models#model-names",
  name: "Anthropic",
  settings: {
    proxyUrl: {
      placeholder: "https://api.anthropic.com",
    },
    responseAnimation: "smooth",
    sdkType: "anthropic",
  },
  url: "https://anthropic.com",
}

export default Anthropic
