import { API_PROVIDER_MAP } from "@/ai/constant"
import { OpenAiApi } from "@/ai/platforms/openai/index"
import { LLMParams, ModelProvider, ModelProviderKey } from "@/ai/types"
import { useAccessStore } from "@/ai/utils"
import { useRobotStore } from "@/stores/index"

export class ClientApi {
  public llm: OpenAiApi
  _provider: ModelProviderKey
  _config: LLMParams
  _prompts: any

  constructor(provider: ModelProviderKey = ModelProvider.OpenAI) {
    try {
      this._provider = provider
      this._config = useAccessStore(provider)
      this._prompts = useRobotStore().currentProviderPrompt?.prompt
      this.llm = this.createProvider(provider)
    } catch (error) {
      throw new Error(`初始化 ClientApi 失败: ${error.message}`)
    }
  }

  /**
   * 根据提供者创建相应的AI提供者实例
   */
  createProvider(provider: ModelProviderKey) {
    const ProviderClass = API_PROVIDER_MAP[provider]

    if (!ProviderClass) {
      console.warn(`未找到提供者 ${provider}，使用默认的OpenAI提供者`)
      return new OpenAiApi(provider)
    }

    try {
      return new ProviderClass(provider)
    } catch (error) {
      throw new Error(`创建AI提供者实例失败: ${error.message}`)
    }
  }

  config() {
    return this._config
  }

  getProvider() {
    return this._provider
  }

  prompts() {
    return this._prompts?.filter((t) => t.content) || []
  }
}
