import { OpenAIAPIClient } from "@/ai/platforms/openai/index"

import type { Provider } from "@/ai/types"

export class DeepSeekApi extends OpenAIAPIClient {
  constructor(provider: Provider) {
    super(provider)
  }

  getBaseURL() {
    return super.getBaseURL() || import.meta.env.VITE_DEEPSEEK_BASE_URL
  }
}
