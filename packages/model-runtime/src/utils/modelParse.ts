import { ChatModelCard } from "@pure/types"
import { AIBaseModelCard } from "model-bank"
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

      providerLocalConfig = modules[provider]
    } catch {
      // 如果配置文件不存在或导入失败，保持为 null
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
    // 尝试动态导入对应的配置文件
    const modules = await import("model-bank")

    // 如果提供商配置文件不存在，跳过
    if (!(provider in modules)) {
      return null
    }

    const providerModels = modules[provider as keyof typeof modules] as AIBaseModelCard[]

    // 如果导入成功且有数据，进行查找
    if (Array.isArray(providerModels)) {
      return providerModels.find((m) => m.id.toLowerCase() === lowerModelId)
    }

    return null
  } catch {
    // 如果导入失败（文件不存在或其他错误），返回 null
    return null
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

  // 如果提供了 provider，尝试获取该提供商的本地配置
  const providerLocalConfig = await getProviderLocalConfig(provider as ModelProviderKey)

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

      // 如果提供了 provider 且有本地配置，尝试从中获取模型的 enabled 状态
      const providerLocalModelConfig = getModelLocalEnableConfig(providerLocalConfig as any[], model)

      // 如果找到了本地配置中的模型，使用其 enabled 状态
      if (processedModel && providerLocalModelConfig && typeof providerLocalModelConfig.enabled === "boolean") {
        processedModel.enabled = providerLocalModelConfig.enabled
      }

      return processedModel
    })
  ).then((results) => results.filter((result) => !!result))
}
