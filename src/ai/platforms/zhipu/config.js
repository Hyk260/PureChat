export const ZhiPuConfig = {
  model: "glm-3-turbo",
  historyMessageCount: 5,
  temperature: 0.95,
  top_p: 0.7,
  max_tokens: 1024,
  token: import.meta.env.VITE_ZHIPU_API_KEY,
  openaiUrl: import.meta.env.VITE_ZHIPU_BASE_URL,
};
