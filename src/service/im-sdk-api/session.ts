// import { DB_Message } from "@/database/schemas/message"
import { Message } from "@/service/chat/types/tencent-cloud-chat"
import { timProxy } from "@/service/chat"
import tim from "@/service/chat/PureChatService"

/**
 * 获取未读消息总数
 */
export const getUnreadMsg = (): number => {
  if (!timProxy.isSDKReady) {
    console.warn("SDK is not ready")
    return 0
  }
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
    console.error("Error in getMessageList:", error)
    return { nextReqMessageID: "", isCompleted: false, messageList: [] }
  }
}

/**
 * 变更消息的接口
 */
export const modifyMessage = async (params: Message) => {
  try {
    const { code, data: message } = await tim.modifyMessage(params)
    if (code === 0) {
      return message
    } else {
      throw new Error("Failed to modify message")
    }
  } catch {
    return { code: -1, data: { message: {} as Message } }
  }
}
