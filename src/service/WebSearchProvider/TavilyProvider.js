import { TavilyClient } from '@agentic/tavily'
import BaseWebSearchProvider from './BaseWebSearchProvider'

export default class TavilyProvider extends BaseWebSearchProvider {
  tvly
  constructor(provider) {
    super(provider)
    if (!this.apiKey) {
      throw new Error('API key is required for Tavily provider')
    }
    if (!this.apiHost) {
      throw new Error('API host is required for Tavily provider')
    }
    this.tvly = new TavilyClient({ apiKey: this.apiKey, apiBaseUrl: this.apiHost })
  }

  async search(query, websearch) {
    try {
      if (!query.trim()) {
        throw new Error('Search query cannot be empty')
      }

      const result = await this.tvly.search({
        query,
        max_results: Math.max(1, websearch.maxResults),
      })

      return {
        query: result.query,
        results: result.results.slice(0, websearch.maxResults).map((result) => ({
          title: result.title || 'No title',
          content: result.content || '',
          url: result.url || ''
        }))
      }
    } catch (error) {
      console.error('Tavily search failed:', error)
    }
  }
}
