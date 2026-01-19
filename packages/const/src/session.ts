import { DB_Session } from "@pure/database/schemas"
import { UserSchema } from "./user"
// import { groupProfile } from "./group"

export const INBOX_SESSION_ID = "inbox"

export const lastMessage = {
  lastTime: 0,
  lastSequence: 0,
  fromAccount: "",
  type: "TIMTextElem",
  payload: {
    text: "",
  },
  cloudCustomData: "",
  isRevoked: false,
  onlineOnlyFlag: false,
  nick: "",
  nameCard: "",
  version: 0,
  isPeerRead: false,
  revoker: "",
  messageForShow: "",
}

export const SessionSchema: DB_Session = {
  conversationID: "",
  toAccount: "",
  type: "C2C",
  subType: "",
  lastMessage,
  unreadCount: 0,
  peerReadTime: 0,
  groupAtInfoList: [],
  // groupProfile,
  userProfile: UserSchema,
  remark: "",
  isPinned: false,
  messageRemindType: "AcceptAndNotify",
  markList: [],
  customData: "",
  conversationGroupList: [],
  draftText: "",
  // ***************** Custom ***************** //
  topicId: "",
  pinned: 0,
  // **************** Base *************** //
  // id: "",
  // createdAt: 0,
  // updatedAt: 0,
}
