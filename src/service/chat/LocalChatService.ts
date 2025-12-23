import { ProvidersList } from "@database/config"
import { FilesModel } from "@/database/models/files"
import { MessageModel } from "@/database/models/message"
import { SessionModel } from "@/database/models/session"
import {
  MessageSchema as BaseElemMessage,
  SessionSchema as BaseElemSession,
  UserfileSchema as UserProfile,
} from "@/types"
import { delay, getUnixTimestampSec, getUnixTimestampSecPlusOne } from "@/utils/common"
import { clientS3Storage } from "@/service/file/ClientS3"
import { useTopicStore } from "@/stores/modules/topic"
import { localStg } from "@/utils/storage"
import { uuid } from "@/utils/uuid"
import { idGenerator } from "@/utils/idGenerator"
import emitter from "@/utils/mitt-bus"

import type { DB_Message, DB_Session, MessageType, payloadSchemaType, FilePayloadType } from "@/types"
import type {
  ChatSDK,
  MESSAGE_OPTIONS,
  TRANSLATE_TEXT_OPTIONS,
  GET_MESSAGE_LIST_OPTIONS,
  PIN_CONVERSATION_OPTIONS,
  DELETE_CONVERSATION_OPTIONS,
} from "@/types/tencent-cloud-chat"

type EventHandler<T = unknown> = (data: T) => void

interface LastMessageData {
  messageForShow?: string
  lastTime?: number
}

export class LocalChat {
  static instance: LocalChat | null = null
  private isInitialized = false

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
      this.isInitialized = false
      throw error
    }
  }

  /**
   * 排序会话列表
   * 排序规则：优先按 pinned 降序，其次按 lastMessage.lastTime 降序
   */
  private sortConversationList(list: DB_Session[]): DB_Session[] {
    return list.sort((a, b) => {
      const pinnedA = a.pinned ?? 0
      const pinnedB = b.pinned ?? 0
      if (pinnedA !== pinnedB) {
        return pinnedB - pinnedA
      }

      const lastTimeA = a.lastMessage?.lastTime ?? 0
      const lastTimeB = b.lastMessage?.lastTime ?? 0
      return lastTimeB - lastTimeA
    })
  }

  /**
   * 加载会话列表
   */
  async loadConversationList() {
    try {
      const list = await SessionModel.query()
      return this.sortConversationList(list)
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

  getMessageForShow(data: DB_Message) {
    if (data.type === "TIMTextElem") {
      return data.payload?.text || ""
    } else if (data.type === "TIMFileElem") {
      const filePayload = data.payload as FilePayloadType
      return `[文件] ${filePayload?.fileName ?? ""}`
    } else {
      return ""
    }
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
   * 批量删除消息里的文件附件
   */
  private async deleteFileAttachments(messages: DB_Message[]) {
    const fileIds = messages
      .filter((item) => item.type === "TIMFileElem")
      .map((item) => {
        const payload = item.payload as FilePayloadType
        return payload?.id
      })
      .filter((id): id is string => Boolean(id))

    if (fileIds.length > 0) {
      await FilesModel.bulkDelete(fileIds)
    }
  }

  /**
   * 发送消息
   */
  async sendMessage(data: DB_Message) {
    try {
      const messageForShow = this.getMessageForShow(data)
      await this.updateConversationLastMessage(data.conversationID, {
        messageForShow,
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
    return Promise.resolve({
      code: 0,
      data: UserProfile,
    })
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
    return new Promise((resolve) => {
      try {
        const userIDSet = new Set(userIDList) as Set<string>
        const data = ProvidersList.filter((item) => userIDSet.has(item.userID))

        resolve({
          code: 0,
          data: data,
        })
      } catch (error) {
        console.error("获取用户资料失败:", error)
        resolve({ code: -1, data: [] })
      }
    })
  }

  async getGroupList() {
    return new Promise((resolve) => {
      resolve({
        code: 0,
        data: {
          groupList: [],
        },
      })
    })
  }

  async getGroupMemberList() {
    return new Promise((resolve) => {
      resolve({
        code: 0,
        data: {
          offset: 0,
          memberList: [],
        },
      })
    })
  }

  // ==================== 消息创建 ====================

  /**
   * 创建基础消息结构
   */
  private createBaseMessage(data: MESSAGE_OPTIONS, type: MessageType, payload: payloadSchemaType): DB_Message {
    const { to, conversationType, cloudCustomData = "" } = data
    const currentTime = getUnixTimestampSecPlusOne()
    const topicStore = useTopicStore()

    const conversationID = `${conversationType}${to}`

    return {
      ...BaseElemMessage,
      ID: uuid(),
      time: currentTime,
      clientTime: currentTime,
      to,
      from: UserProfile.userID,
      avatar: UserProfile.avatar,
      conversationID,
      sessionId: conversationID,
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
    const id = idGenerator("files")
    clientS3Storage.putObject(id, payload.file)
    FilesModel.create(id, {
      origin_name: "",
      name: payload.file?.name,
      path: payload.path || "",
      created_at: new Date().toISOString(),
      size: payload.file?.size,
      ext: "",
      type: payload.file?.type,
      count: 1,
    })
    const filePayload = {
      id,
      uuid: `${UserProfile.userID}-${uuid()}`,
      fileName: payload.file?.name || "text.txt",
      fileSize: payload.file?.size || 0,
      filePath: payload.path || "",
      fileUrl: "",
      localPath: `client-s3://${id}`,
    } as FilePayloadType

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
      const session = BaseElemSession as DB_Session
      const data: DB_Session = {
        ...session,
        conversationID: chatId,
        lastMessage: {
          ...session.lastMessage,
          lastTime: getUnixTimestampSec(),
        },
        userProfile: ProvidersList.find((item) => item.userID === chatId.replace("C2C", "")),
      }

      await SessionModel.create(chatId, data)

      const list = await this.loadConversationList()

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
   * 置顶会话
   */
  async pinConversation({ conversationID, isPinned }: PIN_CONVERSATION_OPTIONS) {
    await SessionModel.update(conversationID, {
      isPinned,
    })
    const sessionList = await this.loadConversationList()
    this.emit("onConversationListUpdated", { data: sessionList })
    return { code: 0, data: {} }
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
      if (!messages || messages.length === 0) {
        return {
          code: 0,
          data: { messageList: [] },
        }
      }

      // 提取消息ID并批量删除
      const messageIds = messages.map((item) => item.ID).filter(Boolean)
      if (messageIds.length > 0) {
        await MessageModel.bulkDelete(messageIds)
      }

      await this.deleteFileAttachments(messages)

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
      if (data?.clearHistoryMessage) {
        await SessionModel.deleteWithRelations(ID)
      } else {
        await SessionModel.delete(ID)
      }
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

      const messages = await MessageModel.query({ sessionId, topicId: topicStore.topicId })

      await this.deleteFileAttachments(messages)

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

  destroy() {
    this.isInitialized = false
  }
}

export const localChat = LocalChat.getInstance()

export class LocalChatService {
  private static instance: LocalChatService
  private chat: ChatSDK | null = null

  private constructor() {}

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
