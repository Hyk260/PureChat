const { VITE_DEEPSEEK_API_KEY, VITE_DEEPSEEK_BASE_URL } = import.meta.env

export const DeepseekConfig = () => {
  return {
    model: "deepseek-chat",
    temperature: 0.3,
    top_p: 0.9,
    max_tokens: 1024,
    historyMessageCount: 8,
    presence_penalty: 0,
    frequency_penalty: 0,
    token: VITE_DEEPSEEK_API_KEY,
    openaiUrl: VITE_DEEPSEEK_BASE_URL,
  }
};
