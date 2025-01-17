import { ClientApi } from "@/ai/api";
import { ModelProvider, modelValue } from "@/ai/constant";
import { getModelType, useAccessStore, prettyObject, getAvatarUrl } from "@/ai/utils";
import { createCustomMsg } from "@/api/im-sdk-api/index";
import { restApi } from "@/api/node-admin-api/rest";
import store from "@/store";
import emitter from "@/utils/mitt-bus";
import { cloneDeep } from "lodash-es";
import { getTime } from "@/utils/common";
import { getCustomMsgContent } from '@/api/im-sdk-api/custom';
import webSearchResult from '@/database/tools/web-search-result.json';

const restSendMsg = async (params, message) => {
  if (__LOCAL_MODE__) return
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

const fnCreateLodMsg = (params) => {
  const { to, from } = params;
  const msg = createCustomMsg({ convId: from, customType: "loading" });
  msg.conversationID = `C2C${to}`;
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

const fnCreateToolCallsMsg = (startmsg, message) => {
  const _data = cloneDeep(startmsg);
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
      message && updataMessage(msg, message);
      await restSendMsg(chat, message);
    },
    onToolMessage(message) {
      console.log("[chat] onToolMessage:", message);
      fnCreateToolCallsMsg(msg, message);
    },
    async onError(error) {
      console.error("[chat] onError:", error);
      // const isAborted = error.message.includes("aborted");
      const content = "\n\n" + prettyObject({ error: true, message: error.message });
      __LOCAL_MODE__ && updataMessage(msg, content);
      error.message && (await restSendMsg(chat, content));
    },
    onController(controller) {
      console.log("[chat] onController:", controller);
    },
  });
};
