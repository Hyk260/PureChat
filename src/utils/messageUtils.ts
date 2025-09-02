import type { DB_Message } from "@/database/schemas/message"

export const messageUtils = {
  /**
   * 检查消息是否有效
   */
  isValidMessage(item: DB_Message) {
    return (
      typeof item === "object" &&
      item !== null &&
      "type" in item &&
      "ID" in item &&
      typeof item.type === "string" &&
      typeof item.ID === "string"
    )
  },

  /**
   * 格式化消息显示文本
   */
  getMessageDisplayText(item: DB_Message): string {
    const typeMap = {
      TIMImageElem: "[图片消息]",
      TIMFileElem: "[文件消息]",
      TIMRelayElem: "[合并消息]",
      TIMCustomElem: "[自定义消息]",
      TIMGroupTipElem: "[群提示]",
      TIMGroupSystemNoticeElem: "[系统通知]",
    }

    return typeMap[item.type] || ""
  },

  /**
   * 检查消息是否为系统消息
   */
  isSystemMessage(item: DB_Message): boolean {
    return ["TIMGroupTipElem", "TIMGroupSystemNoticeElem"].includes(item.type)
  },
}
