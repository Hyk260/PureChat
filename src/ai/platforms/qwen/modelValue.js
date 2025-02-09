import Qwen from './models';

const docs = __APP_INFO__.pkg.docs;

export const QwenModelValue = () => {
  return {
    Model: {
      ID: "model",
      Title: "模型 (model)",
      SubTitle: "选择的模型会在模型列表中展示",
      defaultValue: "",
      collapse: Qwen.chatModels.map((t) => t.id),
      options: Qwen,
    },
    OpenaiUrl: {
      ID: "openaiUrl",
      Title: "接口地址",
      SubTitle: "除默认地址外，必须包含 http(s)://",
      Placeholder: "",
      defaultValue: "",
    },
    Token: {
      ID: "token",
      Title: "API Key",
      SubTitle: "请填写你的 Qwen API Key",
      Placeholder: "Qwen API Key",
      defaultValue: "",
      // doubt: '',
    },
    Temperature: {
      ID: "temperature",
      Title: "发散性和集中性 (temperature)",
      SubTitle: "数值越小，越集中；数值越大，越发散",
      defaultValue: "",
      step: 0.1,
      min: 0,
      max: 2,
    },
    TopP: {
      ID: "top_p",
      Title: "随机性 (top_p)",
      SubTitle: "数值越小，随机性越弱；数值越大，随机性越强",
      defaultValue: "",
      step: 0.1,
      min: 0,
      max: 1,
    },
    // MaxTokens: {
    //   ID: "max_tokens",
    //   Title: "单次回复限制 (max_tokens)",
    //   SubTitle: "单次交互所用的最大 Token 数",
    //   defaultValue: "",
    //   min: 1024,
    //   max: 8192,
    // },
    historyMessageCount: {
      ID: "historyMessageCount",
      Title: "附带历史消息数",
      SubTitle: "每次请求携带的历史消息数",
      defaultValue: "",
      step: 1,
      min: 1,
      max: 24,
    },
  };
};
