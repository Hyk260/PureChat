import { ModelProvider } from "@/ai/types/type";
import { OpenAiApi, OpenAIModelValue, OpenaiConfig } from "@/ai/platforms/openai/index";
import { GitHubApi, GitHubModelValue, GitHubConfig } from "@/ai/platforms/github/index";
import { ZeroOneApi, ZeroOneModelValue, ZeroOneConfig } from "@/ai/platforms/zeroone/index";
import { ZhiPuApi, ZhiPuModelValue, ZhiPuConfig } from "@/ai/platforms/zhipu/index";
import { QwenApi, QwenModelValue, QwenConfig } from "@/ai/platforms/qwen/index";
import { OllamaApi, OllamaModelValue, OllamaConfig } from "@/ai/platforms/ollama/index";
import { DeepSeekApi, DeepseekModelValue, DeepseekConfig } from "@/ai/platforms/deepseek/index";
import { MistralApi, MistralModelValue, MistralConfig } from "@/ai/platforms/mistral/index";
import { ROBOT_COLLECT } from '@shared/provider/config';
import { prefixRobotIDs } from "./utils";

export const ROLES = ["system", "user", "assistant"];

export const C2C_ROBOT_COLLECT = prefixRobotIDs(ROBOT_COLLECT);

export const REQUEST_TIMEOUT_MS = 15000;

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

export const AssistantAvatar = {
  [ModelProvider.OpenAI]: "openai.png",
  [ModelProvider.ZhiPu]: "zhipu.png",
  [ModelProvider.ZeroOne]: "zeroone.png",
  [ModelProvider.Qwen]: "qwen.png",
  [ModelProvider.Ollama]: "ollama.svg",
  [ModelProvider.GitHub]: "github.svg",
  [ModelProvider.DeepSeek]: "deepseek.png",
  [ModelProvider.Mistral]: "mistral.png",
};

export const modelConfig = {
  [ModelProvider.OpenAI]: OpenaiConfig(),
  [ModelProvider.GitHub]: GitHubConfig(),
  [ModelProvider.ZhiPu]: ZhiPuConfig(),
  [ModelProvider.ZeroOne]: ZeroOneConfig(),
  [ModelProvider.Qwen]: QwenConfig(),
  [ModelProvider.Ollama]: OllamaConfig(),
  [ModelProvider.DeepSeek]: DeepseekConfig(),
  [ModelProvider.Mistral]: MistralConfig(),
};

export const modelValue = {
  [ModelProvider.OpenAI]: OpenAIModelValue(),
  [ModelProvider.GitHub]: GitHubModelValue(),
  [ModelProvider.ZhiPu]: ZhiPuModelValue(),
  [ModelProvider.ZeroOne]: ZeroOneModelValue(),
  [ModelProvider.Qwen]: QwenModelValue(),
  [ModelProvider.Ollama]: OllamaModelValue(),
  [ModelProvider.DeepSeek]: DeepseekModelValue(),
  [ModelProvider.Mistral]: MistralModelValue(),
};

export const API_PROVIDER_MAP = {
  [ModelProvider.DeepSeek]: DeepSeekApi,
  [ModelProvider.ZhiPu]: ZhiPuApi,
  [ModelProvider.ZeroOne]: ZeroOneApi,
  [ModelProvider.Qwen]: QwenApi,
  [ModelProvider.Ollama]: OllamaApi,
  [ModelProvider.GitHub]: GitHubApi,
  [ModelProvider.OpenAI]: OpenAiApi,
  [ModelProvider.Mistral]: MistralApi,
};