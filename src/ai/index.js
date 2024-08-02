import { ClientApi } from "@/ai/api";
import { RobotAvatar } from "@/ai/constant";
import { getModelType, useAccessStore, prettyObject, getModelSvg } from "@/ai/utils";
import { createCustomMsg } from "@/api/im-sdk-api/index";
import { restApi } from "@/api/node-admin-api/rest";
import store from "@/store";
import emitter from "@/utils/mitt-bus";
import { cloneDeep } from "lodash-es";

const restSendMsg = async (params, message) => {
  return await restApi({
    params: {
      To_Account: params.from,
      From_Account: params.to,
      Text: message || "loading...",
    },
    funName: "restSendMsg",
  });
};

const updataMessage = (msg, message = "") => {
  if (!msg) return;
  msg.payload.text = message;
  store.commit("SET_HISTORYMESSAGE", {
    type: "UPDATE_MESSAGES",
    payload: { convId: `C2C${msg.from}`, message: cloneDeep(msg) },
  });
};

const avatar = (id) => {
  const suffix = RobotAvatar[getModelType(id)] || "";
  return `${import.meta.env.VITE_CLOUD_BASE_URL}${suffix}`;
};

const fnCreateLodMsg = (params) => {
  const { to, from } = params;
  const msg = createCustomMsg({ convId: from, customType: "loading" });
  msg.conversationID = `C2C${from}`;
  msg.avatar = avatar(to);
  msg.flow = "in";
  msg.to = from;
  msg.from = to;
  msg.nick = "";
  msg.status = "success";
  updataMessage(msg);
  msg.type = "TIMTextElem";
  return msg;
};

function beforeSend(api, msg) {
  if (!api.config().token) {
    setTimeout(() => {
      updataMessage(msg, "API Key 为空，请检查 API Key 后重试");
    }, 800);
    return true;
  }
  return false
}

export const chatService = async (params) => {
  const { messages, chat } = params;
  const provider = getModelType(chat.to);
  const api = new ClientApi(provider);
  const msg = fnCreateLodMsg(chat);
  if (beforeSend(api, msg)) return
  const { model } = useAccessStore(provider)

  await api.llm.chat({
    messages,
    config: { model, stream: true },
    onUpdate(message) {
      console.log("[chat] onUpdate:", message);
      emitter.emit("updataScroll", "instantly");
      updataMessage(msg, message);
    },
    async onFinish(message) {
      console.log("[chat] onFinish:", message);
      emitter.emit("updataScroll", "instantly");
      if (message) {
        updataMessage(msg, message);
        await restSendMsg(chat, message);
      } else {
        // await restSendMsg(chat, "网络异常请稍后再试");
      }
    },
    async onError(error) {
      console.error("[chat] failed:", error);
      // const isAborted = error.message.includes("aborted");
      const content = "\n\n" + prettyObject({ error: true, message: error.message });
      await restSendMsg(chat, content);
    },
    onController(controller) {
      console.log("[chat] onController:", controller);
    },
  });
};
