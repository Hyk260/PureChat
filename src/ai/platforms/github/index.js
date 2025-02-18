import { OpenAiApi } from "@/ai/platforms/openai/index";
import { useAccessStore } from "@/ai/utils";

export const GitHubPath = {
  ChatPath: "chat/completions",
};

export class GitHubApi extends OpenAiApi {
  constructor(provider) {
    super(provider);
  }
  getPath() {
    let baseUrl = useAccessStore(this.provider).openaiUrl;
    
    return `${baseUrl}/${GitHubPath.ChatPath}`;
  }
}
