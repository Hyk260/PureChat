import { BaseElemMessage, ConversationList, ProvidersList, UserProfile } from "@database/config"
import { cloneDeep } from "lodash-es"

import { MessageModel } from "@/database/models/message"
import { SessionModel } from "@/database/models/session"
import { DB_Message } from "@/database/schemas/message"
import { DB_Session } from "@/database/schemas/session"
import { getTime } from "@/utils/common"
import emitter from "@/utils/mitt-bus"
import { localStg } from "@/utils/storage"
import { uuid } from "@/utils/uuid"

import type { ChatSDK } from "./types/tencent-cloud-chat"

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

  /**
   * 注册事件监听器
   */
  on(eventName: string, handler: any, context = null) {
    const boundHandler = context ? handler.bind(context) : handler
    emitter.on(eventName, boundHandler)
  }

  /**
   * 移除事件监听器
   */
  off(event: string, handler: any) {
    emitter.off(event, handler)
  }

  /**
   * 触发事件
   */
  emit(eventName: string, handler: any) {
    emitter.emit(eventName, handler)
  }

  async updateConversationLastMessage(id, data) {
    try {
      const session = await SessionModel.findById(id)
      if (session) {
        const conversation = cloneDeep(session)
        conversation.lastMessage.messageForShow = data?.messageForShow || ""
        conversation.lastMessage.lastTime = data?.lastTime || getTime()
        await SessionModel.update(id, conversation)
      }
    } catch (error) {
      console.error("updateConversationLastMessage:", error)
    }
  }

  /**
   * 发送消息
   * @param {Object} data 消息数据
   * @param {string} data.conversationID 会话ID
   * @param {Object} data.payload 消息载荷
   * @param {string} data.payload.text 消息文本
   * @param {string} [data.ID] 消息ID
   * @returns {Promise<{code: number, data: {message: Object}}>} 发送结果
   */
  async sendMessage(data) {
    try {
      await this.updateConversationLastMessage(data.conversationID, {
        messageForShow: data.payload.text,
      })

      const message = {
        ...data,
        time: getTime(),
        clientTime: getTime(),
        ID: data.ID || uuid(),
        status: "success",
      }

      setTimeout(async () => {
        try {
          const sessionList = await this.loadConversationList()
          this.emit("onConversationListUpdated", { data: sessionList })
          this.emit("onMessageReceived", { data: [message] })
        } catch (error) {
          console.error("发送消息后处理失败:", error)
        }
      }, 0)

      return { code: 0, data: { message } }
    } catch (error) {
      console.error("发送消息失败:", error)
      return { code: -1, data: { message: null } }
    }
  }
  getLoginUser() {
    return UserProfile.userID
  }
  async getMyProfile() {
    return {
      code: 0,
      data: UserProfile,
    }
  }

  /**
   * 批量获取用户资料
   * @param {Object} params 参数对象
   * @param {string[]} [params.userIDList=[]] 用户ID列表
   * @returns {Promise<{code: number, data: Array}>} 用户资料列表
   */
  async getUserProfile({ userIDList = [] }) {
    try {
      const userIDSet = new Set(userIDList)
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
    return {
      code: 0,
      data: {
        groupList: [],
      },
    }
  }
  async getGroupMemberList() {
    return {
      code: 0,
      data: {
        offset: 0,
        memberList: [],
      },
    }
  }

  /**
   * 创建文本消息
   * @param {Object} data 消息数据
   * @param {string} data.to 接收方ID
   * @param {string} data.conversationType 会话类型
   * @param {Object} data.payload 消息载荷
   * @param {string} [data.cloudCustomData=""] 云端自定义数据
   * @param {boolean} [data.cache=false] 是否缓存到数据库
   * @returns {Promise<Object>} 消息对象
   */
  async createTextMessage(data) {
    const { to, conversationType, payload, cloudCustomData = "", cache } = data
    const currentTime = getTime()

    const messageData = {
      ...BaseElemMessage,
      time: currentTime,
      clientTime: currentTime,
      ID: uuid(),
      to,
      cloudCustomData,
      from: UserProfile.userID,
      avatar: UserProfile.avatar,
      conversationID: `${conversationType}${to}`,
      conversationType,
      payload,
      type: "TIMTextElem",
      version: __APP_INFO__.pkg.version || "0",
    }

    if (cache) MessageModel.create(messageData.ID, messageData)

    return messageData
  }

  /**
   * 创建文件消息
   * @param {Object} data 文件消息数据
   * @param {string} data.to 接收方ID
   * @param {string} data.conversationType 会话类型
   * @param {Object} data.payload 文件载荷
   * @param {File} data.payload.file 文件对象
   * @param {string} [data.payload.path] 文件路径
   * @returns {Promise<Object>} 文件消息对象
   */
  async createFileMessage(data) {
    const { to, conversationType, payload } = data
    const currentTime = getTime()

    const messageData = {
      ...BaseElemMessage,
      time: currentTime,
      clientTime: currentTime,
      ID: uuid(),
      to: to,
      from: UserProfile.userID,
      avatar: UserProfile.avatar,
      conversationID: `${conversationType}${to}`,
      conversationType,
      payload: {
        fileName: payload.file.name || "text.txt",
        fileSize: payload.file.size || 0,
        filePath: payload.path || "",
        fileUrl: "",
        uuid: `${UserProfile.userID}-${uuid()}`,
      },
      type: "TIMFileElem",
      version: __APP_INFO__.pkg.version || "0",
    }

    MessageModel.create(messageData.ID, messageData)

    return messageData
  }

  /**
   * 创建自定义消息
   * @param {Object} data 自定义消息数据
   * @param {string} data.to 接收方ID
   * @param {string} data.conversationType 会话类型
   * @param {Object} data.payload 消息载荷
   * @returns {Object} 自定义消息对象
   */
  createCustomMessage(data) {
    const { to, conversationType, payload } = data
    const currentTime = getTime()

    const messageData = {
      ...BaseElemMessage,
      to: to,
      from: UserProfile.userID,
      payload,
      ID: uuid(),
      time: currentTime,
      clientTime: currentTime,
      conversationType,
      conversationID: `${conversationType}${to}`,
      type: "TIMCustomElem",
      version: __APP_INFO__.pkg.version || "0",
    }

    MessageModel.create(messageData.ID, messageData)

    return messageData
  }

  /**
   * 获取会话资料
   * @param {string} chatId 聊天ID
   * @returns {Promise<{code: number, data: {conversation: Object}}>} 会话资料
   */
  async getConversationProfile(chatId) {
    try {
      const data = cloneDeep(ConversationList)
      data.conversationID = chatId
      data.lastMessage.lastTime = getTime()
      data.userProfile = ProvidersList.find((item) => item.userID === chatId.replace("C2C", ""))
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
   * 获取消息列表
   */
  async getMessageList(data) {
    try {
      const { conversationID: id, nextReqMessageID = "" } = data
      const messageList = await MessageModel.query({ id })

      return {
        code: 0,
        data: {
          nextReqMessageID: "",
          isCompleted: false,
          messageList: messageList,
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
  async deleteConversation({ conversationIDList = [], clearHistoryMessage = false }) {
    try {
      const [ID] = conversationIDList

      const list = await SessionModel.query()
      const messageList = list.filter((item) => item.conversationID !== ID)

      this.emit("onConversationListUpdated", { data: messageList })
      await SessionModel.delete(ID)

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
      const data = (await MessageModel.query({ id: sessionId })) as DB_Message[]

      const deletePromises = data.map((item) => {
        return MessageModel.delete(item.ID)
      })

      await Promise.all(deletePromises)

      const sessionList = await SessionModel.query()
      const session = sessionList.find((t) => t.conversationID === sessionId)

      if (session) {
        const newSession = cloneDeep(session) as DB_Session
        newSession.lastMessage.messageForShow = ""
        await SessionModel.update(sessionId, newSession)
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
        payload: {
          text: data.payload.text,
        },
      }

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
    try {
      this.isInitialized = false

      return {
        code: 0,
        data: { message: {} },
      }
    } catch (error) {
      console.error("登出失败:", error)
      return { code: -1, data: { message: {} } }
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
