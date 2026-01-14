import { OpenAI } from "openai"
import { OpenAIAPIClient } from "@/ai/platforms/openai"

import type { Provider } from "model-bank"

export class OllamaApi extends OpenAIAPIClient {
  constructor(provider: Provider) {
    super(provider)
  }

  protected shouldIncludeModel(model: OpenAI.Models.Model): boolean {
    // const modelId = model.id.toLowerCase()
    // return modelId.startsWith("glm-") || modelId.startsWith("glm")
    return true
  }
}
