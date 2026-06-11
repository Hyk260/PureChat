import { ChatModelCard } from "@pure/types"

/**
 * 获取模型属性值，从默认模型列表中回退获取。
 * @param modelId 模型的ID。
 * @param propertyName 属性名称（ChatModelCard 的键）。
 * @param providerId 可选的提供商ID，当前未使用，保留参数兼容。
 * @returns 属性值或默认值。
 */
export const getModelPropertyWithFallback = async <T extends ChatModelCard[keyof ChatModelCard]>(
  modelId: string,
  propertyName: keyof ChatModelCard,
  _providerId?: string
): Promise<T> => {
  const { DEFAULT_MODEL_LIST } = await import("model-bank")

  const fallbackMatch = DEFAULT_MODEL_LIST.find((m) => m.id === modelId)

  if (fallbackMatch?.[propertyName] !== undefined) {
    return fallbackMatch[propertyName] as T
  }

  return (propertyName === "type" ? "chat" : undefined) as T
}
