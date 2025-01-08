import sessions from "@/database/sessions.json";
import robotList from "@/database/bot.json";
import profile from "@/database/profile.json";
import timTextElem from "@/database/message/timTextElem.json";
import timCustomElem from "@/database/message/timCustomElem.json";

import emitter from "@/utils/mitt-bus";
import store from "@/store";
import { getTime } from "@/utils/common";

import { uuid } from "@/utils/uuid";
import { nextTick } from "vue";
import { USER_MODEL } from "@/constants/index";
import { localStg } from "@/utils/storage";
import { cloneDeep } from "lodash-es";

import { SessionModel } from "@/database/models/session";
import { MessageModel } from "@/database/models/message";

export function getConversationList() {
  const list = store.state.conversation?.conversationList;
  return cloneDeep(list) || null; // []
}

export function getCurrentMessageList() {
  const list = store.state.conversation?.currentMessageList;
  return cloneDeep(list) || null; // []
}

export function getHistoryMessageList(id) {
  const data = store.state.conversation?.historyMessageList.get(id);
  return cloneDeep(data) || null; // []
}

export class LocalChat {
  constructor() {
    window.LocalChat = new Proxy(this, {
      set(target, key, val) {
        return Reflect.set(target, key, val);
      },
      get(target, key) {
        return Reflect.get(target, key);
      },
    });
    window.MessageModel = MessageModel
    window.SessionModel = SessionModel
  }
  init() {
    localStg.set(USER_MODEL, { username: profile.userID });
    setTimeout(() => {
      this.emit("sdkStateReady", { name: "sdkStateReady" });
    });
  }
  create(data) {
    console.log("create local chat", data);
    this.init();
    return this;
  }
  on(eventName, handler, contextopt = null) {
    const boundHandler = contextopt ? handler.bind(contextopt) : handler;
    emitter.on(eventName, boundHandler);
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
      setTimeout(() => {
        this.emit("onConversationListUpdated", { data: [...newData] });
        this.emit("onMessageReceived", { data: [message] });
        resolve({ code: 0, data: { message } });
      }, 300);
    });
  }
  async getLoginUser() {
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
    const { to, conversationType, payload } = data;
    const _data = {
      ...timTextElem,
      time: getTime(),
      clientTime: getTime(),
      ID: uuid(),
      to: to,
      avatar: profile.avatar,
      conversationID: `${conversationType}${to}`,
      conversationType,
      payload,
    };
    MessageModel.create(_data.ID, _data);
    return _data
  }
  createCustomMessage(data) {
    const { to, conversationType, payload } = data;
    const _data = {
      ...timCustomElem,
      to: to,
      payload,
      ID: uuid(),
      time: getTime(),
      clientTime: getTime(),
      conversationType,
      conversationID: `${conversationType}${to}`,
    }
    MessageModel.create(_data.ID, _data);
    return _data
  }
  async getConversationProfile(convId) {
    const data = cloneDeep(sessions);
    data.conversationID = convId;
    data.lastMessage.lastTime = getTime();
    data.userProfile = robotList.find((item) => item.userID === convId.replace("C2C", ""));
    SessionModel.create(convId, data);

    const conversationList = getConversationList() || [];
    const index = conversationList.findIndex((t) => t.conversationID === convId);

    if (index === -1) conversationList.push(data);

    this.emit("onConversationListUpdated", { data: conversationList });

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
    data.forEach((item) => { MessageModel.delete(item.ID); });

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
}

const localChat = new LocalChat();

export default localChat;
