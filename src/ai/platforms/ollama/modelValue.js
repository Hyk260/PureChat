import OllamaAI from "./models";

const docs = __APP_INFO__.pkg.docs;
const ollama_proxy_url = import.meta.env.VITE_OLLAMA_PROXY_URL;

export const OllamaModelValue = () => {
  return {
    Model: {
      ID: "model",
      Title: "模型列表",
      SubTitle: "选择的模型会在模型列表中展示",
      defaultValue: "",
      collapse: OllamaAI.chatModels.map((t) => t.id),
      options: OllamaAI,
    },
    OpenaiUrl: {
      ID: "openaiUrl",
      Title: "Ollama 服务地址",
      SubTitle: "除默认地址外，必须包含 http(s)://",
      Placeholder: ollama_proxy_url,
      defaultValue: "",
      doubt: `${docs}/guides/olama-usage`,
    },
    Temperature: {
      ID: "temperature",
      Title: "随机性 (temperature)",
      SubTitle: "值越大，回复越随机",
      defaultValue: "",
      step: 0.1,
      min: 0,
      max: 1,
    },
    TopP: {
      ID: "top_p",
      Title: "核采样 (top_p)",
      SubTitle: "与随机性类似，但不要和随机性一起更改",
      defaultValue: "",
      step: 0.1,
      min: 0,
      max: 1,
    },
    PresencePenalty: {
      ID: "presence_penalty",
      Title: "话题新鲜度 (presence_penalty)",
      SubTitle: "值越大，越有可能扩展到新话题",
      defaultValue: "",
      step: 0.1,
      min: 0,
      max: 2,
    },
    FrequencyPenalty: {
      ID: "frequency_penalty",
      Title: "频率惩罚度 (frequency_penalty)",
      SubTitle: "值越大，越有可能降低重复字词",
      defaultValue: "",
      step: 0.1,
      min: 0,
      max: 2,
    },
    historyMessageCount: {
      ID: "historyMessageCount",
      Title: "附带历史消息数",
      SubTitle: "每次请求携带的历史消息数",
      defaultValue: "",
      step: 1,
      min: 1,
      max: 64,
    },
  };
};
