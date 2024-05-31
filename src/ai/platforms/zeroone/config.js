export const YiConfig = {
  model: "yi-large",
  temperature: 0.3,
  top_p: 0.9,
  max_tokens: 1024,
  token: process.env.VITE_ZEROONE_API_KEY,
  openaiUrl: process.env.VITE_ZEROONE_BASE_URL,
  historyMessageCount: 5,
};
