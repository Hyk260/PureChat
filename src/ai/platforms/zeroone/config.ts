const { VITE_ZEROONE_API_KEY, VITE_ZEROONE_BASE_URL } = import.meta.env

export const ZeroOneConfig = {
  model: "yi-large",
  temperature: 1,
  top_p: 0.9,
  max_tokens: 1024,
  historyMessageCount: 8,
  token: VITE_ZEROONE_API_KEY,
  openaiUrl: VITE_ZEROONE_BASE_URL,
}
