import store from "@/store";
import TIM from "@/utils/IM/chat/index";
import { throttle } from "lodash-es";

export function kickedOutReason(type) {
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
export function checkoutNetState(state) {
  switch (state) {
    case TIM.TYPES.NET_STATE_CONNECTED:
      return { message: "已接入网络", type: "success" };
    case TIM.TYPES.NET_STATE_CONNECTING:
      return { message: "当前网络不稳定", type: "warning" };
    case TIM.TYPES.NET_STATE_DISCONNECTED:
      return { message: "当前网络不可用", type: "error" };
    default:
      return "";
  }
}
export const fnCheckoutNetState = throttle((state) => {
  checkoutNetState(state);
}, 3000);

export function getConversationID() {
  return store.state.conversation?.currentConversation?.conversationID;
}
export function getConversationList(data) {
  const list = store.state.conversation?.conversationList;
  const convId = data?.[0].conversationID;
  const massage = list.filter((t) => t.conversationID == convId);
  return massage;
}
