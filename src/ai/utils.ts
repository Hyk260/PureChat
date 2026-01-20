import { isEmpty } from "lodash-es"
import { modelConfig } from "@/ai/constant"
import { LLMParams, ModelProvider, Provider, ModelID, type ModelIDValue } from "model-bank"
import { useRobotStore } from "@/stores/modules/robot"
import { isRobot } from "@pure/utils"

/**
 * 获取 AI 模型的配置信息
 */
export const useAccessStore = (model: Provider = ModelProvider.OpenAI): LLMParams => {
  const access = useRobotStore().accessStore?.[model] || ""

  return isEmpty(access) ? modelConfig[model] : access
}

/**
 * 根据提供的模型ID获取模型类型。
 * @param {string} modelId - '@RBT#001' 模型ID，用于识别不同的模型类型。
 * @returns {Provider | string} - 'openai' 返回对应的模型类型，如果模型ID无效则返回''。
 */
export function getModelType(modelId: string): Provider {
  if (!isRobot(modelId)) {
    throw new Error("Invalid modelId")
  }
  const modelMapping = {
    [ModelID.OpenAI]: ModelProvider.OpenAI,
    [ModelID.ZhiPu]: ModelProvider.ZhiPu,
    [ModelID.ZeroOne]: ModelProvider.ZeroOne,
    [ModelID.Qwen]: ModelProvider.Qwen,
    [ModelID.Ollama]: ModelProvider.Ollama,
    [ModelID.GitHub]: ModelProvider.GitHub,
    [ModelID.DeepSeek]: ModelProvider.DeepSeek,
    [ModelID.Mistral]: ModelProvider.Mistral,
    [ModelID.Minimax]: ModelProvider.Minimax,
  }
  return modelMapping[modelId.replace("C2C", "") as ModelIDValue]
}

export function getModelId(model: Provider) {
  if (!model) return ""
  const modelMapping = {
    [ModelProvider.OpenAI]: ModelID.OpenAI,
    [ModelProvider.ZhiPu]: ModelID.ZhiPu,
    [ModelProvider.ZeroOne]: ModelID.ZeroOne,
    [ModelProvider.Qwen]: ModelID.Qwen,
    [ModelProvider.Ollama]: ModelID.Ollama,
    [ModelProvider.GitHub]: ModelID.GitHub,
    [ModelProvider.DeepSeek]: ModelID.DeepSeek,
    [ModelProvider.Mistral]: ModelID.Mistral,
    [ModelProvider.Minimax]: ModelID.Minimax,
  }
  return modelMapping[model] || null
}

export function getModelIcon(id: string): string {
  let modelId = ""
  try {
    modelId = getModelType(id)
  } catch {
    modelId = ""
  }
  const data = {
    [ModelProvider.OpenAI]: "openai",
    [ModelProvider.ZhiPu]: "chatglm",
    [ModelProvider.ZeroOne]: "yi",
    [ModelProvider.Qwen]: "qwen",
    [ModelProvider.Ollama]: "ollama",
    [ModelProvider.GitHub]: "openai",
    [ModelProvider.DeepSeek]: "deepseek",
    [ModelProvider.Mistral]: "mistral",
    [ModelProvider.Minimax]: "minimax",
    llava: "llava",
  }
  return data[modelId] || ""
}

export function prefix(key: string) {
  const prefix = "Tag_Profile_Custom_"
  return `${prefix}${key}`
}

export function getValueByKey(array: any[], key: string) {
  if (!array?.length || !key) return null
  const item = array.find((t) => t.key === key)
  return item?.value ? item.value : null
}

// 全员群
export function isFullStaffGroup(data: any) {
  const { groupProfile } = data || {}
  return getValueByKey(groupProfile?.groupCustomField, "custom_info") === "all_staff"
}
