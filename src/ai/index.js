import { ClientApi } from "@/ai/api";
import { ModelProvider, modelValue } from "@/ai/constant";
import { useAccessStore, prettyObject, getAiAvatarUrl } from "@/ai/utils";
import { createCustomMessage } from "@/service/im-sdk-api/index";
import { restApi } from "@/service/api/index";
import { cloneDeep } from "lodash-es";
import { getTime, getCustomMsgContent } from "@/utils/common";
import { getThinkMsgContent, getCloudCustomData } from "@/utils/chat/index";
import { useChatStore } from "@/stores/index";
import { localStg } from "@/utils/storage";
import emitter from "@/utils/mitt-bus";

const restSendMsg = async (params, data) => {
  const { message, think } = data;
  if (__LOCAL_MODE__) return;
  if (!message) return;
  let CloudCustomData = "";
  if (think) {
    CloudCustomData = getCloudCustomData(think, {
      messageAbstract: think,
      thinking: "思考中...",
      deeplyThought: "已深度思考",
    });
  } else {
    const webSearchResult = localStg.get("webSearchReferences");
    if (webSearchResult) {
      CloudCustomData = getCloudCustomData(
        { payload: { text: "web-search" } },
        {
          webSearchResult,
        }
      );
    }
    localStg.remove("webSearchReferences");
  }
  return await restApi({
    params: {
      To_Account: params.from,
      From_Account: params.to,
      Text: message,
      CloudCustomData,
    },
    funName: "restSendMsg",
  });
};

const updataMessage = (chat, data) => {
  const { message = "", think = "" } = data || {};
  if (!chat) return;
  let isFinish = data?.done || false;
  chat.payload.text = message;
  if (think) {
    chat.cloudCustomData = getCloudCustomData(think, {
      messageAbstract: think,
      thinking: "思考中...",
      deeplyThought: "已深度思考",
    });
  } else if (isFinish) {
    const webSearchResult = localStg.get("webSearchReferences");
    if (webSearchResult) {
      chat.cloudCustomData = getCloudCustomData(
        { payload: { text: "web-search" } },
        {
          webSearchResult,
        }
      );
    }
  }
  chat.clientTime = getTime();
  chat.status = isFinish ? "success" : "sending";
  useChatStore().updateMessages({ sessionId: `C2C${chat.from}`, message: cloneDeep(chat) });
  emitter.emit("updateScroll", "robot");
  if (isFinish && __LOCAL_MODE__) localStg.remove("webSearchReferences");
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
  useChatStore().updateMessages({ sessionId: `C2C${_data.from}`, message: _data });
};

// const createToolCallsMsg = (startMsg, message) => {
//   const _data = cloneDeep(startMsg);
//   _data.clientTime = getTime();
//   _data.type = "TIMCustomElem";
//   _data.payload = getCustomMsgContent({ data: message, type: "tool_call" });
//   _data.payload.extension = JSON.stringify();
//   useChatStore().updateMessages({ sessionId: `C2C${_data.from}`, message: cloneDeep(_data) });
// };

function beforeSend(api, data) {
  if ([ModelProvider.Ollama].includes(api.llm.provider)) return false;
  if (api.config().token) {
    return false;
  } else {
    setTimeout(() => {
      createAlertMsg(data, api.llm.provider);
      useChatStore().updateSendingState(data.from, "delete");
    }, 600);
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
    // onToolMessage: handleToolMessage(startMsg),
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
  useChatStore().updateSendingState(chat.to, "delete");
};

// const handleToolMessage = (startMsg) => (data) => {
//   console.log("[chat] onToolMessage:", data);
//   createToolCallsMsg(startMsg, data);
// };

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

  useChatStore().updateSendingState(chat.to, "delete");
};

const handleController = (controller) => {
  console.log("[chat] onController:", controller);
};
