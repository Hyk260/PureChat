import { OpenAiApi } from "@/ai/platforms/openai/index"
import { useAccessStore } from "@/ai/utils"

export * from "./config"
export * from "./modelValue"

export const DeepSeekPath = {
  ChatPath: "chat/completions",
}

export class DeepSeekApi extends OpenAiApi {
  constructor(provider) {
    super(provider)
  }
  getPath() {
    let baseUrl = useAccessStore(this.provider).openaiUrl
    if (baseUrl.endsWith("/")) {
      baseUrl = baseUrl.slice(0, -1)
    }
    return `${baseUrl}/${DeepSeekPath.ChatPath}`
  }
}
