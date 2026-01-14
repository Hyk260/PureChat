import { OpenAI } from "openai"
import { OpenAIAPIClient } from "@/ai/platforms/openai"

import type { Provider } from "model-bank"

export class MistralApi extends OpenAIAPIClient {
  constructor(provider: Provider) {
    super(provider)
  }

  protected shouldIncludeModel(model: OpenAI.Models.Model): boolean {
    const modelId = model.id.toLowerCase()
    return modelId.startsWith("mistral-") || modelId.startsWith("mistral") || modelId.startsWith("open-mistral")
  }
}
