import { CHATGLM_ROBOT } from "@/ai/constant";

export const zhipuModelValue = (models) => {
  return {
    Model: {
      ID: "model",
      Title: "模型 (model)",
      SubTitle: "ChatGLM 模型",
      defaultValue: "",
      options: models.filter((t) => t.provider.convId === CHATGLM_ROBOT),
    },
    OpenaiUrl: {
      ID: "openaiUrl",
      Title: "接口地址",
      SubTitle: "除默认地址外，必须包含 http(s)://",
      Placeholder: "https://open.bigmodel.cn",
      defaultValue: "",
    },
    Token: {
      ID: "token",
      Title: "API Key",
      SubTitle: "使用自己的 ZhiPu API Key",
      Placeholder: "ZhiPu API Key",
      defaultValue: "",
    },
    Temperature: {
      ID: "temperature",
      Title: "随机性 (temperature)",
      SubTitle: "值越大，回复越随机",
      defaultValue: "",
      Range: true,
      step: 0.01,
      min: 0,
      max: 1,
    },
    TopP: {
      ID: "top_p",
      Title: "核采样 (top_p)",
      SubTitle: "与随机性类似，但不要和随机性一起更改",
      defaultValue: "",
      Range: true,
      step: 0.1,
      min: 0,
      max: 1,
    },
    MaxTokens: {
      ID: "max_tokens",
      Title: "单次回复限制 (max_tokens)",
      SubTitle: "单次交互所用的最大 Token 数",
      defaultValue: "",
      Number: true,
      min: 1024,
      max: 512000,
    },
    historyMessageCount: {
      ID: "historyMessageCount",
      Title: "附带历史消息数",
      SubTitle: "每次请求携带的历史消息数",
      defaultValue: "",
      Range: true,
      step: 1,
      min: 1,
      max: 24,
    },
  };
};
