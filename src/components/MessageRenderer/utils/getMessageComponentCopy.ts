import { type Component, markRaw, defineAsyncComponent } from "vue"

import { MessageType } from "@/database/schemas/message"

const CustomElemItem = () => import("../ElemItemTypes/CustomElemItem.vue")
const FileElemItem = () => import("../ElemItemTypes/FileElemItem.vue")
const GroupSystemNoticeElem = () => import("../ElemItemTypes/GroupSystemNoticeElem.vue")
const GroupTipElement = () => import("../ElemItemTypes/GroupTipElement.vue")
const ImageElemItem = () => import("../ElemItemTypes/ImageElemItem.vue")
const RelayElemItem = () => import("../ElemItemTypes/RelayElemItem.vue")
const TextElemItem = () => import("../ElemItemTypes/TextElemItem.vue")
const TipsElemItem = () => import("../ElemItemTypes/TipsElemItem.vue")

import type { MessageItem } from "../types/message"
import type { DefineComponent } from "vue"

export type MessageComponent = Component | DefineComponent | (() => Promise<any>)

const MESSAGE_COMPONENT_MAP: Record<MessageType, MessageComponent> = markRaw({
  TIMTextElem: defineAsyncComponent({
    loader: TextElemItem,
    loadingComponent: {
      template: '<div class="message-loading">加载中...</div>',
      style: { padding: "8px", color: "#666", fontSize: "12px" },
    },
    errorComponent: {
      template: '<div class="message-error">组件加载失败</div>',
      style: { padding: "8px", color: "#c33", fontSize: "12px" },
    },
    delay: 200,
    timeout: 3000,
  }), // 文本消息
  TIMRelayElem: defineAsyncComponent({
    loader: RelayElemItem,
    loadingComponent: {
      template: '<div class="message-loading">加载中...</div>',
      style: { padding: "8px", color: "#666", fontSize: "12px" },
    },
    errorComponent: {
      template: '<div class="message-error">组件加载失败</div>',
      style: { padding: "8px", color: "#c33", fontSize: "12px" },
    },
    delay: 200,
    timeout: 3000,
  }), // 合并转发消息
  TIMImageElem: defineAsyncComponent({
    loader: ImageElemItem,
    loadingComponent: {
      template: '<div class="message-loading">加载中...</div>',
      style: { padding: "8px", color: "#666", fontSize: "12px" },
    },
    errorComponent: {
      template: '<div class="message-error">组件加载失败</div>',
      style: { padding: "8px", color: "#c33", fontSize: "12px" },
    },
    delay: 200,
    timeout: 3000,
  }), // 图片消息
  TIMFileElem: defineAsyncComponent({
    loader: FileElemItem,
    loadingComponent: {
      template: '<div class="message-loading">加载中...</div>',
      style: { padding: "8px", color: "#666", fontSize: "12px" },
    },
    errorComponent: {
      template: '<div class="message-error">组件加载失败</div>',
      style: { padding: "8px", color: "#c33", fontSize: "12px" },
    },
    delay: 200,
    timeout: 3000,
  }), // 文件消息
  TIMCustomElem: defineAsyncComponent({
    loader: CustomElemItem,
    loadingComponent: {
      template: '<div class="message-loading">加载中...</div>',
      style: { padding: "8px", color: "#666", fontSize: "12px" },
    },
    errorComponent: {
      template: '<div class="message-error">组件加载失败</div>',
      style: { padding: "8px", color: "#c33", fontSize: "12px" },
    },
    delay: 200,
    timeout: 3000,
  }), // 自定义消息
  TIMGroupTipElem: defineAsyncComponent({
    loader: GroupTipElement,
    loadingComponent: {
      template: '<div class="message-loading">加载中...</div>',
      style: { padding: "8px", color: "#666", fontSize: "12px" },
    },
    errorComponent: {
      template: '<div class="message-error">组件加载失败</div>',
      style: { padding: "8px", color: "#c33", fontSize: "12px" },
    },
    delay: 200,
    timeout: 3000,
  }), // 群消息提示
  TIMGroupSystemNoticeElem: defineAsyncComponent({
    loader: GroupSystemNoticeElem,
    loadingComponent: {
      template: '<div class="message-loading">加载中...</div>',
      style: { padding: "8px", color: "#666", fontSize: "12px" },
    },
    errorComponent: {
      template: '<div class="message-error">组件加载失败</div>',
      style: { padding: "8px", color: "#c33", fontSize: "12px" },
    },
    delay: 200,
    timeout: 3000,
  }), // 系统通知
})

const RevokedTipsComponent = defineAsyncComponent({
  loader: TipsElemItem,
  loadingComponent: {
    template: '<div class="message-loading">加载中...</div>',
    style: { padding: "8px", color: "#666", fontSize: "12px" },
  },
  errorComponent: {
    template: '<div class="message-error">组件加载失败</div>',
    style: { padding: "8px", color: "#c33", fontSize: "12px" },
  },
  delay: 200,
  timeout: 3000,
})

const componentCache = new Map<string, MessageComponent>()

const getCacheKey = (item: MessageItem): string => {
  return `${item.type}_${item.isRevoked ? "revoked" : "normal"}_${item.ID}`
}

/**
 * 根据消息类型获取对应的组件
 */
export const getMessageComponent = (item: MessageItem | null): MessageComponent | null => {
  if (!item?.type) {
    return null
  }

  if (item.isRevoked) {
    return RevokedTipsComponent
  }

  const cacheKey = getCacheKey(item)

  if (componentCache.has(cacheKey)) {
    return componentCache.get(cacheKey) || null
  }

  const component = MESSAGE_COMPONENT_MAP[item.type] || null

  if (!component) {
    console.warn(`Unknown message type: ${item.type}`)
    return null
  }

  componentCache.set(cacheKey, component)
  return component
}

/**
 * 预加载组件 - 优化为支持异步组件
 */
export const preloadComponents = async (types: MessageType[]): Promise<void> => {
  const promises = types.map(async (type) => {
    const component = MESSAGE_COMPONENT_MAP[type]
    if (component) {
      // 对于 defineAsyncComponent，我们需要触发其 loader 函数
      try {
        // 如果是异步组件，尝试预加载
        if (typeof component === "object" && "loader" in component) {
          await (component as any).loader()
        } else if (typeof component === "function") {
          await (component as () => Promise<any>)()
        }
      } catch (error) {
        console.warn(`Failed to preload component for type ${type}:`, error)
      }
    }
  })

  try {
    await Promise.all(promises)
    console.log(`Successfully preloaded ${types.length} message components`)
  } catch (error) {
    console.error("Failed to preload components:", error)
  }
}

/**
 * 预加载所有支持的组件
 */
export const preloadAllComponents = async (): Promise<void> => {
  const allTypes = getSupportedMessageTypes()
  await preloadComponents(allTypes)
}

/**
 * 清除组件缓存
 */
export const clearComponentCache = (): void => {
  componentCache.clear()
}

/**
 * 获取所有支持的消息类型
 */
export const getSupportedMessageTypes = (): MessageType[] => {
  return Object.keys(MESSAGE_COMPONENT_MAP) as MessageType[]
}
