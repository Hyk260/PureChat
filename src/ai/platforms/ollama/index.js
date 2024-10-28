import { ChatGPTApi } from "@/ai/platforms/openai/index";

export class OllamaApi extends ChatGPTApi {
  constructor(provider) {
    super();
    this.provider = provider;
  }
}