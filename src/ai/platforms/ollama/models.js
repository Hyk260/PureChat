// api https://github.com/ollama/ollama/blob/main/docs/api.md#request-12
const OllamaAI = {
  chatModels: [
    {
      displayName: "Llama 3.1 8B",
      functionCall: true,
      icon: "meta",
      id: "llama3.1:8b",
      tokens: 128_000,
    },
    {
      displayName: "Llama 3.1 70B",
      icon: "meta",
      id: "llama3.1:70b",
      tokens: 128_000,
    },
    {
      displayName: "Llama 3.1 405B",
      icon: "meta",
      id: "llama3.1:405b",
      tokens: 128_000,
    },
    {
      displayName: "Qwen Chat 7B",

      id: "qwen2:7b",
      icon: "qwen",
      tokens: 32_768,
    },
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
