import { type Component, markRaw, shallowRef } from "vue"

// const CustomElemItem = () => import("../ElemItemTypes/ElemItemTypes/CustomElemItem.vue")
// const FileElemItem = () => import("../ElemItemTypes/ElemItemTypes/FileElemItem.vue")
// const GroupSystemNoticeElem = () => import("../ElemItemTypes/ElemItemTypes/GroupSystemNoticeElem.vue")
// const GroupTipElement = () => import("../ElemItemTypes/ElemItemTypes/GroupTipElement.vue")
// const ImageElemItem = () => import("../ElemItemTypes/ElemItemTypes/ImageElemItem.vue")
// const RelayElemItem = () => import("../ElemItemTypes/ElemItemTypes/RelayElemItem.vue")
// const TextElemItem = () => import("../ElemItemTypes/ElemItemTypes/TextElemItem.vue")
// const TipsElemItem = () => import("../ElemItemTypes/ElemItemTypes/TipsElemItem.vue")
import CustomElemItem from "../ElemItemTypes/CustomElemItem.vue"
import FileElemItem from "../ElemItemTypes/FileElemItem.vue"
import GroupSystemNoticeElem from "../ElemItemTypes/GroupSystemNoticeElem.vue"
import GroupTipElement from "../ElemItemTypes/GroupTipElement.vue"
import ImageElemItem from "../ElemItemTypes/ImageElemItem.vue"
import RelayElemItem from "../ElemItemTypes/RelayElemItem.vue"
import TextElemItem from "../ElemItemTypes/TextElemItem.vue"
import TipsElemItem from "../ElemItemTypes/TipsElemItem.vue"

import type { MessageItem, MessageType } from "../types/message"
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

const componentCache = new WeakMap<MessageItem, MessageComponent>()
const fallbackCache = shallowRef(new Map<string, MessageComponent>())

/**
 * 根据消息类型获取对应的组件
 */
export const getMessageComponent = (item: MessageItem | null | undefined): MessageComponent | null | undefined => {
  if (!item || typeof item !== "object") {
    return null
  }

  const { type, isRevoked = false, ID } = item

  if (typeof item === "object" && componentCache.has(item)) {
    return componentCache.get(item)
  }

  const cacheKey = `${type}_${isRevoked ? "revoked" : "normal"}_${ID}`
  if (fallbackCache.value.has(cacheKey)) {
    return fallbackCache.value.get(cacheKey)
  }

  let component: MessageComponent | null = null

  if (isRevoked) {
    component = TipsElemItem
  } else if (type && type in MESSAGE_COMPONENT_MAP) {
    component = MESSAGE_COMPONENT_MAP[type]
  } else {
    console.warn(`Unknown message type: ${type}`)
    component = null
  }

  if (component) {
    if (typeof item === "object") {
      componentCache.set(item, component)
    }
    fallbackCache.value.set(cacheKey, component)
  }

  return component
}
