import { markRaw, type Component } from "vue"
import type { MessageType } from "@/database/schemas/message"
import { createAsyncMessageComponent } from "./message-component-factory"
import type { MessageItem } from "../types/message"
import type { DefineComponent } from "vue"

export type MessageComponent = Component | DefineComponent | (() => Promise<any>)

/**
 * 消息组件管理器类
 * 负责组件的注册、缓存、预加载等功能
 */
export class MessageComponentManager {
  // 消息类型到组件的映射表
  private componentMap: Record<MessageType, MessageComponent>

  // 组件缓存，避免重复创建
  private cache = new Map<string, MessageComponent>()

  // 撤回消息的专用组件
  private revokedComponent: MessageComponent

  constructor() {
    // 初始化组件映射表
    this.componentMap = markRaw(this.initializeComponentMap())

    // 初始化撤回消息组件
    this.revokedComponent = createAsyncMessageComponent(() => import("../ElemItemTypes/TipsElemItem.vue"))

    if (import.meta.env.DEV) {
      this.setupDebugTools()
    }
  }

  /**
   * 初始化消息类型到组件的映射
   * 使用工厂函数统一创建异步组件，减少重复代码
   */
  private initializeComponentMap(): Record<MessageType, MessageComponent> {
    return {
      TIMTextElem: createAsyncMessageComponent(() => import("../ElemItemTypes/TextElemItem.vue")),
      TIMRelayElem: createAsyncMessageComponent(() => import("../ElemItemTypes/RelayElemItem.vue")),
      TIMImageElem: createAsyncMessageComponent(() => import("../ElemItemTypes/ImageElemItem.vue")),
      TIMFileElem: createAsyncMessageComponent(() => import("../ElemItemTypes/FileElemItem.vue")),
      TIMCustomElem: createAsyncMessageComponent(() => import("../ElemItemTypes/CustomElemItem.vue")),
      TIMGroupTipElem: createAsyncMessageComponent(() => import("../ElemItemTypes/GroupTipElement.vue")),
      TIMGroupSystemNoticeElem: createAsyncMessageComponent(() => import("../ElemItemTypes/GroupSystemNoticeElem.vue")),
    }
  }

  /**
   * 生成缓存键
   * 格式: {消息类型}_{撤回状态}_{消息ID}
   */
  private getCacheKey(item: MessageItem): string {
    const status = item.isRevoked ? "revoked" : "normal"
    return `${item.type}_${status}_${item.ID}`
  }

  /**
   * 根据消息获取对应的组件
   * 优先返回缓存的组件，提高性能
   *
   * @param item - 消息对象
   * @returns 对应的 Vue 组件，如果找不到则返回 null
   */
  getComponent(item: MessageItem | null): MessageComponent | null {
    // 边界情况处理
    if (!item?.type) {
      console.warn("[MessageComponentManager] 消息对象无效或缺少类型")
      return null
    }

    // 撤回消息使用专用组件
    if (item.isRevoked) {
      return this.revokedComponent
    }

    const cacheKey = this.getCacheKey(item)

    // 检查缓存
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey) || null
    }

    // 从映射表获取组件
    const component = this.componentMap[item.type]

    if (!component) {
      console.warn(`[MessageComponentManager] 未知的消息类型: ${item.type}`)
      return null
    }

    // 缓存组件
    this.cache.set(cacheKey, component)
    return component
  }

  /**
   * 预加载指定类型的组件
   * 用于优化首屏加载性能
   *
   * @param types - 需要预加载的消息类型数组
   */
  async preloadComponents(types: MessageType[]): Promise<void> {
    if (!types.length) {
      console.warn("[MessageComponentManager] 预加载组件列表为空")
      return
    }

    const loadPromises = types.map(async (type) => {
      const component = this.componentMap[type]

      if (!component) {
        console.warn(`[MessageComponentManager] 无法预加载未知类型: ${type}`)
        return
      }

      try {
        // 触发异步组件的加载器
        if (typeof component === "object" && "loader" in component) {
          await (component as any).loader()
        } else if (typeof component === "function") {
          await (component as () => Promise<any>)()
        }
      } catch (error) {
        console.error(`[MessageComponentManager] 预加载组件失败 [${type}]:`, error)
        throw error // 向上抛出错误，让 Promise.allSettled 捕获
      }
    })

    try {
      const results = await Promise.allSettled(loadPromises)

      // 统计加载结果
      const successCount = results.filter((r) => r.status === "fulfilled").length
      const failCount = results.filter((r) => r.status === "rejected").length

      console.log(`组件预加载完成: 成功 ${successCount}/${types.length}` + (failCount > 0 ? `, 失败 ${failCount}` : ""))
    } catch (error) {
      console.error("[MessageComponentManager] 预加载过程发生异常:", error)
    }
  }

  /**
   * 预加载所有支持的组件类型
   */
  async preloadAllComponents(): Promise<void> {
    const allTypes = this.getSupportedTypes()
    await this.preloadComponents(allTypes)
  }

  /**
   * 清除组件缓存
   * 用于内存优化或强制刷新组件
   */
  clearCache(): void {
    const cacheSize = this.cache.size
    this.cache.clear()
    console.log(`[MessageComponentManager] 已清除 ${cacheSize} 个缓存组件`)
  }

  /**
   * 获取所有支持的消息类型
   */
  getSupportedTypes(): MessageType[] {
    return Object.keys(this.componentMap) as MessageType[]
  }

  /**
   * 检查是否支持某个消息类型
   */
  isTypeSupported(type: MessageType): boolean {
    return type in this.componentMap
  }

  setupDebugTools() {
    window.__TIM_Message_Renderer = {
      getSupportedTypes: () => this.getSupportedTypes(),
      preloadAllComponents: () => this.preloadAllComponents(),
      clearCache: () => this.clearCache(),
    }
  }
}

export const messageComponentManager = new MessageComponentManager()
