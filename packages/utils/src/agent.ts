import { providerToModelId, modelIdToProvider, type Provider, type ModelIDValue } from "model-bank"

/**
 * description: 判断是否是ai
 * "@RBT#001" - AI
 */
export const isRobot = (text: string) => {
  return /@RBT#/.test(text)
}

/**
 * description: 判断是否是Agent
 * "@RBT#Agent001" - Agent
 */
export const isAgent = (text: string) => {
  return /@RBT#Agent/.test(text)
}

export function getModelId(model: Provider) {
  if (!model) return ""
  return providerToModelId[model] ?? null
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
  return modelIdToProvider[modelId.replace("C2C", "") as ModelIDValue] ?? ""
}
