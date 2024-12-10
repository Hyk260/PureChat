import conversationProfile from '@/assets/db/conversationProfile.json';
import robotList from '@/assets/db/robotList.json';
import timTextElem from '@/assets/db/message/timTextElem.json';
import emitter from "@/utils/mitt-bus";

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
  create(data) {
    console.log('create local chat', data)
    return this
  }
  on(eventName, handler, contextopt = null) {
    const boundHandler = contextopt ? handler.bind(contextopt) : handler;
    emitter.on(eventName, boundHandler)
  }
  emit(eventName, handler) {
    emitter.emit(eventName, handler)
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
    const { to, conversationType, payload, cloudCustomData } = data
    const { text } = payload
    return {
      ...timTextElem,
      payload: {
        text: text
      }
    }
  }
  async getConversationProfile(convId) {
    const data = conversationProfile[0]
    data.conversationID = convId
    data.userProfile = robotList.find(item => item.userID == convId.replace("C2C", ""))
    this.emit('onConversationListUpdated', {
      data: conversationProfile
    })
    return { code: 0, data: { conversation: { ...data } } };
  }
}

const localChat = new LocalChat();

export default localChat