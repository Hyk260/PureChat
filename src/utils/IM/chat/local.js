import conversationProfile from '@/assets/db/conversationProfile.json';
import robotList from '@/assets/db/robotList.json';
import myProfile from '@/assets/db/myProfile.json';
import timTextElem from '@/assets/db/message/timTextElem.json';
import timCustomElem from '@/assets/db/message/timCustomElem.json';
import { localStg } from "@/utils/storage";
import { nanoid } from "@/ai/platforms/ollama/protocol";
import emitter from "@/utils/mitt-bus";
import { USER_MODEL } from "@/constants/index";
import store from "@/store";
import { cloneDeep } from "lodash-es";

export function getConversationList() {
  const list = store.state.conversation?.conversationList;
  return cloneDeep(list) || null; // []
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
    localStg.set(USER_MODEL, { username: myProfile.userID })
    setTimeout(() => {
      this.emit("sdkStateReady", { name: 'sdkStateReady' })
    })
  }
  getTime() {
    return Math.round(new Date().getTime() / 1000)
  }
  create(data) {
    console.log('create local chat', data)
    this.init()
    return this
  }
  on(eventName, handler, contextopt = null) {
    const boundHandler = contextopt ? handler.bind(contextopt) : handler;
    emitter.on(eventName, boundHandler)
  }
  emit(eventName, handler) {
    emitter.emit(eventName, handler)
  }
  async sendMessage(data) {
    const newData = getConversationList()
    newData.map(t => {
      if (t.conversationID === data.conversationID) {
        t.lastMessage.messageForShow = data.payload.text
      }
    })
    this.emit('onConversationListUpdated', { data: [...newData] })

    const message = {
      code: 0,
      data: {
        message: {
          ...data,
          ID: data.ID || nanoid(16),
          status: "success",
        }
      }
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(message)
      }, 100)
    })
  }
  async getLoginUser() {
    return myProfile.userID
  }
  async getMyProfile() {
    return {
      code: 0,
      data: myProfile
    }
  }
  async getUserProfile({ userIDList = [] }) {
    const data = robotList.filter(item => {
      return userIDList.find(id => id === item.userID) !== undefined;
    });
    return {
      code: 0,
      data: data || []
    }
  }
  async getGroupList() {
    return {
      code: 0,
      data: {
        groupList: []
      }
    }
  }
  async getGroupMemberList() {
    return {
      code: 0,
      data: {
        offset: 0,
        memberList: []
      }
    }
  }
  createTextMessage(data) {
    const { to, conversationType, payload } = data
    return {
      ...timTextElem,
      time: this.getTime(),
      clientTime: this.getTime(),
      ID: nanoid(16),
      to: to,
      conversationID: `${conversationType}${to}`,
      conversationType,
      payload
    }
  }
  createCustomMessage(data) {
    const { to, conversationType, payload } = data
    return {
      ...timCustomElem,
      ID: nanoid(16),
      time: this.getTime(),
      clientTime: this.getTime(),
      conversationType,
      conversationID: `${conversationType}${to}`,
      to: to,
      payload
    }
  }
  async getConversationProfile(convId) {
    const data = cloneDeep(conversationProfile)
    data.conversationID = convId
    data.lastMessage.lastTime = this.getTime()
    data.userProfile = robotList.find(item => item.userID == convId.replace("C2C", ""))

    const index = getConversationList().findIndex(t => {
      return convId == t.conversationID
    })

    if (getConversationList()?.[0]) {
      if (index === -1) {
        this.emit('onConversationListUpdated', { data: [...getConversationList(), data] })
      } else {
        this.emit('onConversationListUpdated', { data: [...getConversationList()] })
      }
    } else {
      this.emit('onConversationListUpdated', { data: [data] })
    }

    return {
      code: 0,
      data: {
        conversation: {
          ...data
        }
      }
    };
  }
  async getTotalUnreadMessageCount() {
    return 0
  }
  async getMessageList() {
    return {
      code: 0,
      data: {
        nextReqMessageID: '',
        isCompleted: true,
        messageList: []
      }
    }
  }
}

const localChat = new LocalChat();

export default localChat