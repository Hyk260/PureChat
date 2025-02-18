import { OpenAiApi } from "@/ai/platforms/openai/index";
import { useAccessStore } from "@/ai/utils";

export const ChatGLMPath = {
  ChatPath: "chat/completions",
};

export class ZhiPuApi extends OpenAiApi {
  constructor(provider) {
    super(provider);
  }
  getPath() {
    let baseUrl = useAccessStore(this.provider).openaiUrl;
    if (baseUrl.endsWith("/")) {
      baseUrl = baseUrl.slice(0, -1);
    }
    return `${baseUrl}/${ChatGLMPath.ChatPath}`;
  }
}
