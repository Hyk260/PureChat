import { OpenAiApi } from "@/ai/platforms/openai/index"
import { useAccessStore } from "@/ai/utils"
import { hostPreview } from "@/utils/api"

export * from "./config"
export * from "./modelValue"

export class QwenApi extends OpenAiApi {
  constructor(provider) {
    super(provider)
  }
  getPath() {
    const baseUrl = useAccessStore(this.provider).openaiUrl
    const paths = hostPreview(baseUrl)
    return paths
  }
}
