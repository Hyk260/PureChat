import { Prompt } from "@pure/types"
/**
 * 请求超时时间
 */
export const REQUEST_TIMEOUT_MS = 60000

export const prompt: Prompt[] = [
  {
    id: "0",
    meta: {
      tags: [],
      avatar: "🌟",
      title: "",
      recQuestion: [],
    },
    lang: "cn",
    prompt: [{ role: "system", content: "" }],
  },
]

export const OpenaiPath = {
  ChatPath: "chat/completions", // chatgpt 聊天接口
  UsagePath: "dashboard/billing/usage", // 用量查询，数据单位为 token
  SubsPath: "dashboard/billing/subscription", // 总量查询，数据单位为 token
  ListModelPath: "models", // 查询可用模型
  EmbeddingPath: "embeddings", // 文本向量化
}
