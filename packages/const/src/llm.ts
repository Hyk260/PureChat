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
