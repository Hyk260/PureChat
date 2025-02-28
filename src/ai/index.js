import { ClientApi } from "@/ai/api";
import { ModelProvider, modelValue } from "@/ai/constant";
import { useAccessStore, prettyObject, getAiAvatarUrl } from "@/ai/utils";
import { createCustomMessage } from "@/api/im-sdk-api/index";
import { restApi } from "@/api/node-admin-api/rest";
import { cloneDeep } from "lodash-es";
import { getTime } from "@/utils/common";
import { getCustomMsgContent } from '@/api/im-sdk-api/custom';
import store from "@/store";
import emitter from "@/utils/mitt-bus";
import webSearchResult from '@/database/tools/web-search-result.json';

const restSendMsg = async (params, message) => {
  if (__LOCAL_MODE__) return
  if (!message) return
  return await restApi({
    params: {
      To_Account: params.from,
      From_Account: params.to,
      Text: message,
    },
    funName: "restSendMsg",
  });
};

const updataMessage = (chat, message = "") => {
  if (!chat) return;
  chat.payload.text = message;
  chat.clientTime = getTime();
  store.commit("updateMessages", { convId: `C2C${chat.from}`, message: cloneDeep(chat) });
  emitter.emit("updataScroll", "robot");
};

const createStartMsg = (params) => {
  const { to: from, from: to } = params;
  const msg = createCustomMessage({ convId: to, customType: "loading" });
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
  _data.payload = getCustomMsgContent({ data: { provider }, type: "warning" })
  store.commit("updateMessages", { convId: `C2C${_data.from}`, message: _data });
}

async function searchGoogle(query) {
  const url = "https://websearch.plugsugar.com/api/plugins/websearch";
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "*/*");
  myHeaders.append("Host", "websearch.plugsugar.com");
  myHeaders.append("Connection", "keep-alive");
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(query)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Search results:", data.result);
  } catch (error) {
    console.error("Error performing the search:", error);
  }
}

const createToolCallsMsg = (startMsg, message) => {
  const _data = cloneDeep(startMsg);
  _data.clientTime = getTime();
  _data.type = "TIMCustomElem";

  // const _arguments = message.message.choices[0].message.tool_calls[0].function.arguments;
  // const query = JSON.parse(_arguments)._requestBody
  // searchGoogle(query).then(res => {
  //   console.log(res)
  // }).catch(err => {
  //   console.log(err)
  // })
  _data.payload = getCustomMsgContent({ data: message, type: "tool_call" })
  _data.payload.extension = JSON.stringify(webSearchResult)
  store.commit("updateMessages", { convId: `C2C${_data.from}`, message: cloneDeep(_data) });
};

function beforeSend(api, msg) {
  if ([ModelProvider.Ollama].includes(api.llm.provider)) return false;
  if (api.config().token) {
    return false;
  } else {
    setTimeout(() => {
      createAlertMsg(msg, api.llm.provider)
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
      stream: true
    },
    onUpdate: handleUpdate(startMsg),
    onFinish: handleFinish(startMsg, chat),
    onToolMessage: handleToolMessage(startMsg),
    onError: handleError(startMsg, chat),
    onController: handleController
  });
};


const handleUpdate = (startMsg) => (message) => {
  console.log("[chat] onUpdate:", message);
  updataMessage(startMsg, message);
};

const handleFinish = (startMsg, chat) => async (message) => {
  console.log("[chat] onFinish:", message);
  if (message) {
    updataMessage(startMsg, message);
    await restSendMsg(chat, message);
  }
};

const handleToolMessage = (startMsg) => (message) => {
  console.log("[chat] onToolMessage:", message);
  createToolCallsMsg(startMsg, message);
};

const handleError = (startMsg, chat) => async (error) => {
  console.error("[chat] onError:", error);
  const content = `\n\n${prettyObject({ error: true, message: error.message })}`;

  if (__LOCAL_MODE__) {
    updataMessage(startMsg, content);
  }

  if (error.message) {
    await restSendMsg(chat, content);
  }
};

const handleController = (controller) => {
  console.log("[chat] onController:", controller);
};