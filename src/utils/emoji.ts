// 表情包资源缓存，避免重复加载
const emojiCache = new Map<string, string>()

// 表情包数据缓存
const emojiDataCache = new Map<string, any>()

/**
 * 获取表情包资源URL
 * @param url 表情包文件名
 * @returns 表情包资源的URL
 */
export const getEmojiAssetUrl = (url: string): string => {
  // 如果缓存中已存在，直接返回
  if (emojiCache.has(url)) {
    return emojiCache.get(url) as string
  }

  // 对于表情包资源，直接构建URL
  const emojiUrl = new URL(`../assets/emoji/${url}`, import.meta.url).href
  emojiCache.set(url, emojiUrl)
  return emojiUrl
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
 */
export const preloadEmojiAssets = (urls: string[]): void => {
  urls.forEach((url) => getEmojiAssetUrl(url))
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

/**
 * 按需获取表情包数据
 * @param type 表情包类型 'QQ' | 'Douyin' | 'Mart'
 * @returns 表情包数据
 */
export const getEmojiData = async (type: string): Promise<any> => {
  if (emojiDataCache.has(type)) {
    return emojiDataCache.get(type)
  }

  let module: any
  let data: any

  switch (type) {
    case "QQ":
      module = await import("./emoji/emoji-map-qq")
      data = {
        emojiMap: module.emojiMap,
        emojiName: module.emojiName,
        emojiUrl: module.emojiUrl,
      }
      break
    case "Douyin":
      module = await import("./emoji/emoji-map-douyin")
      data = {
        emojiMap: module.emojiMap,
        emojiName: module.emojiName,
        emojiUrl: module.emojiUrl,
      }
      break
    case "Mart":
      module = await import("./emoji/emoji-map")
      data = {
        emojiArray: module.emojiArray,
      }
      break
    default:
      throw new Error(`Unknown emoji type: ${type}`)
  }

  emojiDataCache.set(type, data)
  return data
}

/**
 * 预加载表情包数据
 * @param types 要预加载的表情包类型数组
 */
export const preloadEmojiData = async (types: string[]): Promise<void> => {
  const promises = types.map((type) => getEmojiData(type))
  await Promise.all(promises)
}

/**
 * 清空表情包数据缓存
 */
export const clearEmojiDataCache = (): void => {
  emojiDataCache.clear()
}

/**
 * 获取表情包数据缓存信息
 */
export const getEmojiDataCacheInfo = () => {
  return {
    dataCacheSize: emojiDataCache.size,
    assetCacheSize: emojiCache.size,
    cachedDataTypes: Array.from(emojiDataCache.keys()),
  }
}
