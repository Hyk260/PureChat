import {
  CHATGLM_ROBOT,
  CHATGPT_ROBOT,
  CHATYI_ROBOT,
  CHATQWEN_ROBOT,
  CHATOLLAMA_ROBOT,
  ModelProvider,
  StoreKey,
  modelConfig,
  prompt,
  modelValue,
  RobotAvatar,
} from "@/ai/constant";
import { OpenaiConfig } from "@/ai/platforms/openai/config";
import { isRobot } from "@/utils/chat/index";
import { localStg } from "@/utils/storage";

export const useAccessStore = (model = ModelProvider.GPT) => {
  try {
    const access = localStg.get(StoreKey.Access)?.[model] || "";
    if (model === "GPT" && !access) {
      return OpenaiConfig();
    }
    return access || modelConfig[model];
  } catch (error) {
    localStg.remove(StoreKey.Access);
    return {};
  }
};

export const usePromptStore = (model = ModelProvider.GPT) => {
  try {
    return localStg.get(StoreKey.Prompt)?.[model] || prompt[0];
  } catch (error) {
    localStg.remove(StoreKey.Prompt);
    return {};
  }
};

/**
 * 根据提供的模型ID获取模型类型。
 * @param {string} modelId - '@RBT#001' 模型ID，用于识别不同的模型类型。
 * @returns {ModelProvider | string} - 'GPT' 返回对应的模型类型，如果模型ID无效则返回''。
 */
export function getModelType(modelId) {
  if (!isRobot(modelId)) return "";
  const modelMapping = {
    [CHATGPT_ROBOT]: ModelProvider.GPT,
    [CHATGLM_ROBOT]: ModelProvider.ChatGLM,
    [CHATYI_ROBOT]: ModelProvider.ZeroOne,
    [CHATQWEN_ROBOT]: ModelProvider.Qwen,
    [CHATOLLAMA_ROBOT]: ModelProvider.Ollama,
  };
  return modelMapping[modelId] || "";
}

export function getModelId(model) {
  if (!model) return "";
  const modelMapping = {
    [ModelProvider.GPT]: CHATGPT_ROBOT,
    [ModelProvider.ChatGLM]: CHATGLM_ROBOT,
    [ModelProvider.ZeroOne]: CHATYI_ROBOT,
    [ModelProvider.Qwen]: CHATQWEN_ROBOT,
    [ModelProvider.Ollama]: CHATOLLAMA_ROBOT,
  };
  return modelMapping[model] || "";
}

export function getModelSvg(id) {
  const modelId = getModelType(id);
  const data = {
    [ModelProvider.GPT]: "openai",
    [ModelProvider.ChatGLM]: "zhipu",
    [ModelProvider.ZeroOne]: "zeroone",
    [ModelProvider.Qwen]: "tongyi",
    [ModelProvider.Ollama]: "ollama",
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
export const createSmoothMessage = (params = { onTextUpdate: (delta, text) => {} }) => {
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

export const avatar = (id, type = "local") => {
  const suffix = RobotAvatar[getModelType(id)] || "";
  if (type === "local") {
    return new URL(`../assets/images/aI-avatar/${suffix}`, import.meta.url).href;
  } else {
    return `${import.meta.env.VITE_CLOUD_BASE_URL}${suffix}`;
  }
};

export function fnAvatar(convId) {
  if (/@RBT#/.test(convId)) {
    return avatar(convId.replace("C2C", ""));
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

export function uploadImage(file) {
  const body = new FormData();
  body.append("file", file);
  return fetch(UPLOAD_URL, {
    method: "post",
    body,
    mode: "cors",
    credentials: "include",
  })
    .then((res) => res.json())
    .then((res) => {
      console.log("res", res);
      if (res?.code == 0 && res?.data) {
        return res?.data;
      }
      throw Error(`upload Error: ${res?.msg}`);
    });
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
