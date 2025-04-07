import { ClientApi } from "@/ai/api";
import { ModelProvider, modelValue } from "@/ai/constant";
import { useAccessStore, prettyObject, getAiAvatarUrl } from "@/ai/utils";
import { createCustomMessage } from "@/api/im-sdk-api/index";
import { restApi } from "@/api/node-admin-api/rest";
import { cloneDeep } from "lodash-es";
import { getTime } from "@/utils/common";
import { getCustomMsgContent } from "@/api/im-sdk-api/custom";
import { getThinkMsgContent } from "@/utils/chat/index";
import { useChatStore } from "@/stores/index";
import emitter from "@/utils/mitt-bus";
import webSearchResult from "@/database/tools/web-search-result";

const restSendMsg = async (params, data) => {
  const { message, think } = data;
  if (__LOCAL_MODE__) return;
  if (!message) return;
  return await restApi({
    params: {
      To_Account: params.from,
      From_Account: params.to,
      Text: message,
      CloudCustomData: getThinkMsgContent(think),
    },
    funName: "restSendMsg",
  });
};

const updataMessage = (chat, data) => {
  const { message = "", think = "" } = data || {};
  if (!chat) return;
  chat.payload.text = message;
  chat.cloudCustomData = getThinkMsgContent(think);
  chat.clientTime = getTime();
  chat.status = data?.done ? "success" : "sending";
  useChatStore().updateMessages({
    sessionId: `C2C${chat.from}`,
    message: cloneDeep(chat),
  });
  emitter.emit("updataScroll", "robot");
};

const createStartMsg = (params) => {
  const { to: from, from: to } = params;
  const msg = createCustomMessage({ to, customType: "loading" });
  msg.conversationID = `C2C${from}`;
  msg.avatar = getAiAvatarUrl(from);
  msg.flow = "in";
  msg.to = to;
  msg.from = from;
  msg.nick = "";
  msg.status = "success";
  updataMessage(msg);
  msg.type = "TIMTextElem";
  return msg;
};

const createAlertMsg = (startMsg, provider) => {
  const _data = cloneDeep(startMsg);
  _data.clientTime = getTime();
  _data.type = "TIMCustomElem";
  _data.payload = getCustomMsgContent({ data: { provider }, type: "warning" });
  useChatStore().updateMessages({
    sessionId: `C2C${_data.from}`,
    message: _data,
  });
};

const createToolCallsMsg = (startMsg, message) => {
  const _data = cloneDeep(startMsg);
  _data.clientTime = getTime();
  _data.type = "TIMCustomElem";
  _data.payload = getCustomMsgContent({ data: message, type: "tool_call" });
  _data.payload.extension = JSON.stringify(webSearchResult);
  useChatStore().updateMessages({
    sessionId: `C2C${_data.from}`,
    message: cloneDeep(_data),
  });
};

function beforeSend(api, msg) {
  if ([ModelProvider.Ollama].includes(api.llm.provider)) return false;
  if (api.config().token) {
    return false;
  } else {
    setTimeout(() => {
      createAlertMsg(msg, api.llm.provider);
    }, 500);
    return true;
  }
}

export const chatService = async ({ messages, chat, provider }) => {
  const api = new ClientApi(provider);
  const startMsg = createStartMsg(chat);

  if (beforeSend(api, startMsg)) return;

  await api.llm.chat({
    messages,
    config: {
      model: useAccessStore(provider).model,
      stream: true,
    },
    onUpdate: handleUpdate(startMsg),
    onFinish: handleFinish(startMsg, chat),
    onToolMessage: handleToolMessage(startMsg),
    onReasoningMessage: handleReasoningMessage(startMsg),
    onError: handleError(startMsg, chat),
    onController: handleController,
  });
};

const handleUpdate = (startMsg) => (data) => {
  const { message = "", think = "" } = data || {};
  console.log("[chat] onUpdate:", message);
  updataMessage(startMsg, data);
};

const handleFinish = (startMsg, chat) => async (data) => {
  const { message = "", think = "" } = data || {};
  console.log("[chat] onFinish:", message);
  if (message) {
    data.done = true;
    updataMessage(startMsg, data);
    await restSendMsg(chat, data);
  }
};

const handleToolMessage = (startMsg) => (data) => {
  console.log("[chat] onToolMessage:", data);
  createToolCallsMsg(startMsg, data);
};

const handleReasoningMessage = (startMsg) => (think) => {
  console.log("[chat] onReasoningMessage:", think);
  updataMessage(startMsg, { message: "", think });
};

const handleError = (startMsg, chat) => async (error) => {
  console.error("[chat] onError:", error);
  const content = `\n\n${prettyObject({ error: true, message: error.message })}`;

  if (__LOCAL_MODE__) {
    updataMessage(startMsg, { message: content });
  }

  if (error.message) {
    await restSendMsg(chat, { message: content });
  }
};

const handleController = (controller) => {
  console.log("[chat] onController:", controller);
};
