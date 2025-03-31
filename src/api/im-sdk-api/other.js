import tim from "@/utils/IM/im-sdk/tim";

// 获取 SDK 缓存的好友列表
export const getFriendList = async (params) => {
  return tim.getFriendList();
};

// 删除消息 https://web.sdk.qcloud.com/im/doc/v3/zh-cn/SDK.html#deleteMessage
export const deleteMessage = async (params) => {
  const {
    code,
    data: { messageList },
  } = await tim.deleteMessage(params);
  return {
    code,
    messageList,
  };
};
// 会话顶置
export const pinConversation = async (params) => {
  const { conversationID, isPinned } = params;
  const result = await tim.pinConversation({
    conversationID,
    isPinned: !isPinned,
  });
  return result;
};
// 撤回消息
export const revokeMsg = async (params) => {
  const {
    code,
    data: { message },
  } = await tim.revokeMessage(params);
  return {
    code,
    message,
  };
};
// 消息免打扰
export const setMessageRemindType = async (params) => {
  const { toAccount: userID, messageRemindType: remindType, type } = params;
  let parameter = {};
  let isDisable = remindType === "AcceptNotNotify";
  if (type === "C2C") {
    // 单人会话
    parameter = {
      userIDList: [userID],
      messageRemindType: isDisable ? "" : "AcceptNotNotify",
    };
  } else {
    // 群聊
    parameter = {
      groupID: userID,
      // TIM.TYPES.MSG_REMIND_ACPT_AND_NOTE  "AcceptAndNotify"
      // （SDK 接收消息并通知接入侧，接入侧做提示）
      // TIM.TYPES.MSG_REMIND_ACPT_NOT_NOTE  "AcceptNotNotify"
      // （SDK 接收消息并通知接入侧，接入侧不做提示，一般用于实现“消息免打扰”）
      // TIM.TYPES.MSG_REMIND_DISCARD "Discard"
      // （SDK 拒收消息）
      messageRemindType: isDisable ? "AcceptAndNotify" : "AcceptNotNotify",
    };
  }
  let { code, data } = await tim.setMessageRemindType(parameter);
  if (code === 0) {
    return data;
  }
};
// 获取会话信息
export const getConversationProfile = async (params) => {
  try {
    const { convId } = params;
    const { code, data } = await tim.getConversationProfile(convId);
    if (code == 0) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
// 消息已读上报
export const setMessageRead = (params) => {
  if (__LOCAL_MODE__) return
  const {
    unreadCount = 0, conversationID
  } = params || {};
  if (unreadCount === 0) return;
  let promise = tim.setMessageRead({ conversationID });
  promise
    .then((res) => {
      console.log("已读上报成功", res);
    })
    .catch((err) => {
      console.warn("setMessageRead error:", err);
    });
};
// 删除会话
export const deleteConversation = async (params) => {
  const { convId = '' } = params;
  const {
    code,
    data: { conversationID: ID },
  } = await tim.deleteConversation({ conversationIDList: [convId], clearHistoryMessage: false });
  return {
    code,
    ID,
  };
};
// 清空消息
export const clearHistoryMessage = async (sessionId) => {
  const {
    code,
    data: { conversationID: ID },
  } = await tim.clearHistoryMessage(sessionId);
  return {
    code,
    ID,
  };
};
// 设置自己的自定义状态
export const setSelfStatus = (status) => {
  const { code, data } = tim.setSelfStatus({ customStatus: status });
};
// 查询自己的用户状态
export const getUserStatus = (id) => {
  const { code, data } = tim.getUserStatus({ userIDList: [id] });
};
// 将英文翻译成中文
export const translateText = (params) => {
  const { textList } = params;
  const { code, data } = tim.translateText({
    sourceTextList: [textList],
    sourceLanguage: "auto",
    targetLanguage: "zh",
  });
  return {
    code,
    data,
  };
};
