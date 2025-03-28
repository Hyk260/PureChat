import store from "@/store";
import { useChatStore } from "@/stores/index";
import { throttle } from "lodash-es";

export function kickedOutReason(type) {
  switch (type) {
    case "multipleAccount":
      return "由于多实例登录";
    case "multipleDevice":
      return "由于多设备登录";
    case "userSigExpired":
      return "由于 userSig 过期";
    default:
      return "";
  }
}

export function checkoutNetState(state) {
  switch (state) {
    case "connected":
      return { message: "已接入网络", type: "success" };
    case "connecting":
      return { message: "当前网络不稳定", type: "warning" };
    case "disconnected":
      return { message: "当前网络不可用", type: "error" };
    default:
      return "";
  }
}

export const fnCheckoutNetState = throttle((state) => {
  checkoutNetState(state);
}, 3000);

export function getConversationID() {
  return useChatStore().currentConversation?.conversationID;
  // return store.state.conversation?.currentConversation?.conversationID;
}

export function getConversationList(data) {
  const list = useChatStore().conversationList;
  const chatId = data?.[0].conversationID;
  const massage = list.filter((t) => t.conversationID === chatId);
  return massage;
}
