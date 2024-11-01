import { ClientApi } from "@/ai/api";
import { ModelProvider, modelValue } from "@/ai/constant";
import { getModelType, useAccessStore, prettyObject, getAvatarUrl } from "@/ai/utils";
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
      Text: message,
    },
    funName: "restSendMsg",
  });
};

const updataMessage = (msg, message = "") => {
  if (!msg) return;
  msg.payload.text = message;
  store.commit("updateMessages", { convId: `C2C${msg.from}`, message: cloneDeep(msg) });
  emitter.emit("updataScroll", "robot");
};

const fnCreateLodMsg = (params) => {
  const { to, from } = params;
  const msg = createCustomMsg({ convId: from, customType: "loading" });
  msg.conversationID = `C2C${from}`;
  msg.avatar = getAvatarUrl(to);
  msg.flow = "in";
  msg.to = from;
  msg.from = to;
  msg.nick = "";
  msg.status = "success";
  updataMessage(msg);
  msg.type = "TIMTextElem";
  return msg;
};

function getPrompt(api) {
  let writing = "API Key 为空，请在配置页填入你的 API Key 后重试";
  try {
    let doubt = modelValue[api.llm.provider].Token.doubt;
    let text = `[文档](${doubt})`;
    return `${writing}-${text}`;
  } catch (error) {
    return writing;
  }
}

function beforeSend(api, msg) {
  if ([ModelProvider.Ollama].includes(api.llm.provider)) return false;
  if (!api.config().token) {
    setTimeout(() => {
      updataMessage(msg, getPrompt(api));
    }, 500);
    return true;
  }
  return false;
}

export const chatService = async (params) => {
  const { messages, chat } = params;
  const provider = getModelType(chat.to);
  const api = new ClientApi(provider);
  const msg = fnCreateLodMsg(chat);
  if (beforeSend(api, msg)) return;
  const { model } = useAccessStore(provider);
  await api.llm.chat({
    messages,
    config: { model, stream: true },
    onUpdate(message) {
      console.log("[chat] onUpdate:", message);
      updataMessage(msg, message);
    },
    async onFinish(message) {
      console.log("[chat] onFinish:", message);
      if (!message) return;
      updataMessage(msg, message);
      await restSendMsg(chat, message);
    },
    async onError(error) {
      console.error("[chat] onError:", error);
      // const isAborted = error.message.includes("aborted");
      const content = "\n\n" + prettyObject({ error: true, message: error.message });
      error.message && (await restSendMsg(chat, content));
    },
    onController(controller) {
      console.log("[chat] onController:", controller);
    },
  });
};
