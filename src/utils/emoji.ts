// 表情包资源缓存，避免重复加载
const emojiCache = new Map<string, string>()

/**
 * 按需获取表情包资源URL
 * @param url 表情包文件名
 * @returns 表情包资源的URL
 */
export const getEmojiAssetUrl = async (url: string): Promise<string> => {
  // 如果缓存中已存在，直接返回
  if (emojiCache.has(url)) {
    return emojiCache.get(url) as string
  }

  try {
    // 动态导入表情包资源
    const module = await import(`../assets/emoji/${url}`)
    const emojiUrl = module.default || module
    emojiCache.set(url, emojiUrl)
    return emojiUrl
  } catch (error) {
    console.warn(`Failed to load emoji asset: ${url}`, error)
    // 如果动态导入失败，回退到静态URL构建方式
    const fallbackUrl = new URL(`../assets/emoji/${url}`, import.meta.url).href
    emojiCache.set(url, fallbackUrl)
    return fallbackUrl
  }
}

/**
 * 同步获取表情包资源URL（用于需要立即获取URL的场景）
 * @param url 表情包文件名
 * @returns 表情包资源的URL
 */
export const getEmojiAssetUrlSync = (url: string): string => {
  // 如果缓存中已存在，直接返回
  if (emojiCache.has(url)) {
    return emojiCache.get(url) as string
  }

  // 构建静态URL并缓存
  const emojiUrl = new URL(`../assets/emoji/${url}`, import.meta.url).href
  emojiCache.set(url, emojiUrl)
  return emojiUrl
}

/**
 * 预加载指定的表情包资源
 * @param urls 表情包文件名数组
 * @returns Promise<void>
 */
export const preloadEmojiAssets = async (urls: string[]): Promise<void> => {
  const promises = urls.map((url) => getEmojiAssetUrl(url))
  await Promise.all(promises)
}

/**
 * 清空表情包缓存
 */
export const clearEmojiCache = (): void => {
  emojiCache.clear()
}

/**
 * 获取缓存中的表情包数量
 * @returns 缓存的表情包数量
 */
export const getEmojiCacheSize = (): number => {
  return emojiCache.size
}
