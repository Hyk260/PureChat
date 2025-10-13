import { ModelProvider, ModelProviderKey } from "@/ai/types"
import { getModelType } from "@/ai/utils"
import deepseekPng from "@/assets/images/model-provider/deepseek.png"
import githubSvg from "@/assets/images/model-provider/github.svg"
import mistralPng from "@/assets/images/model-provider/mistral.png"
import ollamaSvg from "@/assets/images/model-provider/ollama.svg"
import openaiPng from "@/assets/images/model-provider/openai.png"
import qwenPng from "@/assets/images/model-provider/qwen.png"
import zeroonePng from "@/assets/images/model-provider/zeroone.png"
import zhipuPng from "@/assets/images/model-provider/zhipu.png"

const AssistantAvatar = {
  [ModelProvider.OpenAI]: openaiPng,
  [ModelProvider.ZhiPu]: zhipuPng,
  [ModelProvider.ZeroOne]: zeroonePng,
  [ModelProvider.Qwen]: qwenPng,
  [ModelProvider.Ollama]: ollamaSvg,
  [ModelProvider.GitHub]: githubSvg,
  [ModelProvider.DeepSeek]: deepseekPng,
  [ModelProvider.Mistral]: mistralPng,
}

/**
 * AI 头像配置选项
 */
export interface AiAvatarOptions {
  /** 头像来源类型：本地资源或云端资源 */
  source: "local" | "cloud"
  /** 默认头像文件名，当无法识别模型类型时使用 */
  fallback?: string
  /** 是否启用缓存，默认为 true */
  enableCache?: boolean
}

/**
 * AI 头像缓存管理器
 * 用于缓存已计算的头像URL，避免重复计算
 */
class AvatarCacheManager {
  private cache = new Map<string, string>()
  private maxSize = 100

  get(key: string): string | undefined {
    return this.cache.get(key)
  }

  set(key: string, value: string): void {
    // 简单的LRU策略：当缓存满时清除最旧的条目
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }
    this.cache.set(key, value)
  }

  clear(): void {
    this.cache.clear()
  }

  has(key: string): boolean {
    return this.cache.has(key)
  }

  getSize(): number {
    return this.cache.size
  }

  getMaxSize(): number {
    return this.maxSize
  }
}

/**
 * AI 模型类型检测器
 * 专门用于检测和验证AI模型ID
 */
class AiModelDetector {
  private static readonly ROBOT_PATTERN = /@RBT#/

  /**
   * 检测ID是否为AI机器人ID
   * @param id 待检测的ID
   * @returns 是否为AI机器人ID
   */
  static isAiRobotId(id: string): boolean {
    return typeof id === "string" && this.ROBOT_PATTERN.test(id)
  }

  /**
   * 从AI机器人ID中提取模型类型
   * @param id AI机器人ID
   * @returns 模型提供者类型
   */
  static extractModelProvider(id: string): ModelProviderKey | null {
    if (!this.isAiRobotId(id)) {
      return null
    }

    return getModelType(id) || null
  }
}

/**
 * AI 头像URL构建器
 * 负责构建各种类型的头像URL
 */
class AiAvatarUrlBuilder {
  private static readonly CLOUD_BASE_URL = import.meta.env.VITE_CLOUD_BASE_URL || ""

  /**
   * 获取本地头像URL
   * 由于现在使用直接导入的方式，头像资源已经是完整的URL
   * @param avatarResource 直接导入的头像资源URL
   * @returns 本地头像URL
   */
  static getLocalUrl(avatarResource: string): string {
    return avatarResource
  }

  /**
   * 构建云端头像URL
   * 从本地资源URL中提取文件名，然后构建云端URL
   * @param avatarResource 直接导入的头像资源URL
   * @returns 云端头像URL
   */
  static buildCloudUrl(avatarResource: string): string {
    try {
      // 从本地URL中提取文件名
      const fileName = avatarResource.split("/").pop() || ""
      return `${this.CLOUD_BASE_URL}${fileName}`
    } catch (error) {
      console.warn(`Failed to build cloud avatar URL for ${avatarResource}:`, error)
      return avatarResource // 降级返回原始URL
    }
  }
}

/**
 * 全局头像缓存实例
 */
const avatarCache = new AvatarCacheManager()

/**
 * 获取AI头像URL
 *
 * 这是一个高性能、可扩展的AI头像URL获取函数，支持：
 * - 智能缓存机制，避免重复计算
 * - 多种头像来源（本地/云端）
 * - 优雅的错误处理和降级策略
 * - 完整的TypeScript类型支持
 *
 * @param id - AI机器人ID，格式如：C2C@RBT#001
 * @param options - 头像配置选项
 * @returns 头像URL字符串，如果无法获取则返回空字符串
 *
 * @example
 * ```typescript
 * // 基本用法
 * const avatarUrl = getAiAvatarUrl("C2C@RBT#001")
 *
 * // 使用云端资源
 * const cloudAvatar = getAiAvatarUrl("C2C@RBT#001", { source: "cloud" })
 *
 * // 自定义配置
 * const customAvatar = getAiAvatarUrl("C2C@RBT#001", {
 *   source: "local",
 *   fallback: "default.png",
 *   enableCache: false
 * })
 * ```
 */
export function getAiAvatarUrl(id: string, options: AiAvatarOptions = { source: "local" }): string {
  // 参数验证
  if (!id || typeof id !== "string") {
    console.warn("getAiAvatarUrl: Invalid ID provided", id)
    return ""
  }

  const { source, fallback = "", enableCache = true } = options

  // 生成缓存键
  const cacheKey = `${id}_${source}`

  // 尝试从缓存获取
  if (enableCache && avatarCache.has(cacheKey)) {
    const cachedValue = avatarCache.get(cacheKey)
    return cachedValue || ""
  }

  // 检测是否为AI机器人ID
  if (!AiModelDetector.isAiRobotId(id)) {
    console.warn("getAiAvatarUrl: ID is not a valid AI robot ID", id)
    return ""
  }

  // 提取模型提供者
  const modelProvider = AiModelDetector.extractModelProvider(id)
  if (!modelProvider) {
    console.warn("getAiAvatarUrl: Unable to extract model provider from ID", id)
    return fallback
  }

  // 获取头像资源URL
  const avatarResource = AssistantAvatar[modelProvider]
  if (!avatarResource) {
    console.warn("getAiAvatarUrl: No avatar resource found for model provider", modelProvider)
    return fallback
  }

  // 构建头像URL
  let avatarUrl: string
  switch (source) {
    case "cloud":
      avatarUrl = AiAvatarUrlBuilder.buildCloudUrl(avatarResource)
      break
    case "local":
    default:
      avatarUrl = AiAvatarUrlBuilder.getLocalUrl(avatarResource)
      break
  }

  // 缓存结果
  if (enableCache && avatarUrl) {
    avatarCache.set(cacheKey, avatarUrl)
  }

  return avatarUrl
}

/**
 * 批量获取AI头像URL
 * 用于一次性获取多个AI机器人的头像URL
 *
 * @param ids - AI机器人ID数组
 * @param options - 头像配置选项
 * @returns 头像URL数组，与输入ID数组一一对应
 *
 * @example
 * ```typescript
 * const avatarUrls = getBatchAiAvatarUrls([
 *   "C2C@RBT#001",
 *   "C2C@RBT#002"
 * ], { source: "local" })
 * ```
 */
export function getBatchAiAvatarUrls(ids: string[], options: AiAvatarOptions = { source: "local" }): string[] {
  if (!Array.isArray(ids)) {
    console.warn("getBatchAiAvatarUrls: Invalid IDs array provided", ids)
    return []
  }

  return ids.map((id) => getAiAvatarUrl(id, options))
}

/**
 * 清除头像缓存
 * 用于在需要时手动清除头像URL缓存
 */
export function clearAvatarCache(): void {
  avatarCache.clear()
}

/**
 * 获取缓存统计信息
 * 用于调试和监控缓存使用情况
 *
 * @returns 缓存统计信息
 */
export function getAvatarCacheStats(): { size: number; maxSize: number } {
  return {
    size: avatarCache.getSize(),
    maxSize: avatarCache.getMaxSize(),
  }
}
