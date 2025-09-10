import { TavilyClient } from "@agentic/tavily"

import { WebSearchProviderId, WebSearchState } from "@/stores/modules/websearch/type"

import BaseWebSearchProvider from "./BaseWebSearchProvider"
// import searchTestResult from "./test.json"
import { WebSearchProviderResponse } from "./types"

export default class TavilyProvider extends BaseWebSearchProvider {
  private readonly tvly: TavilyClient

  constructor(provider: WebSearchProviderId) {
    super(provider)
    if (!this.apiKey) {
      throw new Error("API key is required for Tavily provider")
    }
    if (!this.apiHost) {
      throw new Error("API host is required for Tavily provider")
    }
    this.tvly = new TavilyClient({ apiKey: this.apiKey, apiBaseUrl: this.apiHost })
  }

  public async search(query: string, websearch: WebSearchState): Promise<WebSearchProviderResponse> {
    try {
      if (!query.trim()) {
        throw new Error("Search query cannot be empty")
      }

      const result = await this.tvly.search({
        query,
        max_results: Math.max(1, websearch.maxResults),
      })

      // const result = searchTestResult

      return {
        query: result.query,
        results: result.results.slice(0, websearch.maxResults).map((result) => ({
          title: result.title || "No title",
          content: result.content || "",
          url: result.url || "",
        })),
      }
    } catch (error) {
      console.error("Tavily search failed:", error)
      throw new Error(`Search failed: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }
}
