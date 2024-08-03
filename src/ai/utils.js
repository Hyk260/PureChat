import {
  CHATGLM_ROBOT,
  CHATGPT_ROBOT,
  CHATYI_ROBOT,
  CHATQWEN_ROBOT,
  ModelProvider,
  StoreKey,
  modelConfig,
  prompt,
} from "@/ai/constant";
import { isRobot } from "@/utils/chat/index";
import storage from "@/utils/localforage/index";

export const useAccessStore = (model = ModelProvider.GPT) => {
  try {
    return storage.get(StoreKey.Access)?.[model] || modelConfig[model];
  } catch (error) {
    storage.remove(StoreKey.Access);
    return {};
  }
};

export const usePromptStore = (model = ModelProvider.GPT) => {
  try {
    return storage.get(StoreKey.Prompt)?.[model] || prompt[0];
  } catch (error) {
    storage.remove(StoreKey.Prompt);
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
  };
  return modelMapping[modelId] || "";
}

export function getModelSvg(id) {
  const modelId = getModelType(id)
  const data = {
    [ModelProvider.GPT]: "openai",
    [ModelProvider.ChatGLM]: "zhipu",
    [ModelProvider.ZeroOne]: "zeroone",
    [ModelProvider.Qwen]: "tongyi",
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
