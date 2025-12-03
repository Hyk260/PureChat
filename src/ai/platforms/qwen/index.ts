import { OpenAIAPIClient } from "@/ai/platforms/openai"

import type { Provider } from "@/ai/types"

export class QwenApi extends OpenAIAPIClient {
  constructor(provider: Provider) {
    super(provider)
  }
}
