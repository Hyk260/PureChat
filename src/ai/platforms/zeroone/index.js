import { ChatGPTApi } from "@/ai/platforms/openai/index";
import { useAccessStore } from "@/ai/utils";

export const ZeroOnePath = {
  ChatPath: "v1/chat/completions",
};

export class ChatYiApi extends ChatGPTApi {
  constructor(provider) {
    super(provider);
  }
  getPath() {
    let baseUrl = useAccessStore(this.provider).openaiUrl;
    if (baseUrl.endsWith("/")) {
      baseUrl = baseUrl.slice(0, -1);
    }
    return `${baseUrl}/${ZeroOnePath.ChatPath}`;
  }
}
