import { EventStreamContentType, fetchEventSource } from "@microsoft/fetch-event-source";
import { getPlugin } from '@/views/chatStudio/utils/utils';
import {
  VITE_ZHIPU_ID,
  VITE_OPENAI_ID,
  VITE_ZEROONE_ID,
  VITE_QWEN_ID,
  VITE_OLLAMA_ID,
  VITE_GITHUB_ID,
  VITE_DEEPSEEK_ID,
  ModelProvider,
  StoreKey,
  modelConfig,
  prompt,
  modelValue,
  RobotAvatar,
  REQUEST_TIMEOUT_MS
} from "@/ai/constant";
import { OpenaiConfig } from "@/ai/platforms/openai/index";
import { createTextMessage } from "@/api/im-sdk-api/index";
import { isRobot } from "@/utils/chat/index";
import { localStg } from "@/utils/storage";

/**
 * 获取 AI 模型的配置信息
 * @param {string} model - 模型的名称，默认为 `ModelProvider.OpenAI`
 * @returns {Object} 返回模型的配置对象，包括以下字段：
 * - model: {string} 模型名称，如 "gpt-4o-mini"
 * - temperature: {number} 生成的文本多样性，范围为 0 到 1，默认为 0.6
 * - top_p: {number} 控制生成文本的多样性，范围为 0 到 1，默认为 1
 * - max_tokens: {number} 最大生成的 token 数量，默认为 1024
 * - presence_penalty: {number} 控制生成的文本是否重复，默认为 0
 * - frequency_penalty: {number} 控制生成的文本是否过度重复相同的词语，默认为 0
 * - historyMessageCount: {number} 历史消息的最大数量，默认为 10
 * - token: {string} API 访问令牌，默认为空字符串
 * - openaiUrl: {string} OpenAI API 的基础 URL，默认为空字符串
 */
export const useAccessStore = (model = ModelProvider.OpenAI) => {
  try {
    const access = localStg.get(StoreKey.Access)?.[model] || "";
    if (model === ModelProvider.OpenAI && !access) {
      return OpenaiConfig();
    }
    return access || modelConfig[model];
  } catch (error) {
    localStg.remove(StoreKey.Access);
    return {};
  }
};

export const usePromptStore = (model = ModelProvider.OpenAI, start = false) => {
  if (start) {
    return prompt[0];
  }
  try {
    return localStg.get(StoreKey.Prompt)?.[model] || prompt[0];
  } catch (error) {
    localStg.remove(StoreKey.Prompt);
    return {};
  }
};

export const useToolStore = (model = ModelProvider.OpenAI) => {
  try {
    return localStg.get(StoreKey.Tool) || []
  } catch (error) {
    localStg.remove(StoreKey.Tool);
    return [];
  }
}

/**
 * 根据提供的模型ID获取模型类型。
 * @param {string} modelId - '@RBT#001' 模型ID，用于识别不同的模型类型。
 * @returns {ModelProvider | string} - 'openai' 返回对应的模型类型，如果模型ID无效则返回''。
 */
export function getModelType(modelId) {
  if (!isRobot(modelId)) return "";
  const modelMapping = {
    [VITE_OPENAI_ID]: ModelProvider.OpenAI,
    [VITE_ZHIPU_ID]: ModelProvider.ZhiPu,
    [VITE_ZEROONE_ID]: ModelProvider.ZeroOne,
    [VITE_QWEN_ID]: ModelProvider.Qwen,
    [VITE_OLLAMA_ID]: ModelProvider.Ollama,
    [VITE_GITHUB_ID]: ModelProvider.GitHub,
    [VITE_DEEPSEEK_ID]: ModelProvider.DeepSeek
  };
  return modelMapping[modelId.replace("C2C", "")] || "";
}

export function getModelId(model) {
  if (!model) return "";
  const modelMapping = {
    [ModelProvider.OpenAI]: VITE_OPENAI_ID,
    [ModelProvider.ZhiPu]: VITE_ZHIPU_ID,
    [ModelProvider.ZeroOne]: VITE_ZEROONE_ID,
    [ModelProvider.Qwen]: VITE_QWEN_ID,
    [ModelProvider.Ollama]: VITE_OLLAMA_ID,
    [ModelProvider.GitHub]: VITE_GITHUB_ID,
    [ModelProvider.DeepSeek]: VITE_DEEPSEEK_ID,
  };
  return modelMapping[model] || "";
}

export function getModelSvg(id) {
  const modelId = getModelType(id);
  const data = {
    [ModelProvider.OpenAI]: "openai",
    [ModelProvider.ZhiPu]: "chatglm",
    [ModelProvider.ZeroOne]: "yi",
    [ModelProvider.Qwen]: "qwen",
    [ModelProvider.Ollama]: "ollama",
    [ModelProvider.GitHub]: "openai",
    [ModelProvider.DeepSeek]: "deepseek",
    llava: "llava",
  };
  return data[modelId] || "";
}

export function prettyObject(msg) {
  const obj = msg;
  if (typeof msg !== "string") {
    msg = JSON.stringify(msg, null, "  ");
  }
  if (msg === "{}") {
    return obj.toString();
  }
  if (msg.startsWith("```json")) {
    return msg;
  }
  return ["```json", msg, "```"].join("\n");
}

export function prefixRobotIDs(robotIDs) {
  return robotIDs.map((id) => "C2C" + id);
}

// 用于创建一个平滑显示文本的动画效果。它将文本分割成字符，并逐个显示这些字符，模拟打字机的效果
export const createSmoothMessage = (params = { onTextUpdate: (delta, text) => { } }) => {
  let buffer = ""; // 用于存储当前显示的文本
  let outputQueue = []; // 用于存储待显示的文本字符队列
  let animationTimeoutId = null; // 用于存储动画定时器的 ID
  let isAnimationActive = false; // 标识动画是否正在进行

  // 当需要停止动画时，调用此函数
  const stopAnimation = () => {
    isAnimationActive = false;
    if (animationTimeoutId !== null) {
      clearTimeout(animationTimeoutId);
      animationTimeoutId = null;
    }
  };

  // 定义startAnimation函数以在缓冲区中平滑显示文本
  // 当需要启动动画时，调用此函数
  const startAnimation = (speed = 2) =>
    new Promise((resolve) => {
      if (isAnimationActive) {
        resolve();
        return;
      }

      isAnimationActive = true;

      const updateText = () => {
        // 如果动画已经不再激活，则停止更新文本
        if (!isAnimationActive) {
          clearTimeout(animationTimeoutId);
          animationTimeoutId = null;
          resolve();
        }

        // 如果还有文本没有显示
        // 检查队列中是否有字符待显示
        if (outputQueue.length > 0) {
          // 从队列中获取前两个字符（如果存在）
          const charsToAdd = outputQueue.splice(0, speed).join("");
          buffer += charsToAdd;

          // 更新消息内容，这里可能需要结合实际情况调整
          params.onTextUpdate(charsToAdd, buffer);

          // 设置下一个字符的延迟
          animationTimeoutId = setTimeout(updateText, 16); // 16 毫秒的延迟模拟打字机效果
        } else {
          // 当所有字符都显示完毕时，清除动画状态
          isAnimationActive = false;
          animationTimeoutId = null;
          resolve();
        }
      };

      updateText();
    });

  const pushToQueue = (text) => {
    outputQueue.push(...text.split(""));
  };

  return {
    isAnimationActive,
    isTokenRemain: () => outputQueue.length > 0,
    pushToQueue,
    startAnimation,
    stopAnimation,
  };
};

/**
 * 获取用户头像 URL
 * @param {string} id - 用户或机器人 ID '@RBT#001'
 * @param {string} type - 头像类型 ("local" 或 "cloud")，默认为 "local"
 * @returns {string} 头像 URL
 */
export const getAvatarUrl = (id, type = "local") => {
  // icon.png
  const suffix = RobotAvatar[getModelType(id)] || "";
  if (type === "local") {
    return new URL(`../assets/images/model-provider/${suffix}`, import.meta.url).href;
  } else {
    return `${import.meta.env.VITE_CLOUD_BASE_URL}${suffix}`;
  }
};

/**
 * 获取 AI 用户头像 URL
 * @param {string} convId - 会话 ID C2C@RBT#005
 * @returns {string} 头像 URL 或空字符串
 */
export function getAiAvatarUrl(convId) {
  if (convId.includes("@RBT#")) {
    return getAvatarUrl(convId);
  } else {
    return "";
  }
}

const getStatus = (errorType) => {
  if (errorType.toString().includes("Invalid")) return 401;
  else return 400;
};

export const createErrorResponse = (errorType, body) => {
  const statusCode = getStatus(errorType);

  const data = { body, errorType };

  return new Response(prettyObject(data), { status: statusCode });
};

export function isDalle3(model) {
  return "dall-e-3" === model;
}

export function base64Image2Blob(base64Data, contentType) {
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
}

export async function uploadImage(file) {
  const body = new FormData();
  body.append("file", file);
  const res = await fetch(UPLOAD_URL, {
    method: "post",
    body,
    mode: "cors",
    credentials: "include",
  });
  const res_1 = await res.json();
  console.log("res", res_1);
  if (res_1?.code == 0 && res_1?.data) {
    return res_1?.data;
  }
  throw Error(`upload Error: ${res_1?.msg}`);
}

export async function extractImageMessage(res) {
  if (res.data) {
    let url = res.data?.at(0)?.url ?? "";
    const b64_json = res.data?.at(0)?.b64_json ?? "";
    if (!url && b64_json) {
      url = await uploadImage(base64Image2Blob(b64_json, "image/png"));
    }
    return [
      {
        type: "image_url",
        image_url: {
          url,
        },
      },
    ];
  }
}

export function generateDalle3RequestPayload(config) {
  return {
    model: config.model,
    prompt: "画一只猫",
    response_format: "b64_json",
    n: 1,
    size: "1024x1024",
    quality: "standard",
    style: "vivid",
  };
}

export function getAllModels(model = "") {
  const list = [];
  for (const [key, value] of Object.entries(modelValue)) {
    list.push(...value.Model.options.chatModels);
  }
  if (model) {
    return list.filter((t) => t.id === model)?.[0] || {};
  }
  return list;
}

export function getInfo() {
  return localStg.get("timProxy")?.userProfile?.profileCustomField;
}

export function prefix(key) {
  const prefix = "Tag_Profile_Custom_";
  return `${prefix}${key}`;
}

export function getValueByKey(array, key) {
  if (!array?.length || !key) return null;
  const item = array.find((t) => t.key === key);
  return item && item.value ? item.value : null;
}

// 全员群
export function isFullStaffGroup(data) {
  const { groupProfile } = data || {};
  return getValueByKey(groupProfile?.groupCustomField, "custom_info") === "all_staff";
}

export const createAiPromptMsg = (params) => {
  let to = localStg.get("timProxy")?.userProfile?.userID;
  let defaultBot = localStg.get("model-provider") || ModelProvider.OpenAI;
  let from = getModelId(defaultBot);
  const { meta } = localStg.get(StoreKey.Prompt)?.[defaultBot];
  const { to: _to, from: _from } = params || {};
  if (_to) to = _to;
  if (_from) from = _from;
  const title = "`" + meta.title + "`";
  const textMsg = `你好，我是 ${meta.avatar} ${title} ${meta.description} 让我们开始对话吧！`;
  const msg = createTextMessage({ convId: from, textMsg, cache: false });
  const promptMsgContent = JSON.stringify({
    messagePrompt: {
      messageID: "",
      messageAbstract: "预设提示词",
      recQuestion: meta.recQuestion || [],
      messageSender: "",
      messageType: 0,
      version: __APP_INFO__.pkg.version,
    },
  });
  msg.conversationID = `C2C${from}`;
  msg.avatar = getAiAvatarUrl(from);
  msg.cloudCustomData = promptMsgContent;
  msg.flow = "in";
  msg.to = to;
  msg.from = from;
  msg.nick = "";
  msg.status = "success";
  return { convId: `C2C${msg.from}`, message: msg };
};

export function formatSizeStrict(input) {
  const number = parseInt(input.toString().replace("_", ""), 10);

  if (isNaN(number)) {
    throw new Error("Invalid input: The input is not a valid number.");
  }

  if (number % 1000 === 0) {
    return number / 1000 + "K";
  }

  return Math.floor(number / 1000) + "k"; // 舍弃小数，向下取整
}

export const transformOpenAIStream = (
  chunk,
  stack,
) => {
  // return { data: errorData, id: 'first_chunk_error', type: 'error' };
  try {
    const item = chunk.choices[0];
    if (!item) {
      return { data: chunk, id: chunk.id, type: 'data' };
    }

    if (typeof item.delta?.tool_calls === 'object' && item.delta.tool_calls?.length > 0) {
      return {
        data: item.delta.tool_calls.map((value, index) => {
          if (stack && !stack.tool) {
            stack.tool = { id: value.id, index: value.index, name: value.function.name };
          }

          return {
            function: {
              arguments: value.function?.arguments ?? '{}',
              name: value.function?.name ?? null,
            },
            id: value.id || stack?.tool?.id,
            index: typeof value.index !== 'undefined' ? value.index : index,
            type: value.type || 'function',
          };
        }),
        id: chunk.id,
        type: 'tool_calls',
      };
    }

    // 给定结束原因
    if (item.finish_reason) {

      if (typeof item.delta?.content === 'string' && item.delta.content) {
        return { data: item.delta.content, id: chunk.id, type: 'text' };
      }

      return { data: item.finish_reason, id: chunk.id, type: 'stop' };
    }

    if (typeof item.delta?.content === 'string') {
      return { data: item.delta.content, id: chunk.id, type: 'text' };
    }

    if (item.delta?.content === null) {
      return { data: item.delta, id: chunk.id, type: 'data' };
    }

    // 其余情况下，返回 delta 和 index
    return {
      data: { delta: item.delta, id: chunk.id, index: item.index },
      id: chunk.id,
      type: 'data',
    };
  } catch (e) {
    const errorName = 'StreamChunkError';
    console.error(`[${errorName}]`, e);
    console.error(`[${errorName}] raw chunk:`, chunk);

    const err = e;

    const errorData = {
      body: {
        message:
          'chat response streaming chunk parse error, please contact your API Provider to fix it.',
        context: { error: { message: err.message, name: err.name }, chunk },
      },
      type: errorName,
    };

    return { data: errorData, id: chunk.id, type: 'error' };
  }
};

/**
 * 处理流式聊天的响应。
 * @param {string} chatPath - 聊天请求的路径。
 * @param {object} chatPayload - 聊天请求的有效负载。
 * @param {object} options - 处理选项，包括错误处理、更新和完成回调。
 * @param {AbortController} controller - 用于控制请求的 AbortController。
 */
export const handleStreamingChat = async (
  chatPath,
  chatPayload,
  options,
  controller,
  provider
) => {
  let responseText = ""; // 用于存储完整的响应文本
  let remainText = ""; // 用于存储尚未处理的文本
  let finished = false; // 用于标记动画是否已完成

  /**
   * 动画响应文本的显示。
   * 根据剩余文本的长度逐步更新响应文本。
   */
  function animateResponseText() {
    // 如果动画已完成或请求已被中止，结束动画
    if (finished || controller.signal.aborted) {
      responseText += remainText;
      console.log("[Response Animation] finished");
      // 如果响应文本为空，触发错误回调
      if (responseText?.length === 0) {
        console.error("empty response from server");
        options.onError?.(new Error("服务器繁忙，请稍后再试。"));
      }
      return;
    }
    // 如果有剩余文本，进行文本动画更新
    if (remainText.length > 0) {
      const fetchCount = Math.max(1, Math.round(remainText.length / 60));
      const fetchText = remainText.slice(0, fetchCount);
      responseText += fetchText;
      remainText = remainText.slice(fetchCount);
      options.onUpdate?.(responseText, fetchText);
    }

    requestAnimationFrame(animateResponseText);
  }

  // start animaion
  animateResponseText();

  const finish = () => {
    if (!finished) {
      finished = true;
      options.onFinish(responseText + remainText);
    }
  };

  controller.signal.onabort = finish; // 设置请求中止时的处理函数

  // 取消fetch请求
  const requestTimeoutId = setTimeout(
    () => controller?.abort(),
    REQUEST_TIMEOUT_MS
  );

  const isTools = () => {
    const payload = JSON.parse(chatPayload.body)
    return payload.tools?.length > 0
  }

  const isOllama = () => {
    return [ModelProvider.Ollama].includes(provider)
  }

  const processExtraInfo = (resJson, extraInfo) => {
    const extraObj = JSON.parse(extraInfo);
    const payload = JSON.parse(chatPayload.body)
    if (extraObj?.choices[0]?.finish_reason === 'tool_calls') {
      finished = true;
      options?.onToolMessage({
        name: payload.tools[0].function.name,
        manifest: getPlugin({ key: payload.tools[0].function.name }),
        message: resJson
      })
    }
  }

  await fetchEventSource(chatPath, {
    ...chatPayload,
    async onopen(res) {
      console.log("[OpenAI] fetchEventSource", res);
      clearTimeout(requestTimeoutId);
      const contentType = res.headers.get("content-type");
      // text/event-stream; charset=utf-8
      console.log("[OpenAI] request response content type: ", contentType);

      if (contentType?.startsWith("text/plain")) {
        responseText = await res.clone().text();
        return finish();
      }

      // text/event-stream EventStreamContentType
      const stream = contentType?.startsWith(EventStreamContentType);
      const isRequestError = !res.ok || !stream || res.status !== 200;

      if (isRequestError) {
        const responseTexts = [responseText];
        let extraInfo = await res.clone().text();

        try {
          const resJson = await res.clone().json();
          if (isTools()) {
            processExtraInfo(resJson, extraInfo);
          } else {
            extraInfo = prettyObject(resJson);
          }
        } catch (e) {
          console.log("[resJson]", e);
        }

        if (res.status === 401) {
          options.onError?.(extraInfo);
        }

        if (extraInfo) {
          responseTexts.push(extraInfo);
        }

        responseText = responseTexts.join("\n\n");

        return finish();
      } else {
        console.log(res);
      }
    },
    onmessage(msg) {
      console.log("[OpenAI] onmessage:", msg);
      if (msg.data === "[DONE]" || finished) {
        return finish();
      }
      const text = msg.data;
      try {
        if (isOllama()) {
          const json = JSON.parse(text);
          if (json === "[DONE]") return finish();
          const delta = json.message.content;
          if (delta) {
            remainText += delta;
          }
        } else {
          const json = JSON.parse(text);
          const delta = json.choices[0]?.delta?.content;
          if (delta) {
            remainText += delta;
          }
        }
      } catch (e) {
        console.error("[Request] parse error", text, msg);
      }
    },
    onclose() {
      finish();
    },
    onerror(e) {
      options.onError?.(e);
      throw e;
    },
    openWhenHidden: true,
  });
}