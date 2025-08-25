import { OpenAiApi } from "@/ai/platforms/openai/index"
import { useAccessStore } from "@/ai/utils"

export * from "./config"
export * from "./modelValue"

export const GitHubPath = {
  ChatPath: "chat/completions",
}

export class GitHubApi extends OpenAiApi {
  constructor(provider) {
    super(provider)
  }
  getPath() {
    const baseUrl = useAccessStore(this.provider).openaiUrl

    return `${baseUrl}/${GitHubPath.ChatPath}`
  }
}
