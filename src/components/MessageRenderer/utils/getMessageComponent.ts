import { messageComponentManager } from "./message-component-manager"
import type { MessageItem } from "../types/message"
import type { MessageType } from "@/database/schemas/message"
import type { MessageComponent } from "./message-component-manager"

/**
 * 根据消息类型获取对应的组件
 * 这是一个便捷函数，内部使用单例管理器
 *
 * @param item - 消息对象
 * @returns 对应的 Vue 组件
 */
export const getMessageComponent = (item: MessageItem | null): MessageComponent | null => {
  return messageComponentManager.getComponent(item)
}

/**
 * 预加载指定类型的组件
 *
 * @param types - 消息类型数组
 */
export const preloadComponents = async (types: MessageType[]): Promise<void> => {
  return messageComponentManager.preloadComponents(types)
}

/**
 * 预加载所有支持的组件
 */
export const preloadAllComponents = async (): Promise<void> => {
  return messageComponentManager.preloadAllComponents()
}

/**
 * 清除组件缓存
 */
export const clearComponentCache = (): void => {
  messageComponentManager.clearCache()
}

/**
 * 获取所有支持的消息类型
 */
export const getSupportedMessageTypes = (): MessageType[] => {
  return messageComponentManager.getSupportedTypes()
}

/**
 * 检查是否支持某个消息类型
 */
export const isMessageTypeSupported = (type: MessageType): boolean => {
  return messageComponentManager.isTypeSupported(type)
}
