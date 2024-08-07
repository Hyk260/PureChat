import { ClientApi } from "@/ai/api";
import { RobotAvatar, ModelProvider } from "@/ai/constant";
import { getModelType, useAccessStore, prettyObject } from "@/ai/utils";
import { createCustomMsg } from "@/api/im-sdk-api/index";
import { restApi } from "@/api/node-admin-api/rest";
import store from "@/store";
import emitter from "@/utils/mitt-bus";
import { cloneDeep } from "lodash-es";
import { OllamaAI } from './platforms/ollama/ollama';

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
  if ([ModelProvider.Ollama].includes(api.llm.provider)) return false;
  if (!api.config().token) {
    setTimeout(() => {
      updataMessage(msg, "API Key 为空，请检查 API Key 后重试");
    }, 800);
    return true;
  }
  return false;
}

export const chatService = async (params) => {
  const { messages, chat } = params;

  const fetchOnClient = async () => {

    const payload = useAccessStore(ModelProvider.Ollama);

    try {
      return await new OllamaAI().chat(messages, payload, {
        callback: {

        },
        // signal: ""
      });
    } catch (e) {
      console.log(e)
    }

  };

  const fetcher = async () => {
    try {
      return await fetchOnClient();
    } catch (e) {
      console.log(e)
    }
  };

  const provider = getModelType(chat.to);
  const api = new ClientApi(provider);
  const msg = fnCreateLodMsg(chat);
  if (beforeSend(api, msg)) return;
  const { model } = useAccessStore(provider);
  await api.llm.chat({
    messages,
    fetcher: fetcher,
    config: { model, stream: true },
    onUpdate(message) {
      console.log("[chat] onUpdate:", message);
      updataMessage(msg, message);
      emitter.emit("updataScroll", "robot");
    },
    async onFinish(message) {
      console.log("[chat] onFinish:", message);
      if (!message) return;
      updataMessage(msg, message);
      emitter.emit("updataScroll", "robot");
      await restSendMsg(chat, message);
    },
    async onError(error) {
      console.error("[chat] failed:", error);
      // const isAborted = error.message.includes("aborted");
      const content = "\n\n" + prettyObject({ error: true, message: error.message });
      error.message && (await restSendMsg(chat, content));
    },
    onController(controller) {
      console.log("[chat] onController:", controller);
    },
  });
};
