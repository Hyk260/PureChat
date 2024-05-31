import { CHATYI_ROBOT } from "@/ai/constant";

export const yiModelValue = (models) => {
  return {
    Model: {
      ID: "model",
      Title: "模型 (model)",
      SubTitle: "01.AI 零一万物 模型",
      defaultValue: "",
      options: models.filter((t) => t.provider.convId === CHATYI_ROBOT),
    },
    OpenaiUrl: {
      ID: "openaiUrl",
      Title: "接口地址",
      SubTitle: "除默认地址外，必须包含 http(s)://",
      Placeholder: "https://api.lingyiwanwu.com/",
      defaultValue: "",
    },
    Token: {
      ID: "token",
      Title: "API Key",
      SubTitle: "使用自己的 01.AI 零一万物 API Key",
      Placeholder: "ZeroOne API Key",
      defaultValue: "",
    },
    Temperature: {
      ID: "temperature",
      Title: "发散性和集中性 (temperature)",
      SubTitle: "数值越小，越集中；数值越大，越发散",
      defaultValue: "",
      Range: true,
      step: 0.1,
      min: 0,
      max: 2,
    },
    TopP: {
      ID: "top_p",
      Title: "随机性 (top_p)",
      SubTitle: "数值越小，随机性越弱；数值越大，随机性越强",
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
      max: 8192,
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
