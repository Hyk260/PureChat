import sessions from "@/database/sessions.json";
import robotList from "@/database/bot.json";
import profile from "@/database/profile.json";
import timTextElem from "@/database/message/timTextElem.json";
import timCustomElem from "@/database/message/timCustomElem.json";

import emitter from "@/utils/mitt-bus";
import store from "@/store";

// import { browserDB } from "@/database/client/db";
import { uuid } from "@/utils/uuid";
import { nextTick } from "vue";
import { USER_MODEL } from "@/constants/index";
import { localStg } from "@/utils/storage";
import { cloneDeep } from "lodash-es";

import { SessionModel } from '@/database/models/session';
import { MessageModel } from '@/database/models/message';


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

function getTime() {
  return Math.round(new Date().getTime() / 1000);
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
    newData.map((t) => {
      if (t.conversationID === data.conversationID) {
        t.lastMessage.messageForShow = data.payload.text;
        t.lastMessage.lastTime = getTime();
      }
    });
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const message = {
          code: 0,
          data: {
            message: {
              ...data,
              time: getTime(),
              clientTime: getTime(),
              ID: data.ID || uuid(),
              status: "success",
            },
          },
        };
        this.emit("onConversationListUpdated", { data: [...newData] });
        this.emit("onMessageReceived", { data: [message.data.message] });
        resolve(message);
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
    return {
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
  }
  createCustomMessage(data) {
    const { to, conversationType, payload } = data;
    return {
      ...timCustomElem,
      ID: uuid(),
      time: getTime(),
      clientTime: getTime(),
      conversationType,
      conversationID: `${conversationType}${to}`,
      to: to,
      payload,
    };
  }
  async getConversationProfile(convId) {
    const data = cloneDeep(sessions);
    data.conversationID = convId;
    data.lastMessage.lastTime = getTime();
    data.userProfile = robotList.find((item) => item.userID == convId.replace("C2C", ""));
    SessionModel.create(convId, data);
    const index = getConversationList().findIndex((t) => {
      return convId == t.conversationID;
    });
    if (getConversationList()?.[0]) {
      if (index === -1) {
        this.emit("onConversationListUpdated", { data: [...getConversationList(), data] });
      } else {
        this.emit("onConversationListUpdated", { data: [...getConversationList()] });
      }
    } else {
      this.emit("onConversationListUpdated", { data: [data] });
    }

    return {
      code: 0,
      data: {
        conversation: {
          ...data,
        },
      },
    };
  }
  async getTotalUnreadMessageCount() {
    return 0;
  }
  async getMessageList(data) {
    const { conversationID } = data;
    const localMessageList = await MessageModel.query({ id: conversationID })
    debugger
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
    if (data.length === 1) {
      const { ID } = data[0];
      // browserDB.messages.delete(ID);
    }
    return {
      code: 0,
      data: { messageList: [] },
    };
  }
  async deleteConversation({ conversationIDList = [], clearHistoryMessage = false }) {
    const newData = getConversationList();
    const ID = conversationIDList[0];
    const messageList = [...newData.filter((item) => item.conversationID !== ID)];
    this.emit("onConversationListUpdated", { data: messageList });
    return {
      code: 0,
      data: { conversationID: ID },
    };
  }
}

const localChat = new LocalChat();

export default localChat;
