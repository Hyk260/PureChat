import type { DB_Message } from "@/database/schemas/message"

export type MessageItem = DB_Message

export type MessageType =
  | "TIMTextElem"
  | "TIMRelayElem"
  | "TIMImageElem"
  | "TIMFileElem"
  | "TIMCustomElem"
  | "TIMGroupTipElem"
  | "TIMGroupSystemNoticeElem"

export interface MessageComponentProps {
  msgType?: string
  message: MessageItem
  self: boolean
}
