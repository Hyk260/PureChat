import { nextTick } from "vue";
import { getTime } from "@/utils/common";
import { uuid } from "@/utils/uuid";
import { useChatStore } from "@/stores/index";
import { USER_MODEL } from "@/constants/index";
import { localStg } from "@/utils/storage";
import { cloneDeep } from "lodash-es";
import { SessionModel } from "@/database/models/session";
import { MessageModel } from "@/database/models/message";
import { FilesModel } from "@/database/models/files";
import { ConversationList, UserProfile, BaseElemMessage, ProvidersList } from '@database/config';
import emitter from "@/utils/mitt-bus";

export class LocalChat {
  constructor() {
    this.initializeProxy()
    this.initialize();
  }
  initializeProxy() {
    return new Proxy(this, {
      set: (target, key, value) => Reflect.set(target, key, value),
      get: (target, key) => Reflect.get(target, key)
    });
  }
  initialize() {
    setTimeout(async () => {
      const list = await SessionModel.query();
      this.emit("sdkStateReady", { name: "sdkStateReady" });
      this.emit("onConversationListUpdated", { data: list });
    });
  }
  create(data) {
    localStg.set(USER_MODEL, { username: UserProfile.userID });
    console.log("create local chat", data);
    return new LocalChat();
  }
  on(eventName, handler, context = null) {
    const boundHandler = context ? handler.bind(context) : handler;
    emitter.on(eventName, boundHandler);
  }
  off(event, handler) {
    emitter.off(event, handler);
  }
  emit(eventName, handler) {
    emitter.emit(eventName, handler);
  }
  async sendMessage(data) {
    const session = await SessionModel.findById(data.conversationID);

    if (session) {
      const conversation = cloneDeep(session);
      conversation.lastMessage.messageForShow = data.payload.text;
      conversation.lastMessage.lastTime = getTime();
      SessionModel.update(data.conversationID, conversation);
    }

    const message = {
      ...data,
      time: getTime(),
      clientTime: getTime(),
      ID: data.ID || uuid(),
      status: "success",
    };

    return new Promise((resolve) => {
      setTimeout(async () => {
        const sessionList = await SessionModel.query();
        this.emit("onConversationListUpdated", { data: sessionList });
        this.emit("onMessageReceived", { data: [message] });
        resolve({ code: 0, data: { message } });
      }, 100);
    });
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
  async getUserProfile({ userIDList = [] }) {
    const data = ProvidersList.filter((item) => {
      return userIDList.find((id) => id === item.userID) !== undefined;
    });
    return {
      code: 0,
      data: data || [],
    };
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
  async createTextMessage(data) {
    const { to, conversationType, payload, cloudCustomData = "", cache } = data;
    const _data = {
      ...BaseElemMessage,
      time: getTime(),
      clientTime: getTime(),
      ID: uuid(),
      to: to,
      cloudCustomData,
      from: UserProfile.userID,
      avatar: UserProfile.avatar,
      conversationID: `${conversationType}${to}`,
      conversationType,
      payload,
      type: "TIMTextElem",
      version: __APP_INFO__.pkg.version || "0",
    };
    if (cache) MessageModel.create(_data.ID, _data);
    return _data;
  }
  async createFileMessage(data) {
    const { to, conversationType, payload } = data;
    const _data = {
      ...BaseElemMessage,
      time: getTime(),
      clientTime: getTime(),
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
    MessageModel.create(_data.ID, _data);
    return _data;
  }
  createCustomMessage(data) {
    const { to, conversationType, payload } = data;
    const _data = {
      ...BaseElemMessage,
      to: to,
      from: UserProfile.userID,
      payload,
      ID: uuid(),
      time: getTime(),
      clientTime: getTime(),
      conversationType,
      conversationID: `${conversationType}${to}`,
      type: "TIMCustomElem",
      version: __APP_INFO__.pkg.version || "0",
    };
    MessageModel.create(_data.ID, _data);
    return _data;
  }
  async getConversationProfile(chatId) {
    const data = cloneDeep(ConversationList);
    data.conversationID = chatId;
    data.lastMessage.lastTime = getTime();
    data.userProfile = ProvidersList.find((item) => item.userID === chatId.replace("C2C", ""));
    SessionModel.create(chatId, data);

    const list = await SessionModel.query(); // 获取会话列表
    const index = list.findIndex((t) => t.conversationID === chatId);

    if (index === -1) list.push(data);

    this.emit("onConversationListUpdated", { data: list });

    return {
      code: 0,
      data: {
        conversation: data,
      },
    };
  }
  async getTotalUnreadMessageCount() {
    return 0;
  }
  async getMessageList(data) {
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
  }
  async deleteMessage(data) {
    data.forEach((item) => MessageModel.delete(item.ID));
    return {
      code: 0,
      data: { messageList: [] },
    };
  }
  async deleteConversation({ conversationIDList = [], clearHistoryMessage = false }) {
    const list = await SessionModel.query();
    const [ID] = conversationIDList;
    const messageList = list.filter((item) => item.conversationID !== ID);
    this.emit("onConversationListUpdated", { data: messageList });
    await SessionModel.delete(ID);
    return {
      code: 0,
      data: { conversationID: ID },
    };
  }
  async clearHistoryMessage(sessionId) {
    const data = await MessageModel.query({ id: sessionId });
    data.forEach((item) => MessageModel.delete(item.ID));
    const sessionList = await SessionModel.query();
    const session = sessionList.find((t) => t.conversationID === sessionId);
    if (session) {
      const newSession = cloneDeep(session)
      newSession.lastMessage.messageForShow = '';
      SessionModel.update(sessionId, newSession);
      const messageList = await SessionModel.query();
      this.emit("onConversationListUpdated", { data: messageList });
    }
    return {
      data: { conversationID: sessionId },
      code: 0,
    };
  }
  async modifyMessage(data) {
    const payload = {
      payload: {
        text: data.payload.text,
      },
    }
    await MessageModel.update(data.ID, payload);
    this.emit("onMessageModified", { data: [data] });
    return {
      code: 0,
      data: { message: data },
    };
  }
  async logout() {
    return {
      code: 0,
      data: { message: {} },
    };
  }
}

export const localChat = new LocalChat();
