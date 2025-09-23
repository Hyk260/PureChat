import { OpenAiApi } from "@/ai/platforms/openai/index"
import { useAccessStore } from "@/ai/utils"
import { hostPreview } from "@/utils/api"

export * from "./config"
export * from "./modelValue"

export class DeepSeekApi extends OpenAiApi {
  constructor(provider) {
    super(provider)
  }
  getPath(path?: string): string {
    const baseUrl = useAccessStore(this.provider).openaiUrl
    const paths = hostPreview(baseUrl, path)
    return paths
  }
}
