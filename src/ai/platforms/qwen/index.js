import { QwenPath } from "@/ai/constant";
import { ChatGPTApi } from "@/ai/platforms/openai/index";
import { useAccessStore } from "@/ai/utils";

export class QwenApi extends ChatGPTApi {
  constructor(provider) {
    super(provider);
  }
  path() {
    let openaiUrl = useAccessStore(this.provider).openaiUrl;
    return openaiUrl + QwenPath.ChatPath;
  }
  generateRequestPayload(messages, modelConfig, options) {
    return {
      model: modelConfig.model,
      input: {
        messages: this.userPromptMessages(messages, modelConfig),
      },
      parameters: {
        result_format: "message",
        incremental_output: options.stream,
        temperature: modelConfig.temperature,
        top_p: modelConfig.top_p === 1 ? 0.99 : modelConfig.top_p, // qwen top_p is should be < 1
      },
    };
  }
  getHeaders() {
    const headers = {
      "x-requested-with": "XMLHttpRequest",
      "Authorization": `Bearer ${this.accessStore().token.trim()}`,
      "X-DashScope-SSE": "enable",
    };
    return headers;
  }
}
