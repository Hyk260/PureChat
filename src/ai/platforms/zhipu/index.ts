import { OpenAIAPIClient } from "@/ai/platforms/openai/index"

import type { Provider } from "@/ai/types"

export class ZhiPuApi extends OpenAIAPIClient {
  constructor(provider: Provider) {
    super(provider)
  }
}
