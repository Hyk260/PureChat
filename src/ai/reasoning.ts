import { Model } from "@/types"
/**
 * 从模型 ID 中提取基础名称。
 * 例如：
 * - 'deepseek/deepseek-r1' => 'deepseek-r1'
 * - 'deepseek-ai/deepseek/deepseek-r1' => 'deepseek-r1'
 * @param {string} id 模型 ID
 * @param {string} [delimiter='/'] 分隔符，默认为 '/'
 * @returns {string} 基础名称
 */
export const getBaseModelName = (id: string, delimiter: string = "/"): string => {
  const parts = id.split(delimiter)
  return parts[parts.length - 1] || ""
}

/**
 * 从模型 ID 中提取基础名称并转换为小写。
 * 例如：
 * - 'deepseek/DeepSeek-R1' => 'deepseek-r1'
 * - 'deepseek-ai/deepseek/DeepSeek-R1' => 'deepseek-r1'
 * @param {string} id 模型 ID
 * @param {string} [delimiter='/'] 分隔符，默认为 '/'
 * @returns {string} 小写的基础名称
 */
export const getLowerBaseModelName = (id: string, delimiter: string = "/"): string => {
  const baseModelName = getBaseModelName(id, delimiter).toLowerCase()
  // for openrouter
  if (baseModelName.endsWith(":free")) {
    return baseModelName.replace(":free", "")
  }
  return baseModelName
}

export function isClaudeReasoningModel(model?: { id: string }): boolean {
  if (!model) {
    return false
  }
  const modelId = getLowerBaseModelName(model.id, "/")
  return (
    modelId.includes("claude-3-7-sonnet") ||
    modelId.includes("claude-3.7-sonnet") ||
    modelId.includes("claude-sonnet-4") ||
    modelId.includes("claude-opus-4")
  )
}

export const isGPT5SeriesModel = (model: Model) => {
  const modelId = getLowerBaseModelName(model.id)
  return modelId.includes("gpt-5")
}

export function isSupportedReasoningEffortOpenAIModel(model: Model): boolean {
  const modelId = getLowerBaseModelName(model.id)
  return (
    (modelId.includes("o1") && !(modelId.includes("o1-preview") || modelId.includes("o1-mini"))) ||
    modelId.includes("o3") ||
    modelId.includes("o4") ||
    modelId.includes("gpt-oss") ||
    (isGPT5SeriesModel(model) && !modelId.includes("chat"))
  )
}

export function isOpenAIReasoningModel(model: Model): boolean {
  const modelId = getLowerBaseModelName(model.id, "/")
  return isSupportedReasoningEffortOpenAIModel(model) || modelId.includes("o1")
}

export const isOpenAIOpenWeightModel = (model: Model) => {
  const modelId = getLowerBaseModelName(model.id)
  return modelId.includes("gpt-oss")
}

export function isOpenAIChatCompletionOnlyModel(model: Model): boolean {
  if (!model) {
    return false
  }

  const modelId = getLowerBaseModelName(model.id)
  return (
    modelId.includes("gpt-4o-search-preview") ||
    modelId.includes("gpt-4o-mini-search-preview") ||
    modelId.includes("o1-mini") ||
    modelId.includes("o1-preview")
  )
}

export const isQwenMTModel = (model: Model): boolean => {
  const modelId = getLowerBaseModelName(model.id)
  return modelId.includes("qwen-mt")
}
