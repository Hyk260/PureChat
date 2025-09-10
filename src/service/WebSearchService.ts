import dayjs from "dayjs"

import { useWebSearchStore } from "@/stores/modules/websearch"
import { WebSearchProviderId, WebSearchState } from "@/stores/modules/websearch/type"
import { hasObjectKey } from "@/utils/common"

import WebSearchEngineProvider from "./WebSearchProvider"
import { WebSearchProviderResponse } from "./WebSearchProvider/types"

/**
 * 提供网络搜索相关功能的服务类
 */
class WebSearchService {
  /**
   * 获取当前存储的网络搜索状态
   */
  getWebSearchState(): WebSearchState {
    return useWebSearchStore()
  }

  /**
   * 检查网络搜索功能是否启用
   * @returns 如果默认搜索提供商已启用则返回true，否则返回false
   */
  public isWebSearchEnabled(): boolean {
    const { defaultProvider, providers } = this.getWebSearchState()
    const provider = providers.find((provider) => provider.id === defaultProvider)

    if (!provider) {
      return false
    }

    if (provider.id.startsWith("local-")) {
      return true
    }

    if (hasObjectKey(provider, "apiKey")) {
      return provider.apiKey !== ""
    }

    if (hasObjectKey(provider, "apiHost")) {
      return provider.apiHost !== ""
    }

    return false
  }

  /**
   * 获取当前默认的网络搜索提供商
   * @returns 网络搜索提供商
   */
  public getWebSearchProvider() {
    const { defaultProvider, providers } = this.getWebSearchState()
    const provider = providers.find((provider) => provider.id === defaultProvider)

    return provider
  }

  /**
   * 使用指定的提供商执行网络搜索
   */
  public async search(
    provider: WebSearchProviderId,
    query: string,
    httpOptions?: RequestInit,
    spanId?: string
  ): Promise<WebSearchProviderResponse> {
    const websearch = this.getWebSearchState()
    const webSearchEngine = new WebSearchEngineProvider(provider, spanId)

    let formattedQuery = query
    if (websearch.searchWithTime) {
      formattedQuery = `today is ${dayjs().format("YYYY-MM-DD")} \r\n ${query}`
    }

    try {
      return await webSearchEngine.search(formattedQuery, websearch, httpOptions)
    } catch (error) {
      console.error("Search failed:", error)
      return {
        results: [],
      }
    }
  }

  /**
   * 检查搜索提供商是否正常工作
   * @returns 如果提供商可用返回true，否则返回false
   */
  public async checkSearch(provider: WebSearchProviderId): Promise<{ valid: boolean; error?: any }> {
    try {
      const response = await this.search(provider, "test query")
      console.log("Search response:", response)
      return { valid: response.results.length > 0, error: undefined }
    } catch (error) {
      return { valid: false, error }
    }
  }
}

export default new WebSearchService()
