import { OpenAIBaseClient } from "./OpenAIBaseClient"

import type { Provider } from "@/ai/types"

export class OpenAIAPIClient extends OpenAIBaseClient {
  constructor(provider: Provider) {
    super(provider)
  }
}
