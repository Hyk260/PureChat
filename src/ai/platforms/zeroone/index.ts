import { OpenAI } from "openai"
import { OpenAIAPIClient } from "@/ai/platforms/openai"

import type { Provider } from "model-bank"

export class ZeroOneApi extends OpenAIAPIClient {
  constructor(provider: Provider) {
    super(provider)
  }

  /**
   * 覆盖基类的过滤逻辑，只包含 ZeroOne 模型
   */
  protected shouldIncludeModel(model: OpenAI.Models.Model): boolean {
    const modelId = model.id.toLowerCase()
    return modelId.startsWith("yi-") || modelId.startsWith("yi")
  }
}
