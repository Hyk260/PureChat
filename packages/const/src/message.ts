import { DB_Message } from "@pure/database/schemas"

export const LOADING_FLAT = "..."

export const MESSAGE_CANCEL_FLAT = "canceled"

export const MESSAGE_THREAD_DIVIDER_ID = "__THREAD_DIVIDER__"

export const MESSAGE_WELCOME_GUIDE_ID = "welcome"

export const THREAD_DRAFT_ID = "__THREAD_DRAFT_ID__"

export const MESSAGE_FLAGGED_THINKING = "FLAGGED_THINKING"

// https://web.sdk.qcloud.com/im/doc/zh-cn/Message.html
export const MessageSchema: DB_Message = {
  ID: "",
  conversationID: "",
  conversationType: "C2C",
  time: 0,
  sequence: 0,
  clientSequence: 0,
  random: 0,
  priority: "Normal",
  nick: "",
  avatar: "",
  isPeerRead: false,
  nameCard: "",
  hasRiskContent: false,
  isPlaceMessage: 0,
  isRevoked: false,
  from: "",
  to: "",
  flow: "out",
  isSystemMessage: false,
  protocol: "JSON",
  isResend: false,
  isRead: true,
  status: "success",
  atUserList: [],
  cloudCustomData: "",
  isDeleted: false,
  isModified: false,
  clientTime: 0,
  senderTinyID: "",
  needReadReceipt: false,
  version: "0.8.4",
  isBroadcastMessage: false,
  isSupportExtension: false,
  revoker: "",
  // revokerInfo: {},
  revokeReason: "",
  payload: {
    text: "",
  },
  type: "TIMTextElem",
  // ***************** Custom ***************** //
  sessionId: "",
  // **************** Base *************** //
  // id: "",
  // createdAt: 0,
  // updatedAt: 0,
}
