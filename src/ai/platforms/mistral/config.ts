const { VITE_MISTRAL_API_KEY, VITE_MISTRAL_BASE_URL } = import.meta.env

export const MistralConfig = () => {
  return {
    model: "open-mistral-nemo",
    temperature: 1,
    top_p: 0.9,
    max_tokens: 1024,
    historyMessageCount: 8,
    token: VITE_MISTRAL_API_KEY,
    openaiUrl: VITE_MISTRAL_BASE_URL,
  }
}
