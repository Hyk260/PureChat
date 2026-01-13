import { getBlob } from "./message-input-utils"

import type { DB_Message, MessageType, ImagePayloadType, DB_Session } from "@pure/database/schemas"
import type { DraftData } from "@/types"

export const isTime = (item: DB_Message) => {
  return item?.isTimeDivider && item.time !== undefined
}

export const isSelf = (item: DB_Message) => {
  return item.from === window.localStg.get("timProxy")?.userProfile?.userID
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

/**
 * 根据图片的宽度和高度计算展示图片的样式
 */
export const showIMPic = (width: number = 0, height: number = 0) => {
  // 确保高度不小于40px
  const minHeight = 40
  // 限制高度不超过360px
  const maxHeight = 360

  // 计算宽度和高度的逻辑
  let computedWidth: number = 0
  let computedHeight: number = 0

  if (width >= 140) {
    computedWidth = 140
    computedHeight = Math.max(Math.round((140 / width) * height), minHeight)
  } else if (width <= 35) {
    computedWidth = 45
    computedHeight = Math.max(Math.round((45 / width) * height), minHeight)
  } else {
    computedWidth = width
    computedHeight = Math.max(height, minHeight)
  }

  computedHeight = Math.min(computedHeight, maxHeight)

  const imageStyle = {
    width: `${computedWidth}px`,
    height: `${computedHeight}px`,
  }

  return imageStyle
}

export const formatContent = (data: DraftData) => {
  return data
    .filter((item) => item.type === "paragraph")
    .map(({ children }) => {
      return (
        children
          ?.map((t) => {
            if (t.type === "image" && t?.alt && t?.class === "EmoticonPack") return String(t.alt)
            if (t.type === "image") return "[图片]"
            if (t.type === "attachment") return "[文件]"
            if (t.type === "mention") return String(`@${t.value}`)
            return String(t.text || "")
          })
          .join("") || ""
      )
    })
    .join("")
}

export const validateLastMessage = (list: DB_Message[]): DB_Message | null => {
  if (!list.length) return null
  return list.slice().find((t) => t.ID) || null
}

/**
 * 复制消息内容到剪贴板
 */
export const handleCopyMsg = async (data: DB_Message) => {
  try {
    const { payload, type } = data
    if (type === "TIMTextElem" && payload?.text) {
      window.copyToClipboard(payload.text)
      return
    }
    if (type === "TIMImageElem") {
      const imagePayload = data.payload as ImagePayloadType
      const url = imagePayload?.imageInfoArray?.[0]?.url || ""
      const imageBlob = await getBlob(url)
      await navigator.clipboard.write([new ClipboardItem({ "image/png": imageBlob })])
      window.$message?.success("图片复制成功")
    }
  } catch (error) {
    console.error("复制失败:", error)
    window.$message?.error("复制失败")
  }
}

const MAX_TIP_LENGTH = 46

export const isNotify = (item: DB_Session) => {
  return item.messageRemindType === "AcceptNotNotify"
}

export const isShowCount = (item: DB_Session) => {
  return item.unreadCount === 0
}

export const truncateTip = (t: string) => (t.length > MAX_TIP_LENGTH ? `${t.slice(0, MAX_TIP_LENGTH)}...` : t)

export const formatNewsMessage = (data: DB_Session, userID?: string) => {
  if (!data) return ""
  const { type, lastMessage, unreadCount } = data
  const { messageForShow: rawTip, fromAccount, isRevoked, nick, type: lastType } = lastMessage ?? {}
  const isOther = userID !== fromAccount // 其他人消息
  const isFound = fromAccount === "@TLS#NOT_FOUND" // 未知消息
  const isSystem = type === "@TIM#SYSTEM" //系统消息
  const isGroup = type === "GROUP" //群聊
  const isCount = unreadCount && isNotify(data) // 未读消息计数

  const tip = truncateTip(rawTip || "")
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
