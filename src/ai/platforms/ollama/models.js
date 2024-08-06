const OllamaAI = {
  chatModels: [
    {
      displayName: 'Qwen Chat 7B',
      enabled: true,
      id: 'qwen2:7b',
      tokens: 32_768,
    },
    {
      enabled: true,
      id: 'llama3.1:8b',
    }
  ],
  checkModel: 'qwen2:7b',
  id: 'ollama',
  name: 'Ollama',
};

export default OllamaAI;
