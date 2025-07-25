export const QwenConfig = () => {
  return {
    model: "qwen-plus",
    temperature: 0.6,
    top_p: 1,
    presence_penalty: 0,
    frequency_penalty: 0,
    historyMessageCount: 8,
    token: import.meta.env.VITE_QWEN_API_KEY,
    openaiUrl: import.meta.env.VITE_QWEN_BASE_URL,
  };
};
