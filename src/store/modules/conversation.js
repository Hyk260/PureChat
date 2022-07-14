import { CONVERSATIONTYPE } from '../mutation-types'

const conversation = {
  // namespaced: true,
  state:{
    historyMessageList: new Map(),//历史消息
    currentMessageList:[],//当前消息列表
    noMore:true, // 加载更多  false ? 显示loading : 没有更多
  },
  mutations:{
    // 设置历史消息
    SET_HISTORYMESSAGE(state,action){
      const { type, payload } = action
      switch (type) {
        // 更新消息
        case CONVERSATIONTYPE.UPDATE_MESSAGES: {
          console.log(payload)
          const { convId, message } = payload
          state.currentMessageList.unshift(message)
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
        // 接收消息
        case CONVERSATIONTYPE.RECIVE_MESSAGE: {
          const { convId, message } = payload
          state.currentMessageList = message;
          break;
        }
      }
    }
  }
}

export default conversation