import { ChatModelCard, ModelProviderCard } from "@pure/types"
import { AiModelType, AiModelTypeSchema } from "model-bank"
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

// 模型能力标签关键词配置
export const MODEL_LIST_CONFIGS = {
  anthropic: {
    functionCallKeywords: ["claude"],
    reasoningKeywords: ["-3-7", "3.7", "-4"],
    visionKeywords: ["claude"],
  },
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
  minimax: {
    functionCallKeywords: ["minimax"],
    reasoningKeywords: ["-m"],
    visionKeywords: ["-vl", "Text-01"],
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
 * 处理模型显示名称，将包含 "3.1 Flash Image Preview" 的名称替换为 "Nano Banana 2"
 * @param displayName 原始显示名称
 * @returns 处理后的显示名称
 */
const processDisplayName = (displayName: string): string => {
  if (displayName.includes("Gemini 3.1 Flash Image Preview")) {
    return displayName.replace("Gemini 3.1 Flash Image Preview", "Nano Banana 2")
  }

  if (displayName.includes("Gemini 2.5 Flash Image Preview")) {
    return displayName.replace("Gemini 2.5 Flash Image Preview", "Nano Banana")
  }

  return displayName
}

/**
 * 检测关键词列表是否匹配模型ID（支持多种匹配模式）
 * @param modelId 模型ID（小写）
 * @param keywords 关键词列表，支持以下前缀：
 *   - ^ 前缀：仅在模型ID开头匹配
 *   - ! 前缀：排除匹配，优先级最高
 *   - re: 前缀：正则表达式匹配（支持 !re: 用于正则排除）
 *   - 无前缀：包含匹配（默认行为）
 * @returns 是否匹配（排除逻辑优先）
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

  const excludeKeywords = keywords.filter((keyword) => keyword.startsWith("!"))
  const includeKeywords = keywords.filter((keyword) => !keyword.startsWith("!"))

  for (const excludeKeyword of excludeKeywords) {
    if (matchKeyword(excludeKeyword)) {
      return false
    }
  }

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

    const providerModels = modules[provider as keyof typeof modules] as ModelProviderCard

    if (Array.isArray(providerModels.chatModels)) {
      return providerModels.chatModels.find((m) => m.id.toLowerCase() === lowerModelId)
    }

    return null
  } catch {
    return null
  }
}

/**
 * 检测单个模型的提供商类型
 * @param modelId 模型ID
 * @returns 检测到的提供商配置键名，默认为 'openai'
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
 * Get model local configuration
 * @param providerLocalConfig Local configuration of the model provider
 * @param model Model object
 * @returns Model local configuration
 */
export const getModelLocalEnableConfig = (providerLocalConfig: any[], model: { id: string }): any | null => {
  let providerLocalModelConfig = null
  if (providerLocalConfig && Array.isArray(providerLocalConfig)) {
    providerLocalModelConfig = providerLocalConfig.find((m) => m.id === model.id)
  }
  return providerLocalModelConfig
}

const processModelCard = (
  model: { [key: string]: any; id: string },
  config: ModelProcessorConfig,
  knownModel?: any
): ChatModelCard | undefined => {
  const { functionCallKeywords = [], visionKeywords = [], reasoningKeywords = [], excludeKeywords = [] } = config

  const isExcludedModel = isKeywordListMatch(model.id.toLowerCase(), excludeKeywords)
  const normalizedModelType = normalizeModelType(model.type)
  const modelType = normalizedModelType
  const isFunctionCallEnabled = isKeywordListMatch(model.id.toLowerCase(), functionCallKeywords) && !isExcludedModel
  const isReasoningEnabled = isKeywordListMatch(model.id.toLowerCase(), reasoningKeywords) && !isExcludedModel
  const isVisionEnabled = isKeywordListMatch(model.id.toLowerCase(), visionKeywords) && !isExcludedModel

  return {
    tokens: model.tokens ?? knownModel?.tokens ?? undefined,
    description: model.description ?? knownModel?.description ?? "",
    displayName: processDisplayName(model.displayName ?? knownModel?.displayName ?? model.id),
    enabled: model?.enabled || false,
    functionCall: model.functionCall ?? (isFunctionCallEnabled || false),
    id: model.id,
    maxOutput: model.maxOutput ?? knownModel?.maxOutput ?? undefined,
    reasoning: model.reasoning ?? (isReasoningEnabled || false),
    // releasedAt: processReleasedAt(model, knownModel),
    type: modelType,
    vision: model.vision ?? (isVisionEnabled || false),
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
 * 处理多提供商混合的模型列表
 * @param modelList 模型列表
 * @param providerid 可选的提供商ID，用于获取其本地配置文件
 * @returns 处理后的模型卡片列表
 */
export const processMultiProviderModelList = async (
  modelList: Array<{ id: string }>,
  providerid?: ModelProviderKey
): Promise<ChatModelCard[]> => {
  const { DEFAULT_MODEL_LIST } = await import("model-bank")

  const providerLocalConfig = await getProviderLocalConfig(providerid)

  console.log("providerLocalConfig", providerLocalConfig)

  return Promise.all(
    modelList.map(async (model) => {
      const detectedProvider = detectModelProvider(model.id)
      const config = MODEL_LIST_CONFIGS[detectedProvider]

      let knownModel = await findKnownModelByProvider(model.id, detectedProvider)

      if (!knownModel) {
        knownModel = DEFAULT_MODEL_LIST.find((m) => model.id.toLowerCase() === m.id.toLowerCase())
      }

      const processedModel = processModelCard(model, config, knownModel)

      return processedModel
    })
  ).then((results) => results.filter((result) => !!result))
}
