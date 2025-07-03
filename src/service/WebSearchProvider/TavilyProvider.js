import { TavilyClient } from '@agentic/tavily'
import BaseWebSearchProvider from './BaseWebSearchProvider'

export default class TavilyProvider extends BaseWebSearchProvider {
  tvly
  constructor(provider) {
    super(provider)
    if (!this.apiKey) {
      throw new Error('API key is required for Tavily provider')
    }
    this.tvly = new TavilyClient({ apiKey: this.apiKey })
  }

  async search(query, maxResults, excludeDomains) {
    try {
      if (!query.trim()) {
        throw new Error('Search query cannot be empty')
      }

      const result = await this.tvly.search({
        query,
        max_results: Math.max(1, maxResults),
        exclude_domains: excludeDomains || []
      })

      return {
        query: result.query,
        results: result.results.map((result) => ({
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
