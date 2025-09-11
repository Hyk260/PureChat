import dayjs from "dayjs"

import { useWebSearchStore } from "@/stores/modules/websearch"
import { WebSearchProviderId, WebSearchState } from "@/stores/modules/websearch/type"
import { hasObjectKey } from "@/utils/common"

import WebSearchEngineProvider from "./WebSearchProvider"
import searchTestResult from "./WebSearchProvider/test.json"
import { WebSearchProviderResponse } from "./WebSearchProvider/types"

const { DEV: isDev } = import.meta.env
const searchTestState = false

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
      if (isDev && searchTestState) {
        return searchTestResult
      }
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
