import { formatTitleLength } from "./genOG"
import type { DB_Message, MessageType, DB_Session } from "@pure/database/schemas"
import type { DraftData, DraftChild } from "@pure/types"

export const isTime = (item: { isTimeDivider?: boolean; time?: string | number }) => {
  return item?.isTimeDivider && item?.time !== undefined
}

export const getMessageItemClass = (item: DB_Message) => {
  const { isRevoked, type } = item
  // 撤回消息或群提示消息使用特殊样式
  if (isRevoked || type === "TIMGroupTipElem") {
    return "message-view-tips-elem"
  }

  return "message-view-item-index"
}

export const getMessageTypeClass = (type: MessageType) => {
  let resp = ""
  switch (type) {
    case "TIMTextElem":
      resp = "message-view__text" // 文本
      break
    case "TIMGroupTipElem":
      resp = "message-view-tips-elem" // 群消息提示
      break
    case "TIMImageElem":
      resp = "message-view__img" // 图片消息
      break
    case "TIMFileElem":
      resp = "message-view__file" // 文件消息
      break
    case "TIMGroupSystemNoticeElem":
      resp = "message-view__system" // 系统通知
      break
    case "TIMCustomElem":
      resp = "message-view__text message-view__custom" // 自定义消息
      break
    default:
      resp = ""
      break
  }
  return resp
}

export const validateLastMessage = (list: DB_Message[]): DB_Message | null => {
  if (!list.length) return null
  return list.slice().find((t) => t.ID) || null
}

export const isNotify = (item: { messageRemindType?: string }) => {
  return item?.messageRemindType === "AcceptNotNotify"
}

/**
 * description
 * unreadCount === 0
 */
export const isShowCount = (item: { unreadCount?: number }) => {
  return item?.unreadCount === 0
}

export const formatNewsMessage = (data: DB_Session, userID?: string) => {
  if (!data) return ""
  const { type, lastMessage, unreadCount } = data
  const { messageForShow: rawTip, fromAccount, isRevoked, nick, type: lastType } = lastMessage ?? {}
  const isOther = userID !== fromAccount // 其他人消息
  const isFound = fromAccount === "@TLS#NOT_FOUND" // 未知消息
  const isSystem = type === "@TIM#SYSTEM" //系统消息
  const isGroup = type === "GROUP" //群聊
  const isCount = unreadCount && isNotify(data) // 未读消息计数

  const tip = formatTitleLength(rawTip || "")
  // 撤回消息
  if (isRevoked) {
    const actor = isOther ? (nick ?? "未知用户") : "你"
    return `${actor}撤回了一条消息`
  }
  // 处理免打扰消息
  if (isCount) {
    const prefix = `[${unreadCount}条] `
    if (lastType === "TIMGroupTipElem") {
      return `${prefix} ${tip}`
    }
    const sender = isGroup && isOther ? `${nick || "未知用户"}: ` : ""
    return `${prefix}${sender}${tip}`
  }
  // 处理未知或系统消息
  if (isFound || isSystem) return tip
  // 处理群聊消息
  if (isGroup && isOther) {
    if (lastType === "TIMGroupTipElem") {
      return tip
    } else if (nick) {
      return `${nick}: ${tip}`
    }
  }
  // 默认返回消息内容
  return tip
}

export function checkTextNotEmpty(nodes: DraftData): boolean {
  if (!Array.isArray(nodes) || nodes.length === 0) return false
  return nodes.some((node) => {
    if (!node?.children || !Array.isArray(node.children)) return false
    return node.children.some((child) => child?.text?.trim() !== "")
  })
}

export const formatContent = (data: DraftData) => {
  return data
    .filter((item) => item.type === "paragraph")
    .map(({ children }) => {
      return (
        children
          ?.map((t) => {
            if (t.type === "image" && t?.alt && t?.class === "EmoticonPack") return t.alt
            if (t.type === "image") return "[图片]"
            if (t.type === "attachment") return "[文件]"
            if (t.type === "mention") return `@${t.value ?? ""}`
            return t.text || ""
          })
          .join("") || ""
      )
    })
    .join("")
}

export const getMessageDisplayText = (item: Partial<DB_Message>): string => {
  const typeMap = {
    TIMImageElem: "[图片消息]",
    TIMFileElem: "[文件消息]",
    TIMRelayElem: "[合并消息]",
    TIMCustomElem: "[自定义消息]",
    TIMGroupTipElem: "[群提示]",
    TIMGroupSystemNoticeElem: "[系统通知]",
  }

  if (!item.type) return ""

  return typeMap[item.type] || ""
}

export const generateAbstractList = (item: DB_Message[]) => {
  return item.map((t) => {
    if (t.type === "TIMTextElem") {
      return `${t.nick}: ${t?.payload?.text || ""}`
    } else if (t.type === "TIMImageElem") {
      return `${t?.nick}: [图片]`
    } else if (t.type === "TIMFileElem") {
      return `${t.nick}: [文件]`
    } else if (t.type === "TIMRelayElem") {
      return `${t.nick}: [合并消息]`
    } else if (t.type === "TIMCustomElem") {
      return `${t.nick}: [自定义消息]`
    } else {
      return `${t.nick}: [待开发]`
    }
  })
}

export const getAbstractContent = (data: Partial<DB_Message>): string => {
  const reply = getMessageDisplayText(data)
  if (reply) {
    return reply
  } else {
    return data?.payload?.text || ""
  }
}

export const chatName = (item: DB_Session): string => {
  if (!item) return ""
  switch (item.type) {
    case "C2C":
      return item?.userProfile?.nick || item?.userProfile?.userID || "C2C"
    case "GROUP":
      return item?.groupProfile?.name || "GROUP"
    case "@TIM#SYSTEM":
      return "系统通知"
    default:
      return ""
  }
}

/**
 * description: 获取自定义字段前缀
 * @param key 自定义字段key
 * @returns 自定义字段前缀 Tag_Profile_Custom_${key}
 */
export function prefix(key: string) {
  const prefix = "Tag_Profile_Custom_"
  return `${prefix}${key}`
}

export function getValueKey(array: any[], key: string) {
  if (!array?.length || !key) return null
  const item = array.find((t) => t.key === key)
  return item?.value ? item.value : null
}

// 全员群
export function isFullStaffGroup(data: any) {
  const { groupProfile } = data || {}
  return getValueKey(groupProfile?.groupCustomField, "custom_info") === "all_staff"
}
