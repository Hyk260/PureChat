import { OpenAI } from "./providers/openai"
import { OllamaAI } from "./providers/ollama"
// import { DeepSeekAI } from './providers/deepseek';
// import { GithubAI } from './providers/github';
// import { GoogleAI } from './providers/google';
// import { QwenAI } from './providers/qwen';
// import { ZeroOneAI } from './providers/zeroone';
// import { ZhipuAI } from './providers/zhipu';

export const providerRuntimeMap = {
  // deepseek: DeepSeekAI,
  // github: GithubAI,
  // google: GoogleAI,
  ollama: OllamaAI,
  openai: OpenAI,
  // qwen: QwenAI,
  // zeroone: ZeroOneAI,
  // zhipu: ZhipuAI,
}
