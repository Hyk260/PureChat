import tim from "@/service/chat/PureChatService"
import { PIN_CONVERSATION_OPTIONS, SET_MESSAGE_REMIND_TYPE_OPTIONS } from "@/types/tencent-cloud-chat"

import type { DB_Message } from "@/database/schemas/message"
import type { DB_Session } from "@/database/schemas/session"

// 好友列表
// export const getFriendList = () => {
//   return tim.getFriendList()
// }

/**
 * 删除消息
 * @see https://web.sdk.qcloud.com/im/doc/v3/zh-cn/SDK.html#deleteMessage
 */
export const deleteMessage = async (params: DB_Message[]) => {
  try {
    const {
      code,
      data: { messageList },
    } = await tim.deleteMessage(params)
    return {
      code: code as number,
      messageList: messageList as DB_Message[],
    }
  } catch (error) {
    console.error("删除消息失败:", error)
    return {
      code: -1,
      messageList: [],
    }
  }
}

/**
 * 会话顶置
 */
export const pinConversation = async (params: PIN_CONVERSATION_OPTIONS) => {
  const { conversationID, isPinned } = params
  try {
    await tim.pinConversation({
      conversationID,
      isPinned: !isPinned,
    })
  } catch (error) {
    console.error("会话顶置失败:", error)
  }
}
// 撤回消息
export const revokeMsg = async (params) => {
  const {
    code,
    data: { message },
  } = await tim.revokeMessage(params)
  return {
    code,
    message,
  }
}
// 消息免打扰
export const setMessageRemindType = async (params: DB_Session) => {
  const { toAccount: userID, messageRemindType: remindType, type } = params
  let parameter = {} as SET_MESSAGE_REMIND_TYPE_OPTIONS
  const isDisable = remindType === "AcceptNotNotify"
  if (type === "C2C") {
    // 单人会话
    parameter = {
      userIDList: [userID || ""],
      messageRemindType: isDisable ? "" : "AcceptNotNotify",
    }
  } else {
    // 群聊
    parameter = {
      groupID: userID || "",
      // TIM.TYPES.MSG_REMIND_ACPT_AND_NOTE  "AcceptAndNotify"
      // （SDK 接收消息并通知接入侧，接入侧做提示）
      // TIM.TYPES.MSG_REMIND_ACPT_NOT_NOTE  "AcceptNotNotify"
      // （SDK 接收消息并通知接入侧，接入侧不做提示，一般用于实现“消息免打扰”）
      // TIM.TYPES.MSG_REMIND_DISCARD "Discard"
      // （SDK 拒收消息）
      messageRemindType: isDisable ? "AcceptAndNotify" : "AcceptNotNotify",
    }
  }
  try {
    await tim.setMessageRemindType(parameter)
  } catch (error) {
    console.error("设置消息免打扰失败:", error)
  }
}
// 获取会话信息
export const getConversationProfile = async ({ sessionId }: { sessionId: string }) => {
  try {
    const { data } = await tim.getConversationProfile(sessionId)
    return data
  } catch (error) {
    throw new Error(error)
  }
}
// 消息已读上报
export const setMessageRead = (params: { unreadCount?: number; conversationID: string }) => {
  if (__LOCAL_MODE__) return
  if (!params) return
  if (!params?.conversationID) return
  try {
    const { unreadCount = 0, conversationID } = params
    if (unreadCount === 0) return
    const promise = tim.setMessageRead({ conversationID })
    promise
      .then((res) => {
        console.log("已读上报成功", res)
      })
      .catch((err) => {
        console.warn("setMessageRead error:", err)
      })
  } catch (error) {
    console.error("已读上报失败:", error)
  }
}
// 删除会话
export const deleteConversation = async (params) => {
  const { sessionId = "" } = params
  const {
    code,
    data: { conversationID: ID },
  } = await tim.deleteConversation({ conversationIDList: [sessionId], clearHistoryMessage: false })
  return {
    code,
    ID,
  }
}
// 清空消息
export const clearHistoryMessage = async (sessionId) => {
  const {
    code,
    data: { conversationID: ID },
  } = await tim.clearHistoryMessage(sessionId)
  return {
    code,
    ID,
  }
}

// 翻译文本
export const translateText = async (params) => {
  const { textList } = params
  try {
    const { code, data } = await tim.translateText({
      sourceTextList: [textList],
      sourceLanguage: "auto",
      targetLanguage: "zh",
    })
  } catch (error) {
    console.error("翻译文本失败:", error)
  }
}
