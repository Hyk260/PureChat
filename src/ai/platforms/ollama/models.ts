// api https://github.com/ollama/ollama/blob/main/docs/api.md#request-12
const OllamaAI = {
  chatModels: [
    {
      displayName: "Llama 3.1 8B",
      functionCall: true,
      icon: "meta",
      id: "llama3.1:8b",
      tokens: 128_000,
      webSearch: true,
    },
    {
      displayName: "Llama 3.1 70B",
      icon: "meta",
      id: "llama3.1:70b",
      tokens: 128_000,
    },
    // {
    //   displayName: "Llama 3.1 405B",
    //   icon: "meta",
    //   id: "llama3.1:405b",
    //   tokens: 128_000,
    // },
    {
       tokens: 32_768,
      displayName: "Qwen Chat 7B",
      id: "qwen2:7b",
      icon: "qwen",
    },
    {
      tokens: 128_000,
      description: 'Qwen2.5 是阿里巴巴的新一代大规模语言模型，以优异的性能支持多元化的应用需求。',
      displayName: 'Qwen2.5 72B',
      id: 'qwen2.5:72b',
      icon: "qwen",
    },
    {
      tokens: 32_768,
      description: 'DeepSeek V2 是高效的 Mixture-of-Experts 语言模型，适用于经济高效的处理需求。',
      displayName: 'DeepSeek V2 16B',
      id: 'deepseek-v2',
      icon: "deepseek",
    },
    // {
    //   tokens: 128_000,
    //   description: 'DeepSeek V2 236B 是 DeepSeek 的设计代码模型，提供强大的代码生成能力。',
    //   displayName: 'DeepSeek V2 236B',
    //   id: 'deepseek-v2:236b',
    // },
    {
      tokens: 128_000,
      description:
        'DeepSeek Coder V2 是开源的混合专家代码模型，在代码任务方面表现优异，与 GPT4-Turbo 相媲美。',
      displayName: 'DeepSeek Coder V2 16B',
      id: 'deepseek-coder-v2',
      icon: "deepseek",
    },
    // {
    //   tokens: 128_000,
    //   description:
    //     'DeepSeek Coder V2 是开源的混合专家代码模型，在代码任务方面表现优异，与 GPT4-Turbo 相媲美。',
    //   displayName: 'DeepSeek Coder V2 236B',
    //   id: 'deepseek-coder-v2:236b',
    // },
    // {
    //   tokens: "",
    //   description: '',
    //   displayName: 'Mistral',
    //   id: 'mistral-small3.1:24b-instruct-2503-q4_K_M',
    //   icon: "mistral",
    // },
  ],
  checkModel: "llama3.1:8b",
  description:
    "Ollama 提供的模型广泛涵盖代码生成、数学运算、多语种处理和对话互动等领域，支持企业级和本地化部署的多样化需求。",
  modelsUrl: "https://ollama.com/library",
  url: "https://ollama.com",
  id: "ollama",
  name: "Ollama",
};

export default OllamaAI;
