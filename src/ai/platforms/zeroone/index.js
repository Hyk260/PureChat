import { ZeroOnePath } from "@/ai/constant";
import { ChatGPTApi } from "@/ai/platforms/openai/index";
import { useAccessStore } from "@/ai/utils";

export class ChatYiApi extends ChatGPTApi {
  constructor(provider) {
    super();
    this.provider = provider;
  }
  path() {
    let openaiUrl = useAccessStore(this.provider).openaiUrl;
    return openaiUrl + ZeroOnePath.ChatPath;
  }
}
