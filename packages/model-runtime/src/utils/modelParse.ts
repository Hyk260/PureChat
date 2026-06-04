import { ChatModelCard } from "@pure/types"
import { AIBaseModelCard, AiModelType, AiModelTypeSchema } from "model-bank"
import type { ModelProviderKey } from "../types"

export interface ModelProcessorConfig {
  excludeKeywords?: readonly string[]
  functionCallKeywords?: readonly string[]
  imageOutputKeywords?: readonly string[]
  reasoningKeywords?: readonly string[]
  searchKeywords?: readonly string[]
  videoKeywords?: readonly string[]
  visionKeywords?: readonly string[]
}

// Default keyword: any model ID containing -search is considered to support internet search
const DEFAULT_SEARCH_KEYWORDS = ["-search"] as const

// 模型能力标签关键词配置
export const MODEL_LIST_CONFIGS = {
  deepseek: {
    functionCallKeywords: ["v3", "v4", "r1", "deepseek-chat"],
    reasoningKeywords: ["r1", "deepseek-reasoner", "v3.", "v4"],
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
    functionCallKeywords: ["4o", "4.1", "o3", "o4", "oss", "-5"],
    reasoningKeywords: ["o1", "o3", "o4", "oss", "-5"],
    visionKeywords: ["4o", "4.1", "o4", "-5"],
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

// Model owner (provider) keyword configuration
export const MODEL_OWNER_DETECTION_CONFIG = {
  anthropic: ["claude"],
  deepseek: ["deepseek"],
  google: ["gemini", "imagen", "gemma"],
  llama: ["llama", "llava"],
  minimax: ["minimax"],
  mistral: ["mistral", "ministral", "magistral", "pixtral"],
  openai: ["o1", "o3", "o4", "gpt-"],
  qwen: ["qwen", "qwq", "qvq"],
  xiaomimimo: ["mimo-"],
  zeroone: ["yi-"],
  zhipu: ["glm"],
} as const

const AI_MODEL_TYPE_SET = new Set<AiModelType>(AiModelTypeSchema.options)

const normalizeModelType = (value: unknown): AiModelType | undefined => {
  if (typeof value !== "string") return undefined

  const normalized = value.toLowerCase() as AiModelType

  if (AI_MODEL_TYPE_SET.has(normalized)) {
    return normalized
  }

  return undefined
}

/**
 * Process model display name
 * @param displayName Original display name
 * @returns Processed display name
 */
const processDisplayName = (displayName: string): string => {
  if (displayName.includes("Gemini 3.1 Flash Image Preview")) {
    return displayName.replace("Gemini 3.1 Flash Image Preview", "Nano Banana 2")
  }

  // If it contains "Gemini 2.5 Flash Image Preview", replace the corresponding part with "Nano Banana"
  if (displayName.includes("Gemini 2.5 Flash Image Preview")) {
    return displayName.replace("Gemini 2.5 Flash Image Preview", "Nano Banana")
  }

  return displayName
}

/**
 * Detect whether a keyword list matches a model ID (supports multiple matching patterns)
 * @param modelId Model ID (lowercase)
 * @param keywords Keyword list, supports the following prefixes:
 *   - ^ prefix: match only at the start of model ID
 *   - ! prefix: exclude match, highest priority
 *   - re: prefix: regular expression match (supports !re: for regex exclusion)
 *   - no prefix: contains match (default behavior)
 * @returns Whether it matches (exclusion logic takes priority)
 */
const isKeywordListMatch = (modelId: string, keywords: readonly string[]): boolean => {
  const matchKeyword = (keyword: string): boolean => {
    const rawKeyword = keyword.startsWith("!") ? keyword.slice(1) : keyword

    if (rawKeyword.startsWith("re:")) {
      try {
        return new RegExp(rawKeyword.slice(3)).test(modelId)
      } catch {
        return false
      }
    }

    if (rawKeyword.startsWith("^")) {
      return modelId.startsWith(rawKeyword.slice(1))
    }

    return modelId.includes(rawKeyword)
  }

  // First check exclusion rules (starting with exclamation mark, including !re:)
  const excludeKeywords = keywords.filter((keyword) => keyword.startsWith("!"))
  const includeKeywords = keywords.filter((keyword) => !keyword.startsWith("!"))

  for (const excludeKeyword of excludeKeywords) {
    if (matchKeyword(excludeKeyword)) {
      return false
    }
  }

  // Check inclusion rules
  return includeKeywords.some((keyword) => matchKeyword(keyword))
}

/**
 * 获取模型提供商的本地配置
 * @param provider 模型提供商
 * @returns 模型提供商的本地配置
 */
const getProviderLocalConfig = async (provider?: ModelProviderKey): Promise<any[] | null> => {
  let providerLocalConfig: any[] | null = null
  if (provider) {
    try {
      const modules = await import("model-bank")

      providerLocalConfig = modules[provider] as unknown as any[]
    } catch {
      providerLocalConfig = null
    }
  }
  return providerLocalConfig
}

/**
 * 根据提供商类型查找对应的本地模型配置
 * @param modelId 模型ID
 * @param provider 提供商类型
 * @returns 匹配的本地模型配置
 */
const findKnownModelByProvider = async (modelId: string, provider: keyof typeof MODEL_LIST_CONFIGS): Promise<any> => {
  const lowerModelId = modelId.toLowerCase()

  try {
    const modules = await import("model-bank")

    if (!(provider in modules)) {
      return null
    }

    const providerModels = modules[provider as keyof typeof modules] as AIBaseModelCard[]

    if (Array.isArray(providerModels)) {
      return providerModels.find((m) => m.id.toLowerCase() === lowerModelId)
    }

    return null
  } catch {
    return null
  }
}

/**
 * Detect the provider type of a single model
 * @param modelId Model ID
 * @returns Detected provider configuration key name, defaults to 'openai'
 */
export const detectModelProvider = (modelId: string): keyof typeof MODEL_LIST_CONFIGS => {
  const lowerModelId = modelId.toLowerCase()

  for (const [provider, keywords] of Object.entries(MODEL_OWNER_DETECTION_CONFIG)) {
    const hasKeyword = isKeywordListMatch(lowerModelId, keywords)

    if (hasKeyword && provider in MODEL_LIST_CONFIGS) {
      return provider as keyof typeof MODEL_LIST_CONFIGS
    }
  }

  return "openai"
}

/**
 * Common logic for processing model cards
 */
const processModelCard = (
  model: { [key: string]: any; id: string },
  config: ModelProcessorConfig,
  knownModel?: any
): ChatModelCard | undefined => {
  const {
    functionCallKeywords = [],
    visionKeywords = [],
    reasoningKeywords = [],
    excludeKeywords = [],
    // searchKeywords = DEFAULT_SEARCH_KEYWORDS,
    // imageOutputKeywords = [],
    // videoKeywords = [],
  } = config

  const isExcludedModel = isKeywordListMatch(model.id.toLowerCase(), excludeKeywords)
  const normalizedModelType = normalizeModelType(model.type)
  const modelType = normalizedModelType

  return {
    tokens: model.tokens ?? knownModel?.tokens ?? undefined,
    description: model.description ?? knownModel?.description ?? "",
    displayName: processDisplayName(model.displayName ?? knownModel?.displayName ?? model.id),
    enabled: model?.enabled || false,
    functionCall:
      model.functionCall ??
      ((isKeywordListMatch(model.id.toLowerCase(), functionCallKeywords) && !isExcludedModel) || false),
    id: model.id,
    maxOutput: model.maxOutput ?? knownModel?.maxOutput ?? undefined,
    reasoning:
      model.reasoning ?? ((isKeywordListMatch(model.id.toLowerCase(), reasoningKeywords) && !isExcludedModel) || false),
    // releasedAt: processReleasedAt(model, knownModel),
    type: modelType,
    vision: model.vision ?? ((isKeywordListMatch(model.id.toLowerCase(), visionKeywords) && !isExcludedModel) || false),
  }
}

/**
 * 处理单一提供商的模型列表
 * @param modelList 模型列表
 * @param config 提供商配置
 * @param provider 提供商类型（可选，用于优先匹配对应的本地配置, 当提供了 provider 时，才会尝试从本地配置覆盖 enabled）
 * @returns 处理后的模型卡片列表
 */
export const processModelList = async (
  modelList: Array<{ id: string }>,
  config: ModelProcessorConfig,
  provider?: keyof typeof MODEL_LIST_CONFIGS
): Promise<ChatModelCard[]> => {
  const { DEFAULT_MODEL_LIST } = await import("model-bank")

  return Promise.all(
    modelList.map(async (model) => {
      let knownModel: any = null

      // 如果提供了provider，优先使用提供商特定的配置
      if (provider) {
        knownModel = await findKnownModelByProvider(model.id, provider)
      }

      // 如果未找到，回退到全局配置
      if (!knownModel) {
        knownModel = DEFAULT_MODEL_LIST.find((m) => model.id.toLowerCase() === m.id.toLowerCase())
      }

      const processedModel = processModelCard(model, config, knownModel)

      return processedModel
    })
  ).then((results) => results.filter((result) => !!result))
}

/**
 * Process model list for mixed providers
 * @param modelList Model list
 * @param providerid Optional provider ID, used to get its local configuration file
 * @returns Processed model card list
 */
export const processMultiProviderModelList = async (
  modelList: Array<{ id: string }>,
  providerid?: ModelProviderKey
): Promise<ChatModelCard[]> => {
  const { DEFAULT_MODEL_LIST } = await import("model-bank")

  // If providerid is provided, try to get the local configuration for that provider
  const providerLocalConfig = await getProviderLocalConfig(providerid)

  console.log("providerLocalConfig", providerLocalConfig)

  return Promise.all(
    modelList.map(async (model) => {
      const detectedProvider = detectModelProvider(model.id)
      const config = MODEL_LIST_CONFIGS[detectedProvider]
      // Prioritize using provider-specific configuration
      let knownModel = await findKnownModelByProvider(model.id, detectedProvider)

      // If not found, fall back to global configuration
      if (!knownModel) {
        knownModel = DEFAULT_MODEL_LIST.find((m) => model.id.toLowerCase() === m.id.toLowerCase())
      }

      const processedModel = processModelCard(model, config, knownModel)

      return processedModel
    })
  ).then((results) => results.filter((result) => !!result))
}
