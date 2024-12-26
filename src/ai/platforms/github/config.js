const {
  VITE_GITHUB_API_KEY,
  VITE_GITHUB_PROXY_URL
} = import.meta.env

export const GitHubConfig = () => {
  return {
    model: "gpt-4o-mini",
    temperature: 0.6,
    top_p: 1,
    max_tokens: 1024,
    presence_penalty: 0,
    frequency_penalty: 0,
    historyMessageCount: 10,
    token: VITE_GITHUB_API_KEY,
    openaiUrl: VITE_GITHUB_PROXY_URL,
  };
};
