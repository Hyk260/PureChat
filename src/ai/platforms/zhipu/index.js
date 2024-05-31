import { ChatGLMPath } from "@/ai/constant";
import { ChatGPTApi } from "@/ai/platforms/openai/index";
import { useAccessStore } from "@/ai/utils";

export class ChatZhipuApi extends ChatGPTApi {
  constructor(provider) {
    super();
    this.provider = provider;
  }
  path() {
    let openaiUrl = useAccessStore(this.provider).openaiUrl;
    return openaiUrl + ChatGLMPath.ChatPath;
  }
}
