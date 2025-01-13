import { GitHubPath } from "@/ai/constant";
import { ChatGPTApi } from "@/ai/platforms/openai/index";
import { GitHubConfig } from './config';

export class GitHubApi extends ChatGPTApi {
  constructor(provider) {
    super();
    this.provider = provider;
  }
  path() {
    return GitHubConfig().openaiUrl + GitHubPath.ChatPath;
  }
}
