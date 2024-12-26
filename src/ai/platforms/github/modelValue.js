import GitHubAI from "./models";

export const githubModelValue = () => {
  return {
    Model: {
      ID: "model",
      Title: "模型 (model)",
      SubTitle: "选择在会话中展示的模型，选择的模型会在模型列表中展示",
      defaultValue: "",
      collapse: GitHubAI.chatModels.map((t) => t.id),
      options: GitHubAI,
    },
    Token: {
      ID: "token",
      Title: "API Key",
      SubTitle: "填入你的 Github PAT，点击 [这里](https://github.com/settings/tokens) 创建",
      Placeholder: "ghp_xxxxxx",
      defaultValue: "",
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
    // MaxTokens: {
    //   ID: "max_tokens",
    //   Title: "单次回复限制 (max_tokens)",
    //   SubTitle: "单次交互所用的最大 Token 数",
    //   defaultValue: "",
    //   min: 1024,
    //   max: 8192,
    // },
    // PresencePenalty: {
    //   ID: "presence_penalty",
    //   Title: "话题新鲜度 (presence_penalty)",
    //   SubTitle: "值越大，越有可能扩展到新话题",
    //   defaultValue: "",
    //   step: 0.1,
    //   min: 0,
    //   max: 2,
    // },
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
