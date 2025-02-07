import { ChatGPTApi } from "@/ai/platforms/openai/index";
import { useAccessStore } from "@/ai/utils";

export const ChatGLMPath = {
  ChatPath: "chat/completions",
};

export class ChatZhipuApi extends ChatGPTApi {
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
