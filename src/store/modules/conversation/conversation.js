const conversationModules = {
  state:{
    historyMessageList: new Map(),//历史消息
  },
  mutations:{
    // 设置历史消息
    SET_HISTORYMESSAGE(state,action){
      const { type, payload } = action
      switch (type) {
        case 'UPDATE_MESSAGES': {
          console.log(123)
        }
      }
    }
  }
}

export default conversationModules