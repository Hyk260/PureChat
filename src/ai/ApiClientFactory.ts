import { OpenAIAPIClient } from "@/ai/platforms/openai"
import { DeepSeekApi } from "@/ai/platforms/deepseek/index"
import { GitHubApi } from "@/ai/platforms/github"
import { MistralApi } from "@/ai/platforms/mistral"
import { OllamaApi } from "@/ai/platforms/ollama"
import { QwenApi } from "@/ai/platforms/qwen"
import { ZeroOneApi } from "@/ai/platforms/zeroone"
import { ZhiPuApi } from "@/ai/platforms/zhipu"

import type { Provider } from "@/ai/types"

/**
 * 创建ApiClient实例的工厂
 */
export class ApiClientFactory {
  /**
   * 创建ApiClient实例
   */
  static create(provider: Provider): OpenAIAPIClient {
    let instance: OpenAIAPIClient

    switch (provider) {
      case "openai":
        instance = new OpenAIAPIClient(provider)
        break
      case "deepseek":
        instance = new DeepSeekApi(provider)
        break
      case "github":
        instance = new GitHubApi(provider)
        break
      case "mistral":
        instance = new MistralApi(provider)
        break
      case "ollama":
        instance = new OllamaApi(provider)
        break
      case "qwen":
        instance = new QwenApi(provider)
        break
      case "zeroone":
        instance = new ZeroOneApi(provider)
        break
      case "zhipu":
        instance = new ZhiPuApi(provider)
        break
      default:
        instance = new OpenAIAPIClient(provider)
        break
    }

    return instance
  }
}
