import { timProxy } from "@/service/chat"
import tim from "@/service/chat/PureChatService"

import type { DB_Message } from "@/types"

/**
 * 获取未读消息总数
 */
export const getUnreadMsg = (): number => {
  if (!timProxy.isSDKReady) return 0
  return tim.getTotalUnreadMessageCount()
}

/**
 * 获取消息列表
 * @param {Object} params - 参数对象
 * @param {string} params.conversationID - 会话ID
 * @param {string} [params.nextReqMessageID] - 下一次请求的消息ID
 * https://web.sdk.qcloud.com/im/doc/v3/zh-cn/SDK.html#getMessageList
 */
export const getMessageList = async (params: { conversationID: string; nextReqMessageID?: string }) => {
  try {
    const { conversationID, nextReqMessageID = "" } = params
    const { code, data } = await tim.getMessageList({
      conversationID,
      nextReqMessageID,
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

export const getMessageListHopping = async (params: { conversationID: string }) => {
  try {
    const { conversationID } = params
    const { code, data } = await tim.getMessageListHopping({
      conversationID,
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
