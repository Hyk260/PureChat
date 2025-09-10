import { WebSearchProviderId, WebSearchState } from "@/stores/modules/websearch/type"

import BaseWebSearchProvider from "./BaseWebSearchProvider"
import { WebSearchProviderResponse } from "./types"
import WebSearchProviderFactory from "./WebSearchProviderFactory"

export default class WebSearchEngineProvider {
  private sdk: BaseWebSearchProvider
  private parentSpanId: string | undefined

  constructor(provider: WebSearchProviderId, parentSpanId?: string) {
    this.sdk = WebSearchProviderFactory.create(provider)
    this.parentSpanId = parentSpanId
  }

  public async search(
    query: string,
    websearch: WebSearchState,
    httpOptions?: RequestInit
  ): Promise<WebSearchProviderResponse> {
    return await this.sdk.search(query, websearch, httpOptions)
  }
}
