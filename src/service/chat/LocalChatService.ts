import type { ChatSDK, CREATE_OPTIONS } from './types/tencent-cloud-chat';
import { cloneDeep } from "lodash-es";
import { getTime } from "@/utils/common";
import { uuid } from "@/utils/uuid";
import { localStg } from "@/utils/storage";
import { SessionModel } from "@/database/models/session";
import { MessageModel } from "@/database/models/message";
import { ConversationList, UserProfile, BaseElemMessage, ProvidersList } from '@database/config';
import emitter from "@/utils/mitt-bus";

export class LocalChatService {
  private static instance: LocalChatService | null = null

  constructor() {

  }

  public static getInstance(): LocalChatService {
    if (!LocalChatService.instance) {
      LocalChatService.instance = new LocalChatService();
    }
    return LocalChatService.instance;
  }

  async initialize() {
    try {      
      const conversationList = await this.loadConversationList();

      this.emit("sdkStateReady", { name: "sdkStateReady" });
      this.emit("onConversationListUpdated", { data: conversationList });

      return this.create({});
    } catch (error) {
      console.error("LocalChatService 初始化失败:", error);
      throw error;
    }
  }

  /**
   * 创建聊天实例
   */
  create(data): ChatSDK {
    localStg.set("User-Model", { username: UserProfile.userID });
    console.log("create local chat", data);
    return LocalChatService.getInstance();
  }

  async stateReady() {
    debugger
    const conversationList = await this.loadConversationList();

    this.emit("sdkStateReady", { name: "sdkStateReady" });
    this.emit("onConversationListUpdated", { data: conversationList });
  }

  /**
   * 加载会话列表
   * @private
   * @returns {Promise<Array>} 会话列表
   */
  async loadConversationList() {
    try {
      const list = await SessionModel.query();
      return list;
    } catch (error) {
      console.error("加载会话列表失败:", error);
      return [];
    }
  }

  /**
   * 注册事件监听器
   * @param {string} eventName 事件名称
   * @param {Function} handler 处理函数
   * @param {Object} [context=null] 上下文对象
   */
  on(eventName, handler, context = null) {
    const boundHandler = context ? handler.bind(context) : handler;
    emitter.on(eventName, boundHandler);
  }

  /**
   * 移除事件监听器
   * @param {string} eventName 事件名称
   * @param {Function} handler 处理函数
   */
  off(event, handler) {
    emitter.off(event, handler);
  }

  emit(eventName, handler) {
    emitter.emit(eventName, handler);
  }

  async updateConversationLastMessage(id, data) {
    try {
      const session = await SessionModel.findById(id);
      if (session) {
        const conversation = cloneDeep(session);
        conversation.lastMessage.messageForShow = data?.messageForShow || "";
        conversation.lastMessage.lastTime = data?.lastTime || getTime();
        await SessionModel.update(id, conversation);
      }
    } catch (error) {
      console.error("updateConversationLastMessage:", error);
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
      });

      const message = {
        ...data,
        time: getTime(),
        clientTime: getTime(),
        ID: data.ID || uuid(),
        status: "success",
      };

      setTimeout(async () => {
        try {
          const sessionList = await this.loadConversationList();
          this.emit("onConversationListUpdated", { data: sessionList });
          this.emit("onMessageReceived", { data: [message] });
        } catch (error) {
          console.error("发送消息后处理失败:", error);
        }
      }, 0);

      return { code: 0, data: { message } };
    } catch (error) {
      console.error("发送消息失败:", error);
      return { code: -1, data: { message: null } };
    }
  }
  getLoginUser() {
    return UserProfile.userID;
  }
  async getMyProfile() {
    return {
      code: 0,
      data: UserProfile,
    };
  }

  /**
   * 批量获取用户资料
   * @param {Object} params 参数对象
   * @param {string[]} [params.userIDList=[]] 用户ID列表
   * @returns {Promise<{code: number, data: Array}>} 用户资料列表
   */
  async getUserProfile({ userIDList = [] }) {
    try {
      const userIDSet = new Set(userIDList);
      const data = ProvidersList.filter(item => userIDSet.has(item.userID));

      return {
        code: 0,
        data: data || [],
      };
    } catch (error) {
      console.error("获取用户资料失败:", error);
      return { code: -1, data: [] };
    }
  }
  async getGroupList() {
    return {
      code: 0,
      data: {
        groupList: [],
      },
    };
  }
  async getGroupMemberList() {
    return {
      code: 0,
      data: {
        offset: 0,
        memberList: [],
      },
    };
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
    const { to, conversationType, payload, cloudCustomData = "", cache } = data;
    const currentTime = getTime();

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
    };

    if (cache) MessageModel.create(messageData.ID, messageData);

    return messageData;
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
    const { to, conversationType, payload } = data;
    const currentTime = getTime();

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
        fileName: payload.file.name || 'text.txt',
        fileSize: payload.file.size || 0,
        filePath: payload.path || '',
        fileUrl: '',
        uuid: `${UserProfile.userID}-${uuid()}`,
      },
      type: "TIMFileElem",
      version: __APP_INFO__.pkg.version || "0",
    };

    MessageModel.create(messageData.ID, messageData);

    return messageData;
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
    const { to, conversationType, payload } = data;
    const currentTime = getTime();

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
    };

    MessageModel.create(messageData.ID, messageData);

    return messageData;
  }

  /**
   * 获取会话资料
   * @param {string} chatId 聊天ID
   * @returns {Promise<{code: number, data: {conversation: Object}}>} 会话资料
   */
  async getConversationProfile(chatId) {
    try {
      const data = cloneDeep(ConversationList);
      data.conversationID = chatId;
      data.lastMessage.lastTime = getTime();
      data.userProfile = ProvidersList.find((item) => item.userID === chatId.replace("C2C", ""));
      SessionModel.create(chatId, data);

      const list = await this.loadConversationList();
      const index = list.findIndex((t) => t.conversationID === chatId);

      if (index === -1) list.push(data);

      this.emit("onConversationListUpdated", { data: list });

      return {
        code: 0,
        data: { conversation: data, },
      };
    } catch (error) {
      console.error("获取会话资料失败:", error);
      return { code: -1, data: { conversation: null } };
    }
  }

  /**
   * 获取未读消息总数
   * @returns {Promise<number>} 未读消息数
   */
  async getTotalUnreadMessageCount() {
    return 0;
  }

  /**
   * 获取消息列表
   * @param {Object} data 查询参数
   * @param {string} data.conversationID 会话ID
   * @param {string} [data.nextReqMessageID=""] 下一页消息ID
   * @returns {Promise<{code: number, data: {nextReqMessageID: string, isCompleted: boolean, messageList: Array}}>} 消息列表
   */
  async getMessageList(data) {
    try {
      const { conversationID: id, nextReqMessageID = "" } = data;
      const messageList = await MessageModel.query({ id });

      return {
        code: 0,
        data: {
          nextReqMessageID: "",
          isCompleted: false,
          messageList: messageList,
        },
      };
    } catch (error) {
      console.error("获取消息列表失败:", error);
      return {
        code: -1,
        data: {
          nextReqMessageID: "",
          isCompleted: false,
          messageList: [],
        },
      };
    }
  }

  /**
   * 批量删除消息
   * @param {Array<{ID: string}>} messages 要删除的消息列表
   * @returns {Promise<{code: number, data: {messageList: Array}}>} 删除结果
   */
  async deleteMessage(messages) {
    try {
      const deletePromises = messages.map(async (item) => {
        return MessageModel.delete(item.ID);
      });

      await Promise.all(deletePromises);

      return {
        code: 0,
        data: { messageList: [] },
      };
    } catch (error) {
      console.error("删除消息失败:", error);
      return { code: -1, data: { messageList: [] } };
    }
  }

  /**
   * 删除会话
   * @param {Object} params 删除参数
   * @param {string[]} [params.conversationIDList=[]] 会话ID列表
   * @param {boolean} [params.clearHistoryMessage=false] 是否清空历史消息
   * @returns {Promise<{code: number, data: {conversationID: string}}>} 删除结果
   */
  async deleteConversation({ conversationIDList = [], clearHistoryMessage = false }) {
    try {
      const [ID] = conversationIDList;

      const list = await SessionModel.query();
      const messageList = list.filter(item => item.conversationID !== ID);

      this.emit("onConversationListUpdated", { data: messageList });
      await SessionModel.delete(ID);

      return {
        code: 0,
        data: { conversationID: ID },
      };
    } catch (error) {
      console.error("删除会话失败:", error);
      return { code: -1, data: { conversationID: "" } };
    }
  }

  /**
   * 清空历史消息
   * @param {string} sessionId 会话ID
   * @returns {Promise<{data: {conversationID: string}, code: number}>} 清空结果
   */
  async clearHistoryMessage(sessionId) {
    try {
      const data = await MessageModel.query({ id: sessionId });

      const deletePromises = data.map(item => {
        return MessageModel.delete(item.ID);
      });

      await Promise.all(deletePromises);

      const sessionList = await SessionModel.query();
      const session = sessionList.find(t => t.conversationID === sessionId);

      if (session) {
        const newSession = cloneDeep(session);
        newSession.lastMessage.messageForShow = '';
        await SessionModel.update(sessionId, newSession);
        const messageList = await SessionModel.query();
        this.emit("onConversationListUpdated", { data: messageList });
      }

      return {
        data: { conversationID: sessionId },
        code: 0,
      };
    } catch (error) {
      console.error("清空历史消息失败:", error);
      return { data: { conversationID: sessionId }, code: -1 };
    }
  }

  /**
   * 修改消息
   * @param {Object} data 修改的消息数据
   * @param {string} data.ID 消息ID
   * @param {Object} data.payload 消息载荷
   * @param {string} data.payload.text 消息文本
   * @returns {Promise<{code: number, data: {message: Object}}>} 修改结果
   */
  async modifyMessage(data) {
    try {
      const payload = {
        payload: {
          text: data.payload.text,
        },
      };

      await MessageModel.update(data.ID, payload);

      this.emit("onMessageModified", { data: [data] });

      return {
        code: 0,
        data: { message: data },
      };
    } catch (error) {
      console.error("修改消息失败:", error);
      return { code: -1, data: { message: null } };
    }
  }

  /**
   * 登出
   * @returns {Promise<{code: number, data: {message: Object}}>} 登出结果
   */
  async logout() {
    try {
      return {
        code: 0,
        data: { message: {} },
      };
    } catch (error) {
      console.error("登出失败:", error);
      return { code: -1, data: { message: {} } };
    }
  }
}

export const localChatService = new LocalChatService();
