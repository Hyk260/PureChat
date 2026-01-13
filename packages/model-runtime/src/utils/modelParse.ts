import { ChatModelCard } from "@pure/types"

export interface ModelProcessorConfig {
  excludeKeywords?: readonly string[]
  functionCallKeywords?: readonly string[]
  imageOutputKeywords?: readonly string[]
  reasoningKeywords?: readonly string[]
  searchKeywords?: readonly string[]
  videoKeywords?: readonly string[]
  visionKeywords?: readonly string[]
}

// 模型能力标签关键词配置
export const MODEL_LIST_CONFIGS = {
  deepseek: {
    functionCallKeywords: ["v3", "r1", "deepseek-chat"],
    reasoningKeywords: ["r1", "deepseek-reasoner", "v3.1", "v3.2"],
    visionKeywords: ["ocr"],
  },
  google: {
    excludeKeywords: ["tts"],
    functionCallKeywords: ["gemini", "!-image-"],
    imageOutputKeywords: ["-image-"],
    reasoningKeywords: ["thinking", "-2.5-", "!-image-"],
    searchKeywords: ["-search", "!-image-"],
    videoKeywords: ["-2.5-", "!-image-"],
    visionKeywords: ["gemini", "learnlm"],
  },
  llama: {
    functionCallKeywords: ["llama-3.2", "llama-3.3", "llama-4"],
    reasoningKeywords: [],
    visionKeywords: ["llava"],
  },
  openai: {
    excludeKeywords: ["audio"],
    functionCallKeywords: ["4o", "4.1", "o3", "o4", "oss"],
    reasoningKeywords: ["o1", "o3", "o4", "oss"],
    visionKeywords: ["4o", "4.1", "o4"],
  },
  qwen: {
    functionCallKeywords: ["qwen-max", "qwen-plus", "qwen-turbo", "qwen-long", "qwen1.5", "qwen2", "qwen2.5", "qwen3"],
    reasoningKeywords: ["qvq", "qwq", "qwen3", "!-instruct-", "!-coder-", "!-max-"],
    visionKeywords: ["qvq", "-vl", "-omni"],
  },
  zeroone: {
    functionCallKeywords: ["fc"],
    visionKeywords: ["vision"],
  },
  zhipu: {
    functionCallKeywords: ["glm-4", "glm-z1"],
    reasoningKeywords: ["glm-zero", "glm-z1", "glm-4.5"],
    visionKeywords: ["glm-4v", "glm-4.1v", "glm-4.5v"],
  },
} as const
