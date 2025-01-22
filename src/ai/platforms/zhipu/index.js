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
    let openaiUrl = useAccessStore(this.provider).openaiUrl;
    return openaiUrl + ChatGLMPath.ChatPath;
  }
}
