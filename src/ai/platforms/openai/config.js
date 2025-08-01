const { VITE_OPENAI_API_KEY, VITE_OPENAI_PROXY_URL } = import.meta.env

export const OpenaiConfig = () => {
  return {
    model: "gpt-4o-mini",
    /**
     * 生成文本的随机度量，用于控制文本的创造性和多样性
     * @default 0.6
     */
    temperature: 0.6,
    /**
     * 控制生成文本中最高概率的单个 token
     * @default 1
     */
    top_p: 1,
    /**
     * 生成文本的最大长度
     */
    max_tokens: 1024,
    /**
     * 控制生成文本中的惩罚系数，用于减少主题的变化
     * @default 0
     */
    presence_penalty: 0,
    /**
     * 控制生成文本中的惩罚系数，用于减少重复性
     * @default 0
     */
    frequency_penalty: 0,
    /**
     * 附带历史消息数
     * @default 8
     */
    historyMessageCount: 8,
    token: VITE_OPENAI_API_KEY,
    openaiUrl: VITE_OPENAI_PROXY_URL,
  };
};
