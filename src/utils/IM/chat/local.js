import conversationProfile from '@/assets/db/conversationProfile.json';
import robotList from '@/assets/db/robotList.json';
import emitter from "@/utils/mitt-bus";

export class LocalChat {
  constructor() { }
  create(data) {
    console.log('create local chat', data)
    return this
  }
  on(eventName, handler, contextopt) {
    console.log('on local chat', eventName, handler, contextopt)
    // handler()
    // emitter.on(eventName, handler)
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
  async getConversationProfile(convId) {
    const data = conversationProfile[0]
    data.conversationID = convId
    data.userProfile = robotList.find(item => item.userID == convId.replace("C2C", ""))
    return { code: 0, data: { conversation: { ...data } } };
  }
}



export default new LocalChat();