import { useWebSearchStore } from "@/stores/modules/websearch"
import { WebSearchProviderId, WebSearchState } from "@/stores/modules/websearch/type"

import { WebSearchProviderResponse } from "./types"

export default abstract class BaseWebSearchProvider {
  protected provider: WebSearchProviderId
  protected apiHost?: string
  protected apiKey: string

  constructor(provider: WebSearchProviderId) {
    this.provider = provider
    this.apiKey = this.getApiKey()
    this.apiHost = this.getApiHost()
  }

  abstract search(
    query: string,
    websearch: WebSearchState,
    httpOptions?: RequestInit
  ): Promise<WebSearchProviderResponse>

  /**
   * 获取当前 provider 的 API 密钥
   */
  public getApiKey() {
    const config = useWebSearchStore().getProviderConfig
    return config?.apiKey || ""
  }

  /**
   * 获取当前 provider 的 API 主机地址
   */
  public getApiHost() {
    const config = useWebSearchStore().getProviderConfig
    return config?.apiHost || ""
  }
}
