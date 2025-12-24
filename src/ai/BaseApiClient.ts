import type { Provider } from "model-bank"

/**
 * API客户端的抽象基类.
 * 为特定客户端实现提供通用功能和结构.
 */
export abstract class BaseApiClient {
  public provider: Provider

  constructor(provider: Provider) {
    this.provider = provider
  }
}
