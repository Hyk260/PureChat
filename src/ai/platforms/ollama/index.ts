import { OpenAIAPIClient } from "@/ai/platforms/openai"

import type { Provider } from "model-bank"

export class OllamaApi extends OpenAIAPIClient {
  constructor(provider: Provider) {
    super(provider)
  }
}
