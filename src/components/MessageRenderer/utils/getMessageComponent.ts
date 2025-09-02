import { type Component, markRaw } from "vue"

import { MessageType } from "@/database/schemas/message"

// const CustomElemItem = () => import("../ElemItemTypes/CustomElemItem.vue")
// const FileElemItem = () => import("../ElemItemTypes/FileElemItem.vue")
// const GroupSystemNoticeElem = () => import("../ElemItemTypes/GroupSystemNoticeElem.vue")
// const GroupTipElement = () => import("../ElemItemTypes/GroupTipElement.vue")
// const ImageElemItem = () => import("../ElemItemTypes/ImageElemItem.vue")
// const RelayElemItem = () => import("../ElemItemTypes/RelayElemItem.vue")
// const TextElemItem = () => import("../ElemItemTypes/TextElemItem.vue")
// const TipsElemItem = () => import("../ElemItemTypes/TipsElemItem.vue")
import CustomElemItem from "../ElemItemTypes/CustomElemItem.vue"
import FileElemItem from "../ElemItemTypes/FileElemItem.vue"
import GroupSystemNoticeElem from "../ElemItemTypes/GroupSystemNoticeElem.vue"
import GroupTipElement from "../ElemItemTypes/GroupTipElement.vue"
import ImageElemItem from "../ElemItemTypes/ImageElemItem.vue"
import RelayElemItem from "../ElemItemTypes/RelayElemItem.vue"
import TextElemItem from "../ElemItemTypes/TextElemItem.vue"
import TipsElemItem from "../ElemItemTypes/TipsElemItem.vue"

import type { MessageItem } from "../types/message"
import type { DefineComponent } from "vue"

export type MessageComponent = Component | DefineComponent | (() => Promise<any>)

const MESSAGE_COMPONENT_MAP: Record<MessageType, MessageComponent> = markRaw({
  TIMTextElem: TextElemItem, // 文本消息
  TIMRelayElem: RelayElemItem, // 合并转发消息
  TIMImageElem: ImageElemItem, // 图片消息
  TIMFileElem: FileElemItem, // 文件消息
  TIMCustomElem: CustomElemItem, // 自定义消息
  TIMGroupTipElem: GroupTipElement, // 群消息提示
  TIMGroupSystemNoticeElem: GroupSystemNoticeElem, // 系统通知
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
    return TipsElemItem
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
 * 预加载组件
 */
export const preloadComponents = async (types: MessageType[]): Promise<void> => {
  const promises = types.map((type) => {
    const component = MESSAGE_COMPONENT_MAP[type]
    if (typeof component === "function") {
      return component()
    }
    return Promise.resolve(component)
  })

  try {
    await Promise.all(promises)
  } catch (error) {
    console.error("Failed to preload components:", error)
  }
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
