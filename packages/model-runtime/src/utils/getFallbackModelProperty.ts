/**
 * 获取模型属性值，首先从指定的提供商获取，如果没有则从其他提供商回退获取。
 * @param modelId 模型的ID。
 * @param propertyName 属性名称。
 * @param providerId 可选的提供商ID，用于精确匹配。
 * @returns 属性值或默认值。
 */
export const getModelPropertyWithFallback = async <T>(
  modelId: string,
  propertyName: any,
  providerId?: string
): Promise<T> => {
  // debugger
  const { DEFAULT_MODEL_LIST } = await import("model-bank")

  // Step 1: If providerId is provided, prioritize an exact match (same provider + same id)
  // if (providerId) {
  //   const exactMatch = models.find((m) => m.id === modelId && m.providerId === providerId)

  //   if (exactMatch?.[propertyName] !== undefined) {
  //     return exactMatch[propertyName] as T
  //   }
  // }

  // Step 2: Fallback to a match ignoring the provider (match id only)
  const fallbackMatch = DEFAULT_MODEL_LIST.find((m) => m.id === modelId)

  if (fallbackMatch?.[propertyName] !== undefined) {
    return fallbackMatch[propertyName] as T
  }

  // Step 3: Return a default value
  return (propertyName === "type" ? "chat" : undefined) as T
}
