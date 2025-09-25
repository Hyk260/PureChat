const { VITE_QWEN_API_KEY, VITE_QWEN_BASE_URL } = import.meta.env

export const QwenConfig = () => {
  return {
    model: "qwen-plus",
    temperature: 1,
    top_p: 0.9,
    presence_penalty: 0,
    frequency_penalty: 0,
    historyMessageCount: 8,
    token: VITE_QWEN_API_KEY,
    openaiUrl: VITE_QWEN_BASE_URL,
  }
}
