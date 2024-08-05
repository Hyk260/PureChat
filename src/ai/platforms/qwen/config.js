export const QwenConfig = {
  model: "qwen-turbo",
  temperature: 0.6,
  top_p: 1,
  // max_tokens: 1024,
  presence_penalty: 0,
  frequency_penalty: 0,
  token: import.meta.env.VITE_QWEN_API_KEY,
  openaiUrl: import.meta.env.VITE_QWEN_BASE_URL,
  historyMessageCount: 1,
};
