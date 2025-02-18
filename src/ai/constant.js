import { OpenaiConfig } from "@/ai/platforms/openai/config";
import { OpenAIModelValue } from "@/ai/platforms/openai/modelValue";

import { GitHubConfig } from "@/ai/platforms/github/config";
import { GitHubModelValue } from "@/ai/platforms/github/modelValue";

import { ZeroOneConfig } from "@/ai/platforms/zeroone/config";
import { ZeroOneModelValue } from "@/ai/platforms/zeroone/modelValue";

import { ZhiPuConfig } from "@/ai/platforms/zhipu/config";
import { ZhiPuModelValue } from "@/ai/platforms/zhipu/modelValue";

import { QwenConfig } from "@/ai/platforms/qwen/config";
import { QwenModelValue } from "@/ai/platforms/qwen/modelValue";

import { OllamaConfig } from "@/ai/platforms/ollama/config";
import { OllamaModelValue } from "@/ai/platforms/ollama/modelValue";

import { DeepseekConfig } from "@/ai/platforms/deepseek/config";
import { DeepseekModelValue } from "@/ai/platforms/deepseek/modelValue";

import { prefixRobotIDs } from "./utils";

export const {
  VITE_OPENAI_ID, // chatgpt
  VITE_ZHIPU_ID, // 智谱
  VITE_ZEROONE_ID, // 零一万物
  VITE_QWEN_ID, // 通义千问
  VITE_OLLAMA_ID, // ollama
  VITE_GITHUB_ID, // github
  VITE_DEEPSEEK_ID, // deepseek
  DEV: isDev,
} = import.meta.env;

export const ROLES = ["system", "user", "assistant"];

export const ROBOT_COLLECT = [VITE_OPENAI_ID, VITE_ZHIPU_ID, VITE_ZEROONE_ID, VITE_OLLAMA_ID];

if (isDev) {
  ROBOT_COLLECT.push(VITE_DEEPSEEK_ID);
  ROBOT_COLLECT.push(VITE_GITHUB_ID);
  // ROBOT_COLLECT.push(VITE_QWEN_ID);
}

export const C2C_ROBOT_COLLECT = prefixRobotIDs(ROBOT_COLLECT);

export const REQUEST_TIMEOUT_MS = 15000;

export const StoreKey = {
  Access: "access-control",
  Prompt: "prompt-store", // 提示词 预设
  Tool: "tool-store", // 工具
};

/**
 * 模型提供者对象，包含不同的模型名称
 * @type {Object}
 * @property {string} OpenAi - OpenAi模型
 * @property {string} ZhiPu - 智谱模型
 * @property {string} ZeroOne - 零一万物模型
 * @property {string} Qwen - 通义千问模型
 * @property {string} Ollama - Ollama模型
 */
export const ModelProvider = {
  OpenAI: "openai",
  ZhiPu: "zhipu",
  ZeroOne: "zeroone",
  Qwen: "qwen",
  DeepSeek: "deepseek",
  Ollama: "ollama",
  GitHub: "github",
};

export const prompt = [
  {
    id: "0",
    meta: {
      tags: [],
      avatar: "",
      title: "",
    },
    lang: "cn",
    prompt: [{ role: "system", content: "" }],
  },
];

export const RobotAvatar = {
  [ModelProvider.OpenAI]: "openai.png",
  [ModelProvider.ZhiPu]: "zhipu.png",
  [ModelProvider.ZeroOne]: "zeroone.png",
  [ModelProvider.Qwen]: "qwen.png",
  [ModelProvider.Ollama]: "ollama.svg",
  [ModelProvider.GitHub]: "github.svg",
  [ModelProvider.DeepSeek]: "deepseek.png",
};

// 默认配置
export const modelConfig = {
  [ModelProvider.OpenAI]: OpenaiConfig(),
  [ModelProvider.GitHub]: GitHubConfig(),
  [ModelProvider.ZhiPu]: ZhiPuConfig(),
  [ModelProvider.ZeroOne]: ZeroOneConfig(),
  [ModelProvider.Qwen]: QwenConfig(),
  [ModelProvider.Ollama]: OllamaConfig(),
  [ModelProvider.DeepSeek]: DeepseekConfig(),
};

export const modelValue = {
  [ModelProvider.OpenAI]: OpenAIModelValue(),
  [ModelProvider.GitHub]: GitHubModelValue(),
  [ModelProvider.ZhiPu]: ZhiPuModelValue(),
  [ModelProvider.ZeroOne]: ZeroOneModelValue(),
  [ModelProvider.Qwen]: QwenModelValue(),
  [ModelProvider.Ollama]: OllamaModelValue(),
  [ModelProvider.DeepSeek]: DeepseekModelValue(),
};
