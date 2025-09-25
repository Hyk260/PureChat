const { VITE_ZHIPU_API_KEY, VITE_ZHIPU_BASE_URL } = import.meta.env

export const ZhiPuConfig = () => {
  return {
    model: "glm-3-turbo",
    temperature: 1,
    top_p: 0.9,
    max_tokens: 1024,
    historyMessageCount: 8,
    token: VITE_ZHIPU_API_KEY,
    openaiUrl: VITE_ZHIPU_BASE_URL,
  }
}
