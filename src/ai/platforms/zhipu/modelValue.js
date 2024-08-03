import ZeroOne from './models';

const docs = __APP_INFO__.pkg.docs;

export const zhipuModelValue = () => {
  return {
    Model: {
      ID: "model",
      Title: "模型 (model)",
      SubTitle: "ChatGLM 模型",
      defaultValue: "",
      options: ZeroOne,
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
      doubt: `${docs}/guides/model-provider.html#zhipu-api-key`,
    },
    Temperature: {
      ID: "temperature",
      Title: "随机性 (temperature)",
      SubTitle: "值越大，回复越随机",
      defaultValue: "",
      step: 0.01,
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
    // MaxTokens: {
    //   ID: "max_tokens",
    //   Title: "单次回复限制 (max_tokens)",
    //   SubTitle: "单次交互所用的最大 Token 数",
    //   defaultValue: "",
    //   min: 1024,
    //   max: 512000,
    // },
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
