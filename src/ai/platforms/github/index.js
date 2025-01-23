import { ChatGPTApi } from "@/ai/platforms/openai/index";
import { GitHubConfig } from './config';

export const GitHubPath = {
  ChatPath: "chat/completions",
};

export class GitHubApi extends ChatGPTApi {
  constructor(provider) {
    super(provider);
  }
  getPath() {
    return GitHubConfig().openaiUrl + GitHubPath.ChatPath;
  }
}
