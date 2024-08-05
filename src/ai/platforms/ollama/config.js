export const OllamaConfig = {
  model: "qwen2:7b",
  temperature: 0.6,
  top_p: 1,
  presence_penalty: 0,
  frequency_penalty: 0,
  historyMessageCount: 1,
  openaiUrl: import.meta.env.VITE_OLLAMA_PROXY_URL,
};
