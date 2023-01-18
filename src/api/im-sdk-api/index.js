import TIM from "tim-js-sdk";
import tim from "@/utils/im-sdk/tim";
import { HISTORY_MESSAGE_COUNT } from "@/store/mutation-types";

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
// 获取成员列表
export const getGroupMemberList = async (params) => {
  try {
    const { groupID, count, offset } = params;
    const { code, data } = await tim.getGroupMemberList({
      groupID,
      count: 15,
      offset: 0,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
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
// 创建文本消息
export const CreateTextMsg = async (params) => {
  const { convId, convType, textMsg } = params;
  let message = await tim.createTextMessage({
    to: convId, // 接受放ID
    conversationType: convType, // 会话类型 TIM.TYPES.CONV_C2C
    // 消息优先级，用于群聊（v2.4.2起支持）。如果某个群的消息超过了频率限制，后台会优先下发高优先级的消息，详细请参考：https://cloud.tencent.com/document/product/269/3663#.E6.B6.88.E6.81.AF.E4.BC.98.E5.85.88.E7.BA.A7.E4.B8.8E.E9.A2.91.E7.8E.87.E6.8E.A7.E5.88.B6)
    // 支持的枚举值：TIM.TYPES.MSG_PRIORITY_HIGH, TIM.TYPES.MSG_PRIORITY_NORMAL（默认）, TIM.TYPES.MSG_PRIORITY_LOW, TIM.TYPES.MSG_PRIORITY_LOWEST
    // priority: TIM.TYPES.MSG_PRIORITY_NORMAL,
    payload: {
      text: textMsg,
    },
    // v2.20.0起支持C2C消息已读回执功能，如果您发消息需要已读回执，需购买旗舰版套餐，并且创建消息时将 needReadReceipt 设置为 true
    needReadReceipt: true,
    // 消息自定义数据（云端保存，会发送到对端，程序卸载重装后还能拉取到，v2.10.2起支持）
    // cloudCustomData: 'your cloud custom data'
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
export const CreateImgtMsg = async (params) => {
  const { convId, convType, image } = params;
  let message = tim.createImageMessage({
    to: convId,
    conversationType: convType,
    // 消息优先级，用于群聊（v2.4.2起支持）。如果某个群的消息超过了频率限制，后台会优先下发高优先级的消息，详细请参考：https://cloud.tencent.com/document/product/269/3663#.E6.B6.88.E6.81.AF.E4.BC.98.E5.85.88.E7.BA.A7.E4.B8.8E.E9.A2.91.E7.8E.87.E6.8E.A7.E5.88.B6)
    // 支持的枚举值：TIM.TYPES.MSG_PRIORITY_HIGH, TIM.TYPES.MSG_PRIORITY_NORMAL（默认）, TIM.TYPES.MSG_PRIORITY_LOW, TIM.TYPES.MSG_PRIORITY_LOWEST
    // priority: TIM.TYPES.MSG_PRIORITY_NORMAL,
    payload: {
      file: image,
      // file: document.getElementById("imagePicker"),
    },
    // 消息自定义数据（云端保存，会发送到对端，程序卸载重装后还能拉取到，v2.10.2起支持）
    // cloudCustomData: 'your cloud custom data'
    onProgress: function (event) {
      console.log("file uploading:", event);
    },
  });
  return message;
};
// 创建文件消息
export const CreateFiletMsg = async (params) => {
  const { convId, convType, files } = params;
  let message = tim.createFileMessage({
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
// 发送消息
export const sendMsg = async (params) => {
  const result = await tim.sendMessage(params);
  return result;
};
// 删除消息
export const deleteMsgList = async (params) => {
  const result = await tim.deleteMessage([params]);
  return result;
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
export const revokeMsg = (params) => {
  let promise = tim.revokeMessage(params);
  promise
    .then(function (imResponse) {
      // 消息撤回成功
      console.log(imResponse);
    })
    .catch(function (imError) {
      // 消息撤回失败
      console.warn("revokeMessage error:", imError);
    });
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
