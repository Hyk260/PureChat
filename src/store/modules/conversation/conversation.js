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
        case 'UPDATE_MESSAGES': {
          console.log(payload)
        }
      }
    }
  }
}

export default conversationModules