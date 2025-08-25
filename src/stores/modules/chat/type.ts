import type { DB_Message } from "@/database/schemas/message"
import type { DB_Session } from "@/database/schemas/session"

export interface ChatState {
  historyMessageList: Map<string, DB_Message[]>
  currentMessageList: DB_Message[]
  currentConversation: DB_Session | null
  conversationList: DB_Session[]
  searchConversationList: DB_Message[]
  filterConversationList: DB_Message[]
  totalUnreadMsg: number
  scrollTopID: string
  isMultiSelectMode: boolean
  noMore: boolean
  isChatBoxVisible: boolean
  isMentionModalVisible: boolean
  isFullscreenInputActive: boolean
  isChatSessionListCollapsed: boolean
  replyMsgData: DB_Message | null
  msgEdit: DB_Message | null
  recently: Set<string>
  chatDraftMap: Map<string, string>
  forwardData: Map<string, DB_Message>
  revokeMsgMap: Map<string, any>
  sendingMap: Map<string, any>
  selectedMessageMap: Map<string, any>
  selectedMessageIds: Set<string>
}
