import { OpenAI } from "openai"
import { OpenAIAPIClient } from "@/ai/platforms/openai/index"

import type { Provider } from "@/ai/types"

export class DeepSeekApi extends OpenAIAPIClient {
  constructor(provider: Provider) {
    super(provider)
  }

  /**
   * 获取 DeepSeek 模型的 URL
   */
  protected getBaseURL() {
    return super.getBaseURL() || import.meta.env.VITE_DEEPSEEK_BASE_URL
  }

  /**
   * 覆盖基类的过滤逻辑，只包含 DeepSeek 模型
   */
  protected shouldIncludeModel(model: OpenAI.Models.Model): boolean {
    const modelId = model.id.toLowerCase()
    return modelId.startsWith("deepseek-") || modelId.startsWith("deepseek")
  }
}
