import TIM from "tim-js-sdk";
import tim from "@/utils/im-sdk/tim";
import { HISTORY_MESSAGE_COUNT } from "@/store/mutation-types";

// 未读总数
export const getUnreadMsg = async () => {
  return await tim.getTotalUnreadMessageCount();
};
// 获取消息列表
export const getMsgList = async (params) => {
  const { conversationID, count, nextReqMessageID } = params;
  const { code, data } = await tim.getMessageList({
    conversationID: conversationID,
    count: count || HISTORY_MESSAGE_COUNT,
    nextReqMessageID: nextReqMessageID || "",
  });
  if (code == 0) {
    return data;
  }
  return {};
};
// 获取 SDK 缓存的好友列表
export const getFriendList = async (params) => {
  let promise = tim.getFriendList();
  promise
    .then(function (imResponse) {
      const friendList = imResponse.data; // 好友列表
    })
    .catch(function (imError) {
      console.warn("getFriendList error:", imError); // 获取好友列表失败的相关信息
    });
};
// 获取个人资料
export const getMyProfile = async () => {
  try {
    const { code, data } = await tim.getMyProfile();
    if (code == 0) return data;
  } catch (e) {
    console.log(e);
  }
};
export const getGroupProfile = async (params) => {
  const { groupID } = params;
  const { data, code } = await tim.getGroupProfile({
    groupID: groupID,
    // groupCustomFieldFilter: ["key1", "key2"],
  });
  return data.group;
};
//登录
export const TIM_login = async (params) => {
  const { userID, userSig } = params;
  const result = await tim.login({
    userID,
    userSig,
  });
  return result;
};
//退出登录
export const TIM_logout = async () => {
  try {
    const { code, data } = await tim.logout();
    // tim.destroy();
    if (code == 0) return data;
  } catch (e) {
    console.log(e);
  }
};
// 销毁 SDK 实例
export const TIM_Destroy = async () => {
  // SDK 会先 logout，然后断开 WebSocket 长连接，并释放资源
  await tim.destroy();
};
// 创建自定义消息
export const createCustomMsg = async (params) => {
  const { convId, convType, textMsg } = params;
  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  // 2. 创建消息实例，接口返回的实例可以上屏
  const message = tim.createCustomMessage({
    to: convId,
    conversationType: convType,
    payload: {
      data: "dice", // 用于标识该消息是骰子类型消息
      description: String(random(1, 6)), // 获取骰子点数
      extension: "",
    },
  });
  console.log(message);
};
// 创建文本消息
export const CreateTextMsg = async (params) => {
  const { convId, convType, textMsg } = params;
  const replyMsgContent = JSON.stringify({
    messageReply: {
      messageAbstract: "测试",
      messageSender: "admin",
      messageID: "144115242233827587-1679310905-82892940",
      messageType: 1,
      version: 1,
      messageRootID: "144115242233827587-1679310905-82892940",
    },
  });
  let message = await tim.createTextMessage({
    to: convId, // 接受放ID
    conversationType: convType, // 会话类型 TIM.TYPES.CONV_C2C
    payload: {
      text: textMsg,
    },
    // needReadReceipt: true,
    // cloudCustomData: replyMsgContent,
  });
  return message;
};

// 创建@ 提醒功能的文本消息
export const CreateTextAtMsg = async (params) => {
  const { convId, convType, textMsg, atUserList } = params;
  let message = await tim.createTextAtMessage({
    to: convId,
    conversationType: convType || TIM.TYPES.CONV_GROUP,
    payload: {
      text: textMsg, // '@denny @lucy @所有人 今晚聚餐，收到的请回复',
      atUserList: atUserList, // ['denny', 'lucy', TIM.TYPES.MSG_AT_ALL] // 'denny' 'lucy' 都是 userID，而非昵称
    },
  });
  return message;
};
// 创建图片消息
export const CreateImgtMsg = (params) => {
  const { convId, convType, image } = params;
  const message = tim.createImageMessage({
    to: convId,
    conversationType: convType,
    payload: {
      file: image,
    },
    onProgress: function (event) {
      console.log("file uploading:", event);
    },
  });
  return message;
};
// 创建文件消息
export const CreateFiletMsg = async (params) => {
  const { convId, convType, files } = params;
  const message = tim.createFileMessage({
    to: convId,
    conversationType: convType,
    payload: {
      file: files,
    },
    onProgress: function (event) {
      console.log("file uploading:", event);
    },
  });
  return message;
};
// 创建合并消息
export const createMergerMsg = async (params) => {
  const { convId, convType, List, title, abstractList } = params;
  let mergerMessage = tim.createMergerMessage({
    to: convId,
    conversationType: convType,
    payload: {
      messageList: List,
      title: "大湾区前端人才中心的聊天记录",
      abstractList: ["allen: 666", "iris: [图片]", "linda: [文件]"],
      compatibleText: "请升级IMSDK到v2.10.1或更高版本查看此消息",
    },
    // 消息自定义数据（云端保存，会发送到对端，程序卸载重装后还能拉取到，v2.10.2起支持）
    // cloudCustomData: 'your cloud custom data'
  });
};
// 发送消息
export const sendMsg = async (params) => {
  try {
    const {
      code,
      data: { message },
    } = await tim.sendMessage(params);
    return {
      code,
      message,
    };
  } catch (error) {
    console.log(error);
  }
};
// 删除消息
export const deleteMsgList = async (params) => {
  const {
    code,
    data: { messageList },
  } = await tim.deleteMessage([params]);
  return {
    code,
    messageList,
  };
};
// 会话顶置
export const TIMpingConv = async (params) => {
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
  const { userID, RemindType, type } = params;
  let parameter = null;
  let isDisable = RemindType == "AcceptNotNotify";
  if (type == "C2C") {
    // 单人会话
    parameter = {
      userIDList: [userID],
      messageRemindType: isDisable ? "" : "AcceptNotNotify",
    };
  } else {
    // 群聊
    parameter = {
      groupID: userID,
      // TIM.TYPES.MSG_REMIND_ACPT_AND_NOTE  AcceptAndNotify
      // （SDK 接收消息并通知接入侧，接入侧做提示）
      // TIM.TYPES.MSG_REMIND_ACPT_NOT_NOTE  AcceptNotNotify
      // （SDK 接收消息并通知接入侧，接入侧不做提示，一般用于实现“消息免打扰”）
      // TIM.TYPES.MSG_REMIND_DISCARD
      // （SDK 拒收消息）
      messageRemindType: isDisable ? "AcceptAndNotify" : "AcceptNotNotify",
    };
  }
  let { code, data } = await tim.setMessageRemindType(parameter);
  if (code == 0) {
    // const { failureUserIDList, successUserIDList } = data;
    return data;
  }
};
// 获取会话信息
export const getConversationProfile = async (params) => {
  try {
    const { conversationID } = params;
    const { code, data } = await tim.getConversationProfile(conversationID);
    if (code == 0) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
// 消息已读上报
export const setMessageRead = async (convId) => {
  let promise = tim.setMessageRead({ conversationID: convId });
  promise
    .then(function (imResponse) {
      // 已读上报成功，指定 ID 的会话的 unreadCount 属性值被置为0
      console.log("已读上报成功", imResponse);
    })
    .catch(function (imError) {
      // 已读上报失败
      console.warn("setMessageRead error:", imError);
    });
};
// 删除会话
export const deleteConversation = async (params) => {
  const { convId } = params;
  const {
    code,
    data: { conversationID: ID },
  } = await tim.deleteConversation(convId);
  return {
    code,
    ID,
  };
};
