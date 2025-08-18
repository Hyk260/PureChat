import { ModelProvider, ModelProviderKey } from "@/ai/types/type";
import { API_PROVIDER_MAP } from "@/ai/constant";
import { useAccessStore } from "@/ai/utils";
import { useRobotStore } from '@/stores/index';
import { OpenAiApi } from "@/ai/platforms/openai/index";

/**
 * 客户端API类
 * 统一的API入口点，负责创建和管理不同的AI提供者实例
 */
export class ClientApi {
  public llm: OpenAiApi;
  _provider: ModelProviderKey;
  _config: any;
  _prompts: any;

  constructor(provider = ModelProvider.OpenAI) {
    try {
      this._provider = provider;
      this._config = useAccessStore(provider);
      this._prompts = useRobotStore().currentProviderPrompt
      this.llm = this.createProvider(provider)
    } catch (error) {
      throw new Error(`初始化 ClientApi 失败: ${error.message}`);
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

  /**
   * 获取当前模型提供者的配置。
   * @returns {Object} 配置对象。
   */
  config() {
    return this._config;
  }
  
  /**
   * 获取当前提供者标识符
   * @returns {string} 提供者标识符
   */
  getProvider() {
    return this._provider
  }

  /**
   * 获取当前模型的提示词列表。
   * @returns {Array} 提示词数组。
   */
  prompts() {
    return this._prompts?.prompt?.filter(t => t.content) || [];
  }
}