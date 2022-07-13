import { CONVERSATIONTYPE } from '../mutation-types'

const conversationModules = {
  state:{
    historyMessageList: new Map(),//历史消息
    currentMessageList:[],//当前消息列表
  },
  mutations:{
    // 设置历史消息
    SET_HISTORYMESSAGE(state,action){
      const { type, payload } = action
      switch (type) {
        // 更新消息
        case CONVERSATIONTYPE.UPDATE_MESSAGES: {
          console.log(payload)
          break;
        }
        // 删除消息
        case CONVERSATIONTYPE.DELETE_MESSAGE: {
          console.log(payload)
          break;
        }
        // 清除历史记录
        case CONVERSATIONTYPE.CLEAR_HISTORY: {
          state.historyMessageList = new Map()
          state.currentMessageList = []
          break;
        }
      }
    }
  }
}

export default conversationModules