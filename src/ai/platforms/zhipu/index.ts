import { OpenAIAPIClient } from "@/ai/platforms/openai"

import type { Provider } from "@/ai/types"

export class ZhiPuApi extends OpenAIAPIClient {
  constructor(provider: Provider) {
    super(provider)
  }
}
