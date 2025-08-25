import { useWebSearchStore } from "@/stores/index"

/**
 * BaseWebSearchProvider 是所有 Web 搜索提供者的基类。
 * 负责统一管理 provider、apiKey 和 apiHost 的获取。
 */
export default class BaseWebSearchProvider {
  /**
   * 提供者名称
   * @type {string} tavily
   */
  provider
  /**
   * API 密钥
   * @type {string} tvly-xxx
   */
  apiKey
  /**
   * API 主机地址
   * @type {string} 'https://api.xxx.ai',
   */
  apiHost
  /**
   * 构造函数，初始化 provider、apiKey 和 apiHost
   * @param {string} provider - 提供者名称
   */
  constructor(provider) {
    this.provider = provider
    this.apiKey = this.getApiKey()
    this.apiHost = this.getApiHost()
  }
  /**
   * 获取当前 provider 的 API 密钥
   * @returns {string} API 密钥
   */
  getApiKey() {
    const config = useWebSearchStore().getProviderConfig
    return config?.apiKey || ""
  }
  /**
   * 获取当前 provider 的 API 主机地址
   * @returns {string} API 主机地址
   */
  getApiHost() {
    const config = useWebSearchStore().getProviderConfig
    return config?.apiHost || ""
  }
}
