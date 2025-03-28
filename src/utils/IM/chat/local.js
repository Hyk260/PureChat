import { nextTick } from "vue";
import { getTime } from "@/utils/common";
import { uuid } from "@/utils/uuid";
import { useChatStore } from "@/stores/index";
import { USER_MODEL } from "@/constants/index";
import { localStg } from "@/utils/storage";
import { cloneDeep } from "lodash-es";
import { SessionModel } from "@/database/models/session";
import { MessageModel } from "@/database/models/message";
import sessions from "@/database/sessions.json";
import robotList from "@/database/bot.json";
import profile from "@/database/profile.json";
import timTextElem from "@/database/message/timTextElem.json";
import timCustomElem from "@/database/message/timCustomElem.json";
import emitter from "@/utils/mitt-bus";
import store from "@/store";

export function getConversationList() {
  const list = useChatStore().conversationList;
  return cloneDeep(list) || [];
}

export function getCurrentMessageList() {
  const list = useChatStore().currentMessageList;
  return cloneDeep(list) || null; // []
}

export function getHistoryMessageList(id) {
  const data = useChatStore().historyMessageList.get(id);
  return cloneDeep(data) || null; // []
}

export class LocalChat {
  constructor() {
    this.initializeProxy()
  }
  initializeSDK() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.emit('sdkStateReady', { name: 'sdkStateReady' });
        resolve();
      }, 0);
    });
  }
  initializeProxy() {
    return new Proxy(this, {
      set: (target, key, value) => Reflect.set(target, key, value),
      get: (target, key) => Reflect.get(target, key)
    });
  }
  initialize() {
    localStg.set(USER_MODEL, { username: profile.userID });
    setTimeout(async () => {
      this.emit("sdkStateReady", { name: "sdkStateReady" });
      const _newData = await SessionModel.query();
      this.emit("onConversationListUpdated", { data: _newData });
    });
  }
  create(data) {
    console.log("create local chat", data);
    this.initialize();
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
    const newData = getConversationList();
    const conversation = newData.find((t) => t.conversationID === data.conversationID);

    if (conversation) {
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
        const _newData = await SessionModel.query();
        this.emit("onConversationListUpdated", { data: _newData });
        this.emit("onMessageReceived", { data: [message] });
        resolve({ code: 0, data: { message } });
      }, 100);
    });
  }
  getLoginUser() {
    return profile.userID;
  }
  async getMyProfile() {
    return {
      code: 0,
      data: profile,
    };
  }
  async getUserProfile({ userIDList = [] }) {
    const data = robotList.filter((item) => {
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
  createTextMessage(data) {
    const { to, conversationType, payload, cache } = data;
    const _data = {
      ...timTextElem,
      time: getTime(),
      clientTime: getTime(),
      ID: uuid(),
      to: to,
      from: profile.userID,
      avatar: profile.avatar,
      conversationID: `${conversationType}${to}`,
      conversationType,
      payload,
    };
    if (cache) MessageModel.create(_data.ID, _data);
    return _data;
  }
  createCustomMessage(data) {
    const { to, conversationType, payload } = data;
    const _data = {
      ...timCustomElem,
      to: to,
      from: profile.userID,
      payload,
      ID: uuid(),
      time: getTime(),
      clientTime: getTime(),
      conversationType,
      conversationID: `${conversationType}${to}`,
    };
    MessageModel.create(_data.ID, _data);
    return _data;
  }
  async getConversationProfile(chatId) {
    const data = cloneDeep(sessions);
    data.conversationID = chatId;
    data.lastMessage.lastTime = getTime();
    data.userProfile = robotList.find((item) => item.userID === chatId.replace("C2C", ""));
    SessionModel.create(chatId, data);

    const list = getConversationList();
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
    const { conversationID } = data;
    const localMessageList = await MessageModel.query({ id: conversationID });
    return {
      code: 0,
      data: {
        nextReqMessageID: "",
        isCompleted: true,
        messageList: localMessageList,
      },
    };
  }
  async deleteMessage(data) {
    data.forEach((item) => {
      MessageModel.delete(item.ID);
    });

    return {
      code: 0,
      data: { messageList: [] },
    };
  }
  async deleteConversation({ conversationIDList = [], clearHistoryMessage = false }) {
    const newData = getConversationList();
    const [ID] = conversationIDList;
    const messageList = newData.filter((item) => item.conversationID !== ID);
    this.emit("onConversationListUpdated", { data: messageList });
    await SessionModel.delete(ID);
    return {
      code: 0,
      data: { conversationID: ID },
    };
  }
  async modifyMessage(data) {
    await MessageModel.update(data.ID, {
      payload: {
        text: data.payload.text,
      },
    });
    this.emit("onMessageModified", { data: [data] });
    return {
      code: 0,
      data: { message: data },
    };
  }
}

export const localChat = new LocalChat();
