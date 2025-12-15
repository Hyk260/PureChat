import { ProvidersList } from "@database/config"
import { MessageModel } from "@/database/models/message"
import { SessionModel } from "@/database/models/session"
import {
  MessageSchema as BaseElemMessage,
  SessionSchema as BaseElemSession,
  UserfileSchema as UserProfile,
} from "@/types"
import { delay, getUnixTimestampSec, getUnixTimestampSecPlusOne } from "@/utils/common"
import { useTopicStore } from "@/stores/modules/topic"
import { localStg } from "@/utils/storage"
import { uuid } from "@/utils/uuid"
import emitter from "@/utils/mitt-bus"

import type { DB_Message, DB_Session, MessageType } from "@/types"
import type {
  ChatSDK,
  MESSAGE_OPTIONS,
  TRANSLATE_TEXT_OPTIONS,
  GET_MESSAGE_LIST_OPTIONS,
  DELETE_CONVERSATION_OPTIONS,
} from "@/types/tencent-cloud-chat"

type EventHandler<T = unknown> = (data: T) => void

interface LastMessageData {
  messageForShow?: string
  lastTime?: number
}

export class LocalChat {
  static instance: LocalChat | null = null
  isInitialized = false

  constructor() {
    if (LocalChat.instance) {
      throw new Error("LocalChat 是单例类，请使用 getInstance() 方法获取实例")
    }
    this.isInitialized = false
  }

  static getInstance(): LocalChat {
    if (!LocalChat.instance) {
      LocalChat.instance = new LocalChat()
    }
    return LocalChat.instance
  }

  /**
   * 初始化聊天系统
   */
  async initialize() {
    if (this.isInitialized) return

    try {
      const conversationList = await this.loadConversationList()

      this.isInitialized = true

      this.emit("sdkStateReady", { name: "sdkStateReady" })
      this.emit("onConversationListUpdated", { data: conversationList })
    } catch (error) {
      console.error("LocalChat 初始化失败:", error)
      throw error
    }
  }

  /**
   * 加载会话列表
   */
  async loadConversationList() {
    try {
      const list = await SessionModel.query()
      return list
    } catch (error) {
      console.error("加载会话列表失败:", error)
      return []
    }
  }

  /**
   * 创建聊天实例
   */
  create() {
    localStg.set("User-Model", { username: UserProfile.userID })
    return LocalChat.getInstance()
  }

  // ==================== 事件系统 ====================

  on<T = unknown>(eventName: string, handler: EventHandler<T>, context?: object) {
    const boundHandler = context ? handler.bind(context) : handler
    emitter.on(eventName, boundHandler)
  }

  off<T = unknown>(event: string, handler: EventHandler<T>) {
    emitter.off(event, handler)
  }

  emit<T = unknown>(eventName: string, data: T) {
    emitter.emit(eventName, data)
  }

  async updateConversationLastMessage(id: string, data: LastMessageData) {
    try {
      const session = await SessionModel.findById(id)
      if (!session) return

      const updatedSession: DB_Session = {
        ...session,
        lastMessage: {
          ...session.lastMessage,
          payload: session.lastMessage?.payload || { text: "" },
          messageForShow: data.messageForShow ?? "",
          lastTime: data.lastTime ?? getUnixTimestampSec(),
        },
      }
      await SessionModel.update(id, updatedSession)
    } catch (error) {
      console.error("updateConversationLastMessage:", error)
    }
  }

  /**
   * 发送消息
   */
  async sendMessage(data: DB_Message) {
    try {
      await this.updateConversationLastMessage(data.conversationID, {
        messageForShow: data.payload?.text,
      })

      const currentTime = getUnixTimestampSec()

      const message = {
        ...data,
        time: currentTime,
        clientTime: currentTime,
        ID: data.ID || uuid(),
        status: "success",
      }

      await delay(100)

      const sessionList = await this.loadConversationList()
      this.emit("onConversationListUpdated", { data: sessionList })
      this.emit("onMessageReceived", { data: [message] })

      return { code: 0, data: { message } }
    } catch (error) {
      console.error("发送消息失败:", error)
      return { code: -1, data: { message: null } }
    }
  }

  // ==================== 用户相关 ====================

  getLoginUser() {
    return UserProfile.userID
  }

  async getMyProfile() {
    await delay(10)
    return {
      code: 0,
      data: UserProfile,
    }
  }

  async translateText(data: TRANSLATE_TEXT_OPTIONS) {
    const { sourceTextList = [], sourceLanguage, targetLanguage } = data
    console.log("translateText", sourceTextList, sourceLanguage, targetLanguage)
    await delay(10)
    return { code: 0, data: { text: "翻译结果" } }
  }

  /**
   * 获取用户资料
   */
  async getUserProfile({ userIDList = [] }) {
    await delay(10)
    try {
      const userIDSet = new Set(userIDList) as Set<string>
      const data = ProvidersList.filter((item) => userIDSet.has(item.userID))

      return {
        code: 0,
        data: data || [],
      }
    } catch (error) {
      console.error("获取用户资料失败:", error)
      return { code: -1, data: [] }
    }
  }
  async getGroupList() {
    await delay(10)
    return {
      code: 0,
      data: {
        groupList: [],
      },
    }
  }
  async getGroupMemberList() {
    await delay(10)
    return {
      code: 0,
      data: {
        offset: 0,
        memberList: [],
      },
    }
  }

  // ==================== 消息创建 ====================

  /**
   * 创建基础消息结构
   */
  private createBaseMessage(data: MESSAGE_OPTIONS, type: MessageType, payload: DB_Message["payload"]): DB_Message {
    const { to, conversationType, cloudCustomData = "" } = data
    const currentTime = getUnixTimestampSecPlusOne()
    const topicStore = useTopicStore()

    return {
      ...BaseElemMessage,
      ID: uuid(),
      time: currentTime,
      clientTime: currentTime,
      to,
      from: UserProfile.userID,
      avatar: UserProfile.avatar,
      conversationID: `${conversationType}${to}`,
      sessionId: `${conversationType}${to}`,
      conversationType,
      cloudCustomData,
      payload,
      type,
      topicId: topicStore.topicId,
      version: __APP_INFO__.pkg.version || "0",
    } as DB_Message
  }

  /**
   * 创建文本消息
   */
  createTextMessage(data: MESSAGE_OPTIONS) {
    const message = this.createBaseMessage(data, "TIMTextElem", data.payload)

    if (data.cache) {
      MessageModel.create(message.ID, message)
    }

    return message
  }

  /**
   * 创建文件消息
   */
  createFileMessage(data: MESSAGE_OPTIONS) {
    const { payload } = data
    const filePayload = {
      fileName: payload.file?.name || "text.txt",
      fileSize: payload.file?.size || 0,
      filePath: payload.path || "",
      fileUrl: "",
      uuid: `${UserProfile.userID}-${uuid()}`,
    } as unknown as DB_Message["payload"]

    const message = this.createBaseMessage(data, "TIMFileElem", filePayload)
    MessageModel.create(message.ID, message)

    return message
  }

  /**
   * 创建自定义消息
   */
  createCustomMessage(data: MESSAGE_OPTIONS) {
    const message = this.createBaseMessage(data, "TIMCustomElem", data.payload)
    MessageModel.create(message.ID, message)

    return message
  }

  /**
   * 获取会话资料
   */
  async getConversationProfile(chatId: string) {
    try {
      const data: DB_Session = {
        ...(BaseElemSession as DB_Session),
        conversationID: chatId,
        lastMessage: {
          ...BaseElemSession.lastMessage,
          lastTime: getUnixTimestampSec(),
        },
        userProfile: ProvidersList.find((item) => item.userID === chatId.replace("C2C", "")),
      }

      SessionModel.create(chatId, data)

      const list = await this.loadConversationList()
      const index = list.findIndex((t) => t.conversationID === chatId)

      if (index === -1) list.push(data)

      this.emit("onConversationListUpdated", { data: list })

      return {
        code: 0,
        data: { conversation: data },
      }
    } catch (error) {
      console.error("获取会话资料失败:", error)
      return { code: -1, data: { conversation: null } }
    }
  }

  /**
   * 获取未读消息总数
   */
  getTotalUnreadMessageCount(): number {
    return 0
  }

  /**
   * 获取消息列表（分页）
   */
  async getMessageList(data: GET_MESSAGE_LIST_OPTIONS) {
    try {
      const { conversationID, nextReqMessageID, count = 20 } = data

      if (!conversationID) {
        throw new Error("会话ID不能为空")
      }
      const topicStore = useTopicStore()

      const result = await MessageModel.queryMessagesWithPagination({
        conversationID,
        nextReqMessageID,
        count,
        topicId: topicStore.topicId,
      })

      return {
        code: 0,
        data: {
          nextReqMessageID: result.nextReqMessageID,
          isCompleted: result.isCompleted,
          messageList: result.messages,
        },
      }
    } catch (error) {
      console.error("获取消息列表失败:", error)
      return {
        code: -1,
        data: {
          nextReqMessageID: "",
          isCompleted: false,
          messageList: [],
        },
      }
    }
  }

  async getMessageListHopping(_data = { conversationID: "", sequence: "", time: "", count: 15, direction: 0 }) {
    return new Promise((resolve) => {
      resolve({})
    })
  }

  /**
   * 批量删除消息
   */
  async deleteMessage(messages: DB_Message[]) {
    try {
      const deletePromises = messages.map((item) => MessageModel.delete(item.ID))

      await Promise.all(deletePromises)

      return {
        code: 0,
        data: { messageList: [] },
      }
    } catch (error) {
      console.error("删除消息失败:", error)
      return { code: -1, data: { messageList: [] } }
    }
  }

  /**
   * 删除会话
   */
  async deleteConversation(data: DELETE_CONVERSATION_OPTIONS) {
    try {
      const ID = data.conversationIDList[0] || ""
      if (!ID) {
        throw new Error("会话ID不能为空")
      }

      const list = await SessionModel.query()
      const messageList = list.filter((item) => item.conversationID !== ID)

      await SessionModel.delete(ID)
      this.emit("onConversationListUpdated", { data: messageList })

      return {
        code: 0,
        data: { conversationID: ID },
      }
    } catch (error) {
      console.error("删除会话失败:", error)
      return { code: -1, data: { conversationID: "" } }
    }
  }

  /**
   * 清空历史消息
   */
  async clearHistoryMessage(sessionId: string) {
    try {
      const topicStore = useTopicStore()

      await MessageModel.batchDelete(sessionId, topicStore.topicId)

      const sessionList = await SessionModel.query()
      const session = sessionList.find((t) => t.conversationID === sessionId)

      if (session) {
        const updatedSession: DB_Session = {
          ...session,
          lastMessage: {
            ...session.lastMessage,
            messageForShow: "",
            payload: session.lastMessage?.payload || { text: "" },
          },
        }
        await SessionModel.update(sessionId, updatedSession)
        const messageList = await SessionModel.query()
        this.emit("onConversationListUpdated", { data: messageList })
      }

      return {
        data: { conversationID: sessionId },
        code: 0,
      }
    } catch (error) {
      console.error("清空历史消息失败:", error)
      return { data: { conversationID: sessionId }, code: -1 }
    }
  }

  /**
   * 修改消息
   */
  async modifyMessage(data: DB_Message) {
    try {
      const payload = {
        // ...data,
        payload: {
          text: data.payload?.text ?? "",
        },
      } as DB_Message

      await MessageModel.update(data.ID, payload)

      this.emit("onMessageModified", { data: [data] })

      return {
        code: 0,
        data: { message: data },
      }
    } catch (error) {
      console.error("修改消息失败:", error)
      return { code: -1, data: { message: null } }
    }
  }

  /**
   * 登出
   */
  async logout() {
    await delay(10)
    this.isInitialized = false
    return {
      code: 0,
      data: { message: {} },
    }
  }
  destroy() {}
}

export const localChat = LocalChat.getInstance()

export class LocalChatService {
  private static instance: LocalChatService
  private chat: ChatSDK | null = null

  private constructor() {
    // 私有构造函数，防止外部直接实例化
  }

  public static getInstance(): LocalChatService {
    if (!LocalChatService.instance) {
      LocalChatService.instance = new LocalChatService()
    }
    return LocalChatService.instance
  }

  /**
   * 初始化
   */
  public initialize(): ChatSDK {
    if (this.chat) return this.chat

    this.chat = localChat.create() as unknown as ChatSDK
    return this.chat
  }
}

export const localChatService = LocalChatService.getInstance()
