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
    let openaiUrl = useAccessStore(this.provider).openaiUrl;
    return openaiUrl + ZeroOnePath.ChatPath;
  }
}
