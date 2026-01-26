import { ModelProvider, Provider, ModelID, ModelIDValue } from "model-bank"
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
  return modelMapping[modelId.replace("C2C", "") as ModelIDValue] || ""
}
