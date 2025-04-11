export const DeepseekConfig = () => {
  return {
    model: "deepseek-chat",
    temperature: 0.3,
    top_p: 0.9,
    max_tokens: 1024,
    historyMessageCount: 8,
    presence_penalty: 0,
    frequency_penalty: 0,
    token: import.meta.env.VITE_DEEPSEEK_API_KEY,
    openaiUrl: import.meta.env.VITE_DEEPSEEK_BASE_URL,
  }
};
