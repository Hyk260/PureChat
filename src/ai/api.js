import { ModelProvider, API_CLASS_MAP } from "@/ai/constant";
import { useAccessStore } from "@/ai/utils";
import { useRobotStore } from '@/stores/index';

/**
 * ClientApi 类用于管理聊天模型提供者及其配置。
 */
export class ClientApi {
  /**
   * 创建 ClientApi 的实例。
   * @param {ModelProvider} [provider=ModelProvider.OpenAI] - 要使用的模型提供者。
   * @throws {Error} 如果提供者无效或初始化失败。
   */
  constructor(provider = ModelProvider.OpenAI) {
    try {
      this._config = useAccessStore(provider);
      this._prompts = useRobotStore().currentProviderPrompt
      this.llm = this.createLLM(provider);
    } catch (error) {
      throw new Error(`初始化 ClientApi 失败: ${error.message}`);
    }
  }

  /**
   * 根据提供者创建相应的语言模型实例。
   * @param {ModelProvider} provider - 要使用的模型提供者。
   * @returns {Object} 相应 API 类的实例。
   * @throws {Error} 如果提供者无效或创建实例失败。
   */
  createLLM(provider) {
    const ApiClass = API_CLASS_MAP[provider] || API_CLASS_MAP[ModelProvider.OpenAI];
    
    try {
      return new ApiClass(provider);
    } catch (error) {
      throw new Error(`创建语言模型实例失败: ${error.message}`);
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
   * 获取当前模型的提示词列表。
   * @returns {Array} 提示词数组。
   */
  prompts() {
    return this._prompts?.prompt?.filter(t => t.content) || [];
  }

  /**
   * 获取模型的掩码配置。
   * @returns {Array} 掩码配置数组。
   * @todo 实现 masks 功能
   */
  masks() {
    return [];
  }

  /**
   * 分享当前会话或配置。
   * @returns {Promise<Object>} 分享结果。
   * @todo 实现分享功能
   */
  async share() {
    try {
      // TODO: 实现分享功能
      return {};
    } catch (error) {
      throw new Error(`分享失败: ${error.message}`);
    }
  }
}