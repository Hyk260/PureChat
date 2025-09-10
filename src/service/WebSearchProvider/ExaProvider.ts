import { ExaClient } from "@agentic/exa"

import { WebSearchProviderId, WebSearchState } from "@/stores/modules/websearch/type"

import BaseWebSearchProvider from "./BaseWebSearchProvider"
import { WebSearchProviderResponse } from "./types"

export default class ExaProvider extends BaseWebSearchProvider {
  private readonly exa: ExaClient

  constructor(provider: WebSearchProviderId) {
    super(provider)
    if (!this.apiKey) {
      throw new Error("API key is required for Exa provider")
    }
    if (!this.apiHost) {
      throw new Error("API host is required for Exa provider")
    }
    this.exa = new ExaClient({ apiKey: this.apiKey, apiBaseUrl: this.apiHost })
  }

  public async search(query: string, websearch: WebSearchState): Promise<WebSearchProviderResponse> {
    try {
      if (!query.trim()) {
        throw new Error("Search query cannot be empty")
      }

      const response = await this.exa.search({
        query,
        numResults: Math.max(1, websearch.maxResults),
        contents: {
          text: true,
        },
      })

      return {
        query: response.autopromptString || "",
        results: response.results.slice(0, websearch.maxResults).map((result) => ({
          title: result.title || "No title",
          content: result.text || "",
          url: result.url || "",
        })),
      }
    } catch (error) {
      console.error("Exa search failed:", error)
      throw new Error(`Search failed: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }
}
