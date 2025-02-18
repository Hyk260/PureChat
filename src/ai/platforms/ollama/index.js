import { OpenAiApi } from "@/ai/platforms/openai/index";

export class OllamaApi extends OpenAiApi {
  constructor(provider) {
    super(provider);
  }
}