import { OpenAIAPIClient } from "@/ai/platforms/openai"
import { ApiClientFactory } from "./ApiClientFactory"
import { useAccessStore } from "@/ai/utils"

import type { LLMParams, Provider } from "model-bank"

export default class AiProvider {
  public llm: OpenAIAPIClient
  config: LLMParams

  constructor(provider: Provider) {
    this.config = useAccessStore(provider)
    this.llm = ApiClientFactory.create(provider)
  }
}
