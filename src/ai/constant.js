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
  VITE_ROBOT_GPT, // chatgpt
  VITE_ROBOT_GLM, // 智谱
  VITE_ROBOT_ZEROONE, // 零一万物
  VITE_ROBOT_QWEN, // 通义千问
  VITE_ROBOT_OLLAMA, // ollama
  VITE_ROBOT_GITHUB, // github
} = import.meta.env;

export const ROLES = ["system", "user", "assistant"];

export const ROBOT_COLLECT = [
  VITE_ROBOT_GPT,
  VITE_ROBOT_GLM,
  VITE_ROBOT_ZEROONE,
  // VITE_ROBOT_QWEN,
  VITE_ROBOT_OLLAMA,
  VITE_ROBOT_GITHUB,
];

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

export const OpenaiPath = {
  ChatPath: "v1/chat/completions", // chatgpt 聊天接口
  // UsagePath: "v1/dashboard/billing/usage", // 用量查询，数据单位为 token
  // SubsPath: "v1/dashboard/billing/subscription", // 总量查询，数据单位为 token
  ListModelPath: "v1/models", // 查询可用模型
  // EmbeddingPath: "v1/embeddings", // 文本向量化
};

export const ChatGLMPath = {
  ChatPath: "chat/completions",
};

export const ZeroOnePath = {
  ChatPath: "v1/chat/completions",
};

export const QwenPath = {
  ChatPath: "services/aigc/text-generation/generation",
};

export const GitHubPath = {
  ChatPath: "chat/completions",
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
