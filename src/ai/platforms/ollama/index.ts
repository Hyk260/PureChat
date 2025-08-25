import { OpenAiApi } from "@/ai/platforms/openai/index"

export * from "./config"
export * from "./modelValue"

export class OllamaApi extends OpenAiApi {
  constructor(provider) {
    super(provider)
  }
}
