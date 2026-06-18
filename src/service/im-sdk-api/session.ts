import { timProxy } from "@/service/chat"
import tim from "@/service/chat/PureChatService"
import { GET_MESSAGE_LIST_HOPPING_OPTIONS, GET_MESSAGE_LIST_OPTIONS } from "@/types/tencent-cloud-chat"

import type { DB_Message } from "@pure/database/schemas"

/**
 * 获取未读消息总数
 */
export const getUnreadMsg = (): number => {
  if (!timProxy.isSDKReady) return 0
  return tim.getTotalUnreadMessageCount()
}

/**
 * 获取消息列表
 * https://web.sdk.qcloud.com/im/doc/v3/zh-cn/SDK.html#getMessageList
 */
export const getMessageList = async (params: GET_MESSAGE_LIST_OPTIONS) => {
  try {
    const { code, data } = await tim.getMessageList({
      ...params,
    })
    if (code === 0) {
      return data
    } else {
      throw new Error("Failed to get message list")
    }
  } catch (error) {
    throw new Error(`Failed to get message list ${error}`)
  }
}
/**
 * 根据指定的消息 sequence 或 消息时间拉取会话的消息列表。
 */
export const getMessageListHopping = async (params: GET_MESSAGE_LIST_HOPPING_OPTIONS) => {
  try {
    const { code, data } = await tim.getMessageListHopping({
      count: 15,
      ...params,
    })
    if (code === 0) {
      return data
    } else {
      throw new Error("Failed to get message list")
    }
  } catch (error) {
    throw new Error(`Failed to get message list ${error}`)
  }
}

/**
 * 变更消息的接口
 */
export const modifyMessage = async (params: DB_Message) => {
  try {
    const { code, data: message } = await tim.modifyMessage(params)
    if (code === 0) {
      return message
    } else {
      throw new Error("Failed to modify message")
    }
  } catch {
    return { code: -1, data: { message: {} as DB_Message } }
  }
}
