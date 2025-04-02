import { ExaClient } from '@agentic/exa'

import BaseWebSearchProvider from './BaseWebSearchProvider'

export default class ExaProvider extends BaseWebSearchProvider {
  exa
  constructor(provider) {
    super(provider)
    if (!this.apiKey) {
      throw new Error('API key is required for Exa provider')
    }
    this.exa = new ExaClient({ apiKey: this.apiKey })
  }

   async search(query, maxResults){
    try {
      if (!query.trim()) {
        throw new Error('Search query cannot be empty')
      }

      const response = await this.exa.search({
        query,
        numResults: Math.max(1, maxResults),
        contents: {
          text: true
        }
      })

      return {
        query: response.autopromptString,
        results: response.results.map((result) => ({
          title: result.title || 'No title',
          content: result.text || '',
          url: result.url || ''
        }))
      }
    } catch (error) {
      console.error('Exa search failed:', error)
    }
  }
}
