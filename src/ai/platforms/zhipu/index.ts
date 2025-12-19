import { OpenAI } from "openai"
import { OpenAIAPIClient } from "@/ai/platforms/openai"

import type { Provider } from "@/ai/types"

export class ZhiPuApi extends OpenAIAPIClient {
  constructor(provider: Provider) {
    super(provider)
  }

  /**
   * 覆盖基类的过滤逻辑，只包含 ZhiPu 模型
   */
  protected shouldIncludeModel(model: OpenAI.Models.Model): boolean {
    const modelId = model.id.toLowerCase()
    return modelId.startsWith("glm-") || modelId.startsWith("glm")
  }
}
