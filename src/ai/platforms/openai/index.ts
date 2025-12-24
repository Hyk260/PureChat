import { OpenAIBaseClient } from "./OpenAIBaseClient"

import type { Provider } from "model-bank"

export class OpenAIAPIClient extends OpenAIBaseClient {
  constructor(provider: Provider) {
    super(provider)
  }
}
