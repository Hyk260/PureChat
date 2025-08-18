import GitHubAI from "./models";

const { VITE_GITHUB_PROXY_URL } = import.meta.env

export const GitHubModelValue = () => {
  return {
    Model: {
      ID: "model",
      Title: "模型列表",
      SubTitle: "选择的模型会在模型列表中展示",
      defaultValue: "",
      collapse: GitHubAI.chatModels.map((t) => t.id),
      options: GitHubAI,
    },
    OpenaiUrl: {
      ID: "openaiUrl",
      Title: "github 服务地址",
      SubTitle: "除默认地址外，必须包含 http(s)://",
      Placeholder: VITE_GITHUB_PROXY_URL,
      defaultValue: "",
    },
    Token: {
      ID: "token",
      Title: "Github PAT",
      SubTitle: "填入你的 Github PAT，点击 [这里](https://github.com/settings/tokens) 创建",
      Placeholder: "ghp_xxxxxx",
      defaultValue: "",
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
      SubTitle:
        "值越大，越倾向不同的表达方式，避免概念重复；值越小，越倾向使用重复的概念或叙述，表达更具一致性",
      defaultValue: "",
      step: 0.1,
      min: 0,
      max: 2,
    },
    // FrequencyPenalty: {
    //   ID: "frequency_penalty",
    //   Title: "频率惩罚度 (frequency_penalty)",
    //   SubTitle: "值越大，越有可能降低重复字词",
    //   defaultValue: "",
    //   step: 0.1,
    //   min: 0,
    //   max: 2,
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
