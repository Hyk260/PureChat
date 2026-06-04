export default {
  settingModel: {
    title: "Model Settings",
    submit: "Update Model Settings",
    dialog: {
      title: "Configuration",
      getApiKey: "Get API Key",
      configGuide: "Setup Guide",
      selectTestModel: "Select test model",
      refreshModels: "Refresh model list",
      modelCount: "{count} models available",
      selectedCount: "{count} selected",
      updateSuccess: "Model list updated successfully",
    },
    model: {
      title: "Model",
      desc: "{provider} model",
    },
    modelList: {
      title: "Model List",
      desc: "Selected models will appear in the model list",
    },
    apiUrl: {
      title: "API Proxy URL",
      ollamaTitle: "Ollama Service URL",
      githubTitle: "GitHub Service URL",
      desc: "Must include http(s):// unless using the default address",
    },
    checkPoint: {
      title: "Connectivity Check",
      desc: "Test whether the API Key and proxy URL are configured correctly",
    },
    token: {
      title: "API Key",
      desc: "Enter your {provider} API Key",
      placeholder: "{provider} API Key",
      githubPatTitle: "GitHub PAT",
      githubPatDesc: "Enter your GitHub PAT. Click [here](https://github.com/settings/tokens) to create one",
      githubPatPlaceholder: "ghp_xxxxxx",
    },
    params: {
      title: "Advanced Parameters",
    },
    enableContextCompression: {
      title: "Enable Auto Context Compression",
      desc: "Automatically compress historical messages into summaries when conversation exceeds 64,000 tokens, saving 60-80% token usage",
    },
    enableMaxTokens: {
      title: "Enable Max Tokens Limit",
    },
    enableReasoningEffort: {
      title: "Enable Reasoning Effort Adjustment",
    },
    frequencyPenalty: {
      title: "Vocabulary Richness",
      desc: "The higher the value, the more diverse and rich the vocabulary; the lower the value, the simpler and more straightforward the language.",
    },
    historyMessageCount: {
      title: "History Message Count",
      desc: "Number of historical messages included in each request",
    },
    maxTokens: {
      title: "Max Tokens Limit",
      desc: "The maximum number of tokens used for each interaction",
    },
    presencePenalty: {
      title: "Expression Divergence",
      desc: "The higher the value, the more inclined to use different expressions and avoid concept repetition; the lower the value, the more inclined to use repeated concepts or narratives, resulting in more consistent expression.",
    },
    reasoningEffort: {
      title: "Reasoning Effort",
      desc: "Higher values enhance reasoning ability but may increase response time and token usage.",
      options: {
        high: "High",
        medium: "Medium",
        low: "Low",
      },
    },
    temperature: {
      title: "Creativity Level",
      desc: "The higher the value, the more creative and imaginative the responses; the lower the value, the more rigorous the responses.",
      warning: "If the creativity level is set too high, the output may become garbled.",
    },
    topP: {
      title: "Openness to Ideas",
      desc: "How many possibilities to consider; a higher value accepts more potential answers, while a lower value tends to choose the most likely answer. It is not recommended to change this alongside the creativity level.",
    },
  },
}
