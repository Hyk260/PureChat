import { OpenAiApi, OpenAIModelValue, OpenaiConfig } from "@/ai/platforms/openai/index";
import { GitHubApi, GitHubModelValue, GitHubConfig } from "@/ai/platforms/github/index";
import { ZeroOneApi, ZeroOneModelValue, ZeroOneConfig } from "@/ai/platforms/zeroone/index";
import { ZhiPuApi, ZhiPuModelValue, ZhiPuConfig } from "@/ai/platforms/zhipu/index";
import { QwenApi, QwenModelValue, QwenConfig } from "@/ai/platforms/qwen/index";
import { OllamaApi, OllamaModelValue, OllamaConfig } from "@/ai/platforms/ollama/index";
import { DeepSeekApi, DeepseekModelValue, DeepseekConfig } from "@/ai/platforms/deepseek/index";
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

export const ROBOT_COLLECT = [VITE_OPENAI_ID, VITE_ZHIPU_ID, VITE_ZEROONE_ID, VITE_OLLAMA_ID, VITE_DEEPSEEK_ID, VITE_GITHUB_ID];

export const C2C_ROBOT_COLLECT = prefixRobotIDs(ROBOT_COLLECT);

export const REQUEST_TIMEOUT_MS = 15000;

export const StoreKey = {
  Access: "access-control",
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
      avatar: "🌟",
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

/**
 * 模型提供者到API类的映射
 * @type {Object.<string, typeof OpenAiApi>}
 */
export const API_CLASS_MAP = {
  [ModelProvider.DeepSeek]: DeepSeekApi,
  [ModelProvider.ZhiPu]: ZhiPuApi,
  [ModelProvider.ZeroOne]: ZeroOneApi,
  [ModelProvider.Qwen]: QwenApi,
  [ModelProvider.Ollama]: OllamaApi,
  [ModelProvider.GitHub]: GitHubApi,
  [ModelProvider.OpenAI]: OpenAiApi,
};
