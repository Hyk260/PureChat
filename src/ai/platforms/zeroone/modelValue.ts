import ZhiPu from './models';

const docs = __APP_INFO__.pkg.docs;
const { VITE_ZEROONE_BASE_URL } = import.meta.env;

export const ZeroOneModelValue = () => {
  return {
    Model: {
      ID: "model",
      Title: "模型列表",
      SubTitle: "选择的模型会在模型列表中展示",
      defaultValue: "",
      collapse: ZhiPu.chatModels.map((t) => t.id),
      options: ZhiPu,
    },
    OpenaiUrl: {
      ID: "openaiUrl",
      Title: "接口地址",
      SubTitle: "除默认地址外，必须包含 http(s)://",
      Placeholder: VITE_ZEROONE_BASE_URL || "",
      defaultValue: "",
    },
    Token: {
      ID: "token",
      Title: "API Key",
      SubTitle: "请填写你的 01.AI API Key",
      Placeholder: "ZeroOne API Key",
      defaultValue: "",
      doubt: `${docs}/guides/model-provider.html#vite-zeroone-api-key`,
    },
    Temperature: {
      ID: "temperature",
      Title: "创意活跃度 (temperature)",
      SubTitle: "数值越大，回答越有创意和想象力；数值越小，回答越严谨",
      defaultValue: "",
      step: 0.1,
      min: 0,
      max: 2,
    },
    TopP: {
      ID: "top_p",
      Title: "思维开放度 (top_p)",
      SubTitle:
        "考虑多少种可能性，值越大，接受更多可能的回答；值越小，倾向选择最可能的回答。不推荐和创意活跃度一起更改",
      defaultValue: "",
      step: 0.1,
      min: 0,
      max: 1,
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
