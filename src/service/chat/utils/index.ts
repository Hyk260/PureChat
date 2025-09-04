import { useChatStore } from "@/stores/modules/chat"

import type { DB_Message } from "@/database/schemas/message"

export function kickedOutReason(type: string) {
  switch (type) {
    case "multipleAccount":
      return "由于多实例登录"
    case "multipleDevice":
      return "由于多设备登录"
    case "userSigExpired":
      return "由于 userSig 过期"
    default:
      return "未知原因"
  }
}

export function checkoutNetState(state: string): { message: string; type: string } {
  switch (state) {
    case "connected":
      return { message: "已接入网络", type: "success" }
    case "connecting":
      return { message: "当前网络不稳定", type: "warning" }
    case "disconnected":
      return { message: "当前网络不可用", type: "error" }
    default:
      return { message: "未知网络状态", type: "error" }
  }
}

export function getConversationList(data: DB_Message[]) {
  const list = useChatStore().conversationList
  const chatId = data?.[0]?.conversationID ?? ""
  const massage = list.filter((t) => t.conversationID === chatId)
  return massage
}
