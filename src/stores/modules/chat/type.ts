import type { DraftData } from "@pure/editor/types"
import type { DB_Message, DB_Session } from "@pure/database/schemas"

export interface ChatState {
  /** 当前会话id */
  sessionId: string
  /** 历史消息 */
  historyMessageList: Map<string, DB_Message[]>
  /** 当前消息列表(窗口聊天消息) */
  currentMessageList: DB_Message[]
  /** 跳转窗口的属性 */
  currentConversation: DB_Session | null
  /** 会话列表数据 */
  conversationList: DB_Session[]
  /** 搜索后的会话列表 */
  searchConversationList: DB_Session[] | null
  /** 未读消息总数 */
  totalUnreadMsg: number
  /** 滚动到的消息ID */
  scrollTopID: string
  /** 是否多选模式 */
  isMultiSelectMode: boolean
  /** 加载更多 false ? 显示loading : 没有更多 */
  noMore: boolean
  /** 聊天框是否显示 */
  isChatBoxVisible: boolean
  /** @成员弹窗 */
  isMentionModalVisible: boolean
  /** 是否全屏输入框 */
  isFullscreenInputActive: boolean
  /** 是否折叠会话列表 */
  isChatSessionListCollapsed: boolean
  /** 回复消息数据 */
  replyMsgData: DB_Message | null
  /** 消息编辑 */
  msgEdit: DB_Message | null
  /** 最近使用表情包 */
  recently: Set<string>
  /** 会话草稿 */
  chatDraftMap: Map<string, DraftData>
  /** 多选数据 */
  forwardData: Map<string, DB_Message>
  /** 撤回消息重新编辑 */
  revokeMsgMap: Map<string, any>
  sendingMap: Map<string, boolean>
  /** 多选消息 */
  selectedMessageMap: Map<string, any>
  /** 选中的消息ID集合 */
  selectedMessageIds: Set<string>
}
