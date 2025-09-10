import { WebSearchProviderId, WebSearchState } from "@/stores/modules/websearch/type"

import BaseWebSearchProvider from "./BaseWebSearchProvider"
import { WebSearchProviderResponse } from "./types"

export interface SearchItem {
  title: string
  url: string
}

export default class LocalSearchProvider extends BaseWebSearchProvider {
  constructor(provider: WebSearchProviderId) {
    if (!provider) {
      throw new Error("Provider is required")
    }
    super(provider)
  }

  public async search(
    query: string,
    websearch: WebSearchState,
    httpOptions?: RequestInit
  ): Promise<WebSearchProviderResponse> {
    try {
      if (__IS_ELECTRON__) {
        /* empty */
      } else {
        return {
          query: query,
          results: [],
        }
      }
    } catch (error) {
      console.error("Local search failed:", error)
      throw new Error(`Search failed: ${error}`)
    } finally {
      console.log("Local search completed")
    }
  }

  protected parseValidUrls(_htmlContent: string): SearchItem[] {
    throw new Error("Not implemented")
  }
}
