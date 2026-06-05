export default {
  settingModel: {
    title: "模型设置",
    submit: "更新模型设置",
    dialog: {
      title: "配置",
      getApiKey: "获取密钥",
      configGuide: "配置教程",
      selectTestModel: "选择测试模型",
      refreshModels: "获取模型列表",
      modelCount: "共 {count} 个模型可用",
      selectedCount: "已选择 {count} 个",
      checkConnection: "检查",
      clearCache: "清除缓存",
      connectionSuccess: "连接成功",
      connectionFailed: "连接失败",
      apiKeyRequired: "请输入 API 密钥",
      updateSuccess: "模型列表更新成功",
    },
    model: {
      title: "模型",
      desc: "{provider} 模型",
    },
    modelList: {
      title: "模型列表",
      desc: "选择的模型会在模型列表中展示",
    },
    apiUrl: {
      title: "API 代理地址",
      ollamaTitle: "Ollama 服务地址",
      githubTitle: "github 服务地址",
      desc: "除默认地址外，必须包含 http(s)://",
    },
    checkPoint: {
      title: "连通性检查",
      desc: "测试 Api Key 与代理地址是否正确填写",
    },
    token: {
      title: "API Key",
      desc: "请填写你的 {provider} API Key",
      placeholder: "{provider} API Key",
      githubPatTitle: "Github PAT",
      githubPatDesc: "填入你的 Github PAT，点击 [这里](https://github.com/settings/tokens) 创建",
      githubPatPlaceholder: "ghp_xxxxxx",
    },
    params: {
      title: "高级参数",
    },
    enableContextCompression: {
      title: "开启自动上下文压缩",
      desc: "当对话消息超过 64,000 tokens 时，自动将历史消息压缩为摘要，节省 60-80% 的 token 用量",
    },
    enableMaxTokens: {
      title: "开启单次回复限制",
    },
    enableReasoningEffort: {
      title: "开启推理强度调整",
    },
    frequencyPenalty: {
      title: "词汇丰富度",
      desc: "值越大，用词越丰富多样；值越低，用词更朴实简单",
    },
    historyCount: {
      title: "附带历史消息数",
      desc: "每次请求携带的历史消息数",
    },
    maxTokens: {
      title: "单次回复限制",
      desc: "单次交互所用的最大 Token 数",
    },
    presencePenalty: {
      title: "表述发散度",
      desc: "值越大，越倾向不同的表达方式，避免概念重复；值越小，越倾向使用重复的概念或叙述，表达更具一致性",
    },
    reasoningEffort: {
      title: "推理强度",
      desc: "值越大，推理能力越强，但可能会增加响应时间和 Token 消耗",
      options: {
        high: "高",
        medium: "中",
        low: "低",
      },
    },
    temperature: {
      title: "创意活跃度",
      desc: "数值越大，回答越有创意和想象力；数值越小，回答越严谨",
      warning: "创意活跃度数值过大，输出可能会产生乱码",
    },
    topP: {
      title: "思维开放度",
      desc: "考虑多少种可能性，值越大，接受更多可能的回答；值越小，倾向选择最可能的回答。不推荐和创意活跃度一起更改",
    },
  },
}
