import { 
  OPENAI_ID, 
  ZHIPU_ID, 
  ZEROONE_ID, 
  QWEN_ID, 
  OLLAMA_ID, 
  GITHUB_ID, 
  DEEPSEEK_ID,
  MISTRAL_ID
} from '@shared/provider/config';
import {
  ModelProvider,
  modelConfig,
  modelValue,
  AssistantAvatar,
} from "@/ai/constant";
import { useRobotStore } from "@/stores/index";
import { isRobot } from "@/utils/chat/index";
import { localStg } from "@/utils/storage";
import { isEmpty } from "lodash-es";

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
  const access = useRobotStore().accessStore?.[model] || "";

  return isEmpty(access) ? modelConfig[model] : access
};

/**
 * 根据提供的模型ID获取模型类型。
 * @param {string} modelId - '@RBT#001' 模型ID，用于识别不同的模型类型。
 * @returns {ModelProvider | string} - 'openai' 返回对应的模型类型，如果模型ID无效则返回''。
 */
export function getModelType(modelId) {
  if (!isRobot(modelId)) return "";
  const modelMapping = {
    [OPENAI_ID]: ModelProvider.OpenAI,
    [ZHIPU_ID]: ModelProvider.ZhiPu,
    [ZEROONE_ID]: ModelProvider.ZeroOne,
    [QWEN_ID]: ModelProvider.Qwen,
    [OLLAMA_ID]: ModelProvider.Ollama,
    [GITHUB_ID]: ModelProvider.GitHub,
    [DEEPSEEK_ID]: ModelProvider.DeepSeek,
    [MISTRAL_ID]: ModelProvider.Mistral,
  };
  return modelMapping[modelId.replace("C2C", "")] || "";
}

export function getModelId(model) {
  if (!model) return "";
  const modelMapping = {
    [ModelProvider.OpenAI]: OPENAI_ID,
    [ModelProvider.ZhiPu]: ZHIPU_ID,
    [ModelProvider.ZeroOne]: ZEROONE_ID,
    [ModelProvider.Qwen]: QWEN_ID,
    [ModelProvider.Ollama]: OLLAMA_ID,
    [ModelProvider.GitHub]: GITHUB_ID,
    [ModelProvider.DeepSeek]: DEEPSEEK_ID,
    [ModelProvider.Mistral]: MISTRAL_ID,
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
    [ModelProvider.Mistral]: "mistral",
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

/**
 * 获取用户头像 URL
 * @param {string} id - 用户或机器人 ID '@RBT#001'
 * @param {string} type - 头像类型 ("local" 或 "cloud")，默认为 "local"
 * @returns {string} 头像 URL
 */
export const getAvatarUrl = (id, type = "local") => {
  // icon.png
  const suffix = AssistantAvatar[getModelType(id)] || "";
  if (type === "local") {
    return new URL(`../assets/images/model-provider/${suffix}`, import.meta.url).href;
  } else {
    return `${import.meta.env.VITE_CLOUD_BASE_URL}${suffix}`;
  }
};

/**
 * 获取 AI 用户头像 URL
 * @param {string} id - 会话 ID C2C@RBT#005
 * @returns {string} 头像 URL 或空字符串
 */
export function getAiAvatarUrl(id) {
  if (id.includes("@RBT#")) {
    return getAvatarUrl(id);
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
 * 确保消息交替排列的强化处理方法
 * 1. 保留所有系统消息
 * 2. 系统消息后第一条必须是用户消息
 * 3. 后续消息必须严格交替排列
 * 4. 自动过滤无效的连续消息
 */
export const adjustForDeepseek = (messages) => {
  const processed = [];
  let lastRole = 'system';
  let hasSystem = false;
  for (const msg of messages) {
    // 处理系统消息
    if (msg.role === 'system') {
      processed.push(msg);
      hasSystem = true;
      lastRole = 'system';
      continue;
    }
    // 系统消息后首条必须为用户消息
    if (hasSystem && processed.length === 1) {
      if (msg.role !== 'user') continue;
      processed.push(msg);
      lastRole = 'user';
      continue;
    }
    // 常规消息交替检查
    if (msg.role !== lastRole) {
      processed.push(msg);
      lastRole = msg.role;
    } else {
      console.warn(`Skipping consecutive ${msg.role} message:`, msg.content);
    }
  }
  // 兜底处理：当存在系统消息但无用户消息时
  if (hasSystem && !processed.some(m => m.role === 'user')) {
    processed.push({
      role: 'user',
      content: '请继续',
    });
  }

  return processed.slice(0, 8);
}
