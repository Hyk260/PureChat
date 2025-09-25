export const OllamaConfig = () => {
  return {
    model: "llama3.1:8b",
    temperature: 1,
    top_p: 1,
    presence_penalty: 0,
    frequency_penalty: 0,
    historyMessageCount: 12,
    token: "",
    openaiUrl: import.meta.env.VITE_OLLAMA_PROXY_URL,
  }
}
