import type { ModelProviderCard } from "@pure/types"
import type { AIChatModelCard } from "../types"

/**
 * gemini implicit caching not extra cost
 * https://openrouter.ai/docs/features/prompt-caching#implicit-caching
 */
const googleChatModels: AIChatModelCard[] = [
  {
    abilities: {
      functionCall: true,
      reasoning: true,
      search: true,
      structuredOutput: true,
      video: true,
      vision: true,
    },
    tokens: 1_048_576 + 65_536,
    description: "Points to gemini-3.1-pro-preview",
    displayName: "Gemini Pro Latest",
    id: "gemini-pro-latest",
    maxOutput: 65_536,
    type: "chat",
  },
  {
    abilities: {
      functionCall: true,
      reasoning: true,
      search: true,
      video: true,
      vision: true,
    },
    tokens: 1_048_576 + 65_536,
    description: "Points to gemini-3-flash-preview",
    displayName: "Gemini Flash Latest",
    id: "gemini-flash-latest",
    maxOutput: 65_536,
    type: "chat",
  },
  {
    abilities: {
      functionCall: true,
      reasoning: true,
      search: true,
      video: true,
      vision: true,
    },
    tokens: 1_048_576 + 65_536,
    description: "Points to gemini-2.5-flash-lite-preview-09-2025",
    displayName: "Gemini Flash-Lite Latest",
    id: "gemini-flash-lite-latest",
    maxOutput: 65_536,
    type: "chat",
  },
  {
    abilities: {
      functionCall: true,
      reasoning: true,
      search: true,
      vision: true,
    },
    tokens: 262_144 + 32_768,
    displayName: "Gemma 4 26B A4B IT",
    id: "gemma-4-26b-a4b-it",
    maxOutput: 32_768,
    type: "chat",
  },
  {
    abilities: {
      functionCall: true,
      reasoning: true,
      search: true,
      vision: true,
    },
    tokens: 262_144 + 32_768,
    displayName: "Gemma 4 31B IT",
    id: "gemma-4-31b-it",
    maxOutput: 32_768,
    type: "chat",
  },
  {
    abilities: {
      imageOutput: true,
      reasoning: true,
      search: true,
      vision: true,
    },
    tokens: 131_072 + 32_768,
    description:
      "Gemini 3.1 Flash Image (Nano Banana 2) is Google's fastest native image generation model with thinking support, conversational image generation and editing.",
    displayName: "Nano Banana 2",
    enabled: true,
    id: "gemini-3.1-flash-image-preview",
    maxOutput: 32_768,
    releasedAt: "2026-02-26",
    type: "chat",
  },
  {
    abilities: {
      functionCall: true,
      reasoning: true,
      search: true,
      structuredOutput: true,
      video: true,
      vision: true,
    },
    tokens: 1_048_576 + 65_536,
    description:
      "Gemini 3.1 Pro Preview improves on Gemini 3 Pro with enhanced reasoning capabilities and adds medium thinking level support.",
    displayName: "Gemini 3.1 Pro Preview",
    enabled: true,
    id: "gemini-3.1-pro-preview",
    maxOutput: 65_536,
    releasedAt: "2026-02-19",
    type: "chat",
  },
  {
    abilities: {
      functionCall: true,
      reasoning: true,
      search: true,
      structuredOutput: true,
      video: true,
      vision: true,
    },
    tokens: 1_048_576 + 65_536,
    description:
      "Gemini 3.1 Flash-Lite is Google's most cost-efficient multimodal model, optimized for high-volume agentic tasks, translation, and data processing.",
    displayName: "Gemini 3.1 Flash-Lite",
    enabled: true,
    id: "gemini-3.1-flash-lite",
    maxOutput: 65_536,
    releasedAt: "2026-05-07",
    type: "chat",
  },
  {
    abilities: {
      functionCall: true,
      reasoning: true,
      search: true,
      structuredOutput: true,
      video: true,
      vision: true,
    },
    tokens: 1_048_576 + 65_536,
    description:
      "Gemini 3.1 Flash-Lite Preview is Google's most cost-efficient multimodal model, optimized for high-volume agentic tasks, translation, and data processing.",
    displayName: "Gemini 3.1 Flash-Lite Preview",
    id: "gemini-3.1-flash-lite-preview",
    maxOutput: 65_536,
    releasedAt: "2026-03-04",
    type: "chat",
  },
  {
    abilities: {
      functionCall: true,
      reasoning: true,
      search: true,
      video: true,
      vision: true,
    },
    tokens: 1_048_576 + 65_536,
    description:
      "Gemini 3 Flash is the smartest model built for speed, combining cutting-edge intelligence with excellent search grounding.",
    displayName: "Gemini 3 Flash Preview",
    enabled: true,
    id: "gemini-3-flash-preview",
    maxOutput: 65_536,
    releasedAt: "2025-12-17",
    type: "chat",
  },
  {
    abilities: {
      imageOutput: true,
      reasoning: true,
      search: true,
      vision: true,
    },
    tokens: 131_072 + 32_768,
    description:
      "Gemini 3 Pro Image (Nano Banana Pro) is Google’s image generation model and also supports multimodal chat.",
    displayName: "Nano Banana Pro",
    id: "gemini-3-pro-image-preview",
    maxOutput: 32_768,
    releasedAt: "2025-11-20",
    type: "chat",
  },
  {
    abilities: {
      functionCall: true,
      reasoning: true,
      search: true,
      video: true,
      vision: true,
    },
    tokens: 1_048_576 + 65_536,
    description:
      "Gemini 2.5 Pro is Google’s most advanced reasoning model, able to reason over code, math, and STEM problems and analyze large datasets, codebases, and documents with long context.",
    displayName: "Gemini 2.5 Pro",
    id: "gemini-2.5-pro",
    maxOutput: 65_536,
    releasedAt: "2025-06-17",
    type: "chat",
  },
  {
    abilities: {
      functionCall: true,
      reasoning: true,
      search: true,
      video: true,
      vision: true,
    },
    tokens: 1_048_576 + 65_536,
    description: "Gemini 2.5 Flash is Google’s best-value model with full capabilities.",
    displayName: "Gemini 2.5 Flash",
    id: "gemini-2.5-flash",
    maxOutput: 65_536,
    releasedAt: "2025-06-17",
    type: "chat",
  },
  {
    abilities: {
      imageOutput: true,
      vision: true,
    },
    tokens: 65_536 + 32_768,
    description:
      "Nano Banana is Google’s newest, fastest, and most efficient native multimodal model, enabling conversational image generation and editing.",
    displayName: "Nano Banana",
    id: "gemini-2.5-flash-image",
    maxOutput: 32_768,
    releasedAt: "2025-08-26",
    type: "chat",
  },
  {
    abilities: {
      functionCall: true,
      reasoning: true,
      search: true,
      video: true,
      vision: true,
    },
    tokens: 1_048_576 + 65_536,
    description: "Gemini 2.5 Flash-Lite is Google’s smallest, best-value model, designed for large-scale use.",
    displayName: "Gemini 2.5 Flash-Lite",
    id: "gemini-2.5-flash-lite",
    maxOutput: 65_536,
    releasedAt: "2025-07-22",
    type: "chat",
  },
  {
    abilities: {
      functionCall: true,
      search: true,
      vision: true,
    },
    tokens: 1_048_576 + 8192,
    description:
      "Gemini 2.0 Flash delivers next-gen features including exceptional speed, native tool use, multimodal generation, and a 1M-token context window.",
    displayName: "Gemini 2.0 Flash",
    id: "gemini-2.0-flash",
    maxOutput: 8192,
    releasedAt: "2025-02-05",
    type: "chat",
  },
  {
    abilities: {
      functionCall: true,
      search: true,
      vision: true,
    },
    tokens: 1_048_576 + 8192,
    description:
      "Gemini 2.0 Flash delivers next-gen features including exceptional speed, native tool use, multimodal generation, and a 1M-token context window.",
    displayName: "Gemini 2.0 Flash 001",
    id: "gemini-2.0-flash-001",
    maxOutput: 8192,
    releasedAt: "2025-02-05",
    type: "chat",
  },
  {
    abilities: {
      vision: true,
    },
    tokens: 1_048_576 + 8192,
    description: "A Gemini 2.0 Flash variant optimized for cost efficiency and low latency.",
    displayName: "Gemini 2.0 Flash-Lite",
    id: "gemini-2.0-flash-lite",
    maxOutput: 8192,
    releasedAt: "2025-02-05",
    type: "chat",
  },
  {
    abilities: {
      vision: true,
    },
    tokens: 1_048_576 + 8192,
    description: "A Gemini 2.0 Flash variant optimized for cost efficiency and low latency.",
    displayName: "Gemini 2.0 Flash-Lite 001",
    id: "gemini-2.0-flash-lite-001",
    maxOutput: 8192,
    releasedAt: "2025-02-05",
    type: "chat",
  },
]

export const allModels = [...googleChatModels]

// ref: https://ai.google.dev/gemini-api/docs/models/gemini
const Google: ModelProviderCard = {
  chatModels: allModels,
  checkModel: "gemini-3-flash-preview",
  description:
    "Google's Gemini family is its most advanced general-purpose AI, built by Google DeepMind for multimodal use across text, code, images, audio, and video. It scales from data centers to mobile devices with strong efficiency and reach.",
  enabled: true,
  id: "google",
  modelList: { showModelFetcher: true },
  modelsUrl: "https://ai.google.dev/gemini-api/docs/models/gemini",
  name: "Google",
  settings: {
    proxyUrl: {
      placeholder: "https://generativelanguage.googleapis.com",
    },
    responseAnimation: {
      speed: 50,
      text: "smooth",
    },
    sdkType: "google",
    showModelFetcher: true,
  },
  url: "https://ai.google.dev",
}

export default Google
