import OpenAI from "./models"

const docs = __APP_INFO__.pkg.docs
const { VITE_OPENAI_PROXY_URL } = import.meta.env

export const OpenAIModelValue = () => {
  return {
    Model: {
      ID: "model",
      Title: "模型列表",
      SubTitle: "选择的模型会在模型列表中展示",
      defaultValue: "",
      collapse: OpenAI.chatModels.map((t) => t.id),
      options: OpenAI,
    },
    OpenaiUrl: {
      ID: "openaiUrl",
      Title: "接口地址",
      SubTitle: "除默认地址外，必须包含 http(s)://",
      Placeholder: VITE_OPENAI_PROXY_URL,
      apiHost: "https://api.openai.com/v1/chat/completions",
      defaultValue: "",
    },
    Token: {
      ID: "token",
      Title: "API Key",
      SubTitle: "请填写你的 OpenAI API Key",
      Placeholder: "OpenAI API Key",
      defaultValue: "",
      apiKey: "https://platform.openai.com/api-keys",
      doubt: `${docs}/guides/model-provider.html#vite-openai-api-key`,
    },
    CheckPoint: {
      ID: "checkPoint",
      Title: "连通性检查",
      SubTitle: "测试 Api Key 与代理地址是否正确填写",
      collapse: "",
    },
    Temperature: {
      ID: "temperature",
      Title: "创意活跃度 (temperature)",
      SubTitle: "数值越大，回答越有创意和想象力；数值越小，回答越严谨",
      defaultValue: "",
      step: 0.1,
      min: 0,
      max: 1,
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
    // MaxTokens: {
    //   ID: "max_tokens",
    //   Title: "单次回复限制 (max_tokens)",
    //   SubTitle: "单次交互所用的最大 Token 数",
    //   defaultValue: "",
    //   min: 1024,
    //   max: 8192,
    // },
    PresencePenalty: {
      ID: "presence_penalty",
      Title: "表述发散度 (presence_penalty)",
      SubTitle: "值越大，越倾向不同的表达方式，避免概念重复；值越小，越倾向使用重复的概念或叙述，表达更具一致性",
      defaultValue: "",
      step: 0.1,
      min: 0,
      max: 2,
    },
    FrequencyPenalty: {
      ID: "frequency_penalty",
      Title: "词汇丰富度 (frequency_penalty)",
      SubTitle: "值越大，用词越丰富多样；值越低，用词更朴实简单",
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
  }
}
