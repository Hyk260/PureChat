import { ModelProvider } from "@/ai/constant";
import { ChatGPTApi } from "@/ai/platforms/openai/index";
import { ChatYiApi } from "@/ai/platforms/zeroone/index";
import { QwenApi } from "@/ai/platforms/qwen/index";
import { ChatZhipuApi } from "@/ai/platforms/zhipu/index";
import { useAccessStore, usePromptStore } from "@/ai/utils";

/**
 * ClientApi 类用于管理聊天模型提供者及其配置。
 */
export class ClientApi {
  /**
   * 创建 ClientApi 的实例。
   * @param {ModelProvider} [provider=ModelProvider.GPT] - 要使用的模型提供者。
   */
  constructor(provider = ModelProvider.GPT) {
    this._config = useAccessStore(provider);
    this._prompts = usePromptStore(provider);
    this.llm = this.createLLM(provider);
  }

  /**
   * 根据提供者创建相应的语言模型实例。
   * @param {ModelProvider} provider - 要使用的模型提供者。
   * @returns {Object} 相应 API 类的实例。
   */
  createLLM(provider) {
    let ApiClass;

    switch (provider) {
      case ModelProvider.ChatGLM:
        ApiClass = ChatZhipuApi;
        break;
      case ModelProvider.ZeroOne:
        ApiClass = ChatYiApi;
        break;
      case ModelProvider.Qwen:
        ApiClass = QwenApi;
        break;
      default:
        ApiClass = ChatGPTApi; // 默认使用 ChatGPTApi
    }

    return new ApiClass(provider);
  }

  /**
   * 获取当前模型提供者的配置。
   * @returns {Object} 配置对象。
   */
  config() {
    return this._config;
  }

  prompts() {
    return this._prompts.prompt?.filter(t => t.content) || [];
  }

  masks() {
    // TODO: 实现 masks 功能
  }

  async share() {

  }
}