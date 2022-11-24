"use strict";
import TIM from "tim-js-sdk";
import tim from "@/utils/im-sdk/tim";
import { errorMessage } from "@/utils/message";
import store from "@/store";

function kickedOutReason(type) {
  switch (type) {
    case TIM.TYPES.KICKED_OUT_MULT_ACCOUNT:
      return "由于多实例登录";
    case TIM.TYPES.KICKED_OUT_MULT_DEVICE:
      return "由于多设备登录";
    case TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED:
      return "由于 userSig 过期";
    default:
      return "";
  }
}

export default class {
  constructor() {
    // 初始化
    this.init();
    // 暴露给全局
    window.TIMProxy = this;
  }
  init() {
    console.log("init");
    // 监听SDK
    this.initListener();
  }
  initListener() {
    // 登录成功后会触发 SDK_READY 事件，该事件触发后，可正常使用 SDK 接口
    tim.on(TIM.EVENT.SDK_READY, this.onReadyStateUpdate);
    // 收到 SDK 进入 not ready 状态通知，此时 SDK 无法正常工作
    tim.on(TIM.EVENT.SDK_NOT_READY, this.onReadyStateUpdate);
    // 收到会话列表更新通知
    tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, this.onUpdateConversationList);
    // 收到推送的单聊、群聊、群提示、群系统通知的新消息
    tim.on(TIM.EVENT.MESSAGE_RECEIVED, this.onReceiveMessage);
    // 收到消息被撤回的通知
    tim.on(TIM.EVENT.MESSAGE_REVOKED, this.onMessageRevoked);
    // 群组列表更新
    tim.on(TIM.EVENT.GROUP_LIST_UPDATED, this.onUpdateGroupList);
    // 被踢出
    tim.on(TIM.EVENT.KICKED_OUT, this.onKickOut);
    // SDK内部出错
    tim.on(TIM.EVENT.ERROR, this.onError);
  }
  onReadyStateUpdate({ name }) {
    const isSDKReady = name === TIM.EVENT.SDK_READY ? true : false;
    store.commit("toggleIsSDKReady", isSDKReady);
    if (isSDKReady) {
      store.dispatch("GET_MYPROFILE");
    }
  }
  onUpdateConversationList({ data, name }) {
    console.log(data, "onUpdateConversationList_会话列表更新");
    store.commit("SET_CONVERSATION", {
      type: "REPLACE_CONV_LIST",
      payload: data,
    });
  }
  onReceiveMessage({ data, name }) {
    const { toAccount } = store.state.conversation.currentConversation;
    console.log(data, "收到新消息");
    // 收到新消息 且 为当前选中会话 更新消息
    if (data?.[0].to !== toAccount) return;
    store.commit("SET_HISTORYMESSAGE", {
      type: "UPDATE_MESSAGES",
      payload: {
        convId: "",
        message: data[0],
      },
    });
  }
  onMessageRevoked({ data, name }) {
    console.log(data, "onMessageRevoked_撤回消息");
    store.commit("SET_HISTORYMESSAGE", {
      type: "RECALL_MESSAGE",
      payload: {
        convId: data[0].to,
        message: data,
      },
    });
  }
  onUpdateGroupList({ data, name }) {
    console.log(data, "onUpdateGroupList_群组列表更新");
    // commit('updateGroupList', event.data)
  }
  onKickOut({ data }) {
    const message = kickedOutReason(data.type);
    errorMessage(message);
    store.dispatch("LOG_OUT");
    store.dispatch("TIM_LOG_OUT");
  }
  onError(event) {
    console.log(event, "onError");
  }
}
