const OllamaAI = {
  chatModels: [
    {
      displayName: "Qwen Chat 7B",
      enabled: true,
      id: "qwen2:7b",
      icon: "tongyi",
      tokens: 32_768,
    },
    {
      displayName: "Llama 3.1 8B",
      enabled: true,
      id: "llama3.1:8b",
      icon: "meta",
      tokens: 128_000,
    },
    // https://github.com/ollama/ollama/blob/main/docs/api.md#request-12
  ],
  checkModel: "llama3.1:8b",
  id: "ollama",
  name: "Ollama",
};

export default OllamaAI;
