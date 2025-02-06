import { OpenaiConfig } from "@/ai/platforms/openai/config";
import { openaiModelValue } from "@/ai/platforms/openai/modelValue";

import { GitHubConfig } from "@/ai/platforms/github/config";
import { githubModelValue } from "@/ai/platforms/github/modelValue";

import { YiConfig } from "@/ai/platforms/zeroone/config";
import { yiModelValue } from "@/ai/platforms/zeroone/modelValue";

import { ZhiPuConfig } from "@/ai/platforms/zhipu/config";
import { zhipuModelValue } from "@/ai/platforms/zhipu/modelValue";

import { QwenConfig } from "@/ai/platforms/qwen/config";
import { qwenModelValue } from "@/ai/platforms/qwen/modelValue";

import { OllamaConfig } from "@/ai/platforms/ollama/config";
import { ollamaModelValue } from "@/ai/platforms/ollama/modelValue";

import { prefixRobotIDs } from "./utils";

export const {
  VITE_OPENAI_ID, // chatgpt
  VITE_ZHIPU_ID, // 智谱
  VITE_ZEROONE_ID, // 零一万物
  VITE_QWEN_ID, // 通义千问
  VITE_OLLAMA_ID, // ollama
  VITE_GITHUB_ID, // github
  DEV: isDev,
} = import.meta.env;

export const ROLES = ["system", "user", "assistant"];

export const ROBOT_COLLECT = [
  VITE_OPENAI_ID,
  VITE_ZHIPU_ID,
  VITE_ZEROONE_ID,
  VITE_OLLAMA_ID,
];

if (isDev) {
  ROBOT_COLLECT.push(VITE_GITHUB_ID);
  ROBOT_COLLECT.push(VITE_QWEN_ID);
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
 * @property {string} GPT - chatgpt 模型
 * @property {string} ChatGLM - 智谱模型
 * @property {string} ZeroOne - 零一万物模型
 * @property {string} Qwen - 通义千问模型
 * @property {string} Ollama - Ollama 模型
 */
export const ModelProvider = {
  GPT: "GPT",
  ChatGLM: "ChatGLM",
  ZeroOne: "ZeroOne",
  Qwen: "Qwen",
  Ollama: "Ollama",
  GitHub: "GitHub",
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
  [ModelProvider.GPT]: "open-ai-icon.png",
  [ModelProvider.ChatGLM]: "chatglm.svg",
  [ModelProvider.ZeroOne]: "ZeroOne.svg",
  [ModelProvider.Qwen]: "qwen.svg",
  [ModelProvider.Ollama]: "ollama.svg",
  [ModelProvider.GitHub]: "github.svg",
};

// 默认配置
export const modelConfig = {
  [ModelProvider.GPT]: { ...OpenaiConfig() },
  [ModelProvider.GitHub]: { ...GitHubConfig() },
  [ModelProvider.ChatGLM]: { ...ZhiPuConfig },
  [ModelProvider.ZeroOne]: { ...YiConfig },
  [ModelProvider.Qwen]: { ...QwenConfig },
  [ModelProvider.Ollama]: { ...OllamaConfig },
};

export const modelValue = {
  [ModelProvider.GPT]: openaiModelValue(),
  [ModelProvider.GitHub]: githubModelValue(),
  [ModelProvider.ChatGLM]: zhipuModelValue(),
  [ModelProvider.ZeroOne]: yiModelValue(),
  [ModelProvider.Qwen]: qwenModelValue(),
  [ModelProvider.Ollama]: ollamaModelValue(),
};
