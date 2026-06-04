const { VITE_MINIMAX_API_KEY, VITE_MINIMAX_BASE_URL } = import.meta.env

export const MinimaxConfig = {
  model: "MiniMax-M2",
  temperature: 1,
  top_p: 0.9,
  max_tokens: 1024,
  historyMessageCount: 8,
  presence_penalty: 0,
  frequency_penalty: 0,
  token: VITE_MINIMAX_API_KEY,
  openaiUrl: VITE_MINIMAX_BASE_URL,
}
