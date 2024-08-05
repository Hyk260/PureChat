import { ChatGPTApi } from "@/ai/platforms/openai/index";
import { useAccessStore } from "@/ai/utils";

export class OllamaApi extends ChatGPTApi {
  constructor(provider) {
    super();
    this.provider = provider;
  }
  path() {
    let openaiUrl = useAccessStore(this.provider).openaiUrl;
    return openaiUrl + "api/chat";
  }
  generateRequestPayload(messages, modelConfig, options) {
    return {
      messages: this.userPromptMessages(messages, modelConfig),
      model: modelConfig.model,
      options: {
        frequency_penalty: 0,
        presence_penalty: 0,
        temperature: modelConfig.temperature,
        top_p: modelConfig.top_p,
      },
      stream: true,
    };
  }
  getHeaders() {
    const headers = {
      "Content-Type": "application/json",
      "x-requested-with": "XMLHttpRequest",
    };
    return headers;
  }
}
