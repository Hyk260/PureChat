import { nanoid } from '@/utils/uuid';
import BaseWebSearchProvider from './BaseWebSearchProvider'

export default class LocalSearchProvider extends BaseWebSearchProvider {
  constructor(provider) {
    super(provider)
  }

  async search(
    query,
    websearch,
    httpOptions
  ) {
    const uid = nanoid()
    try {
      if (!query.trim()) {
        throw new Error('Search query cannot be empty')
      }

      let html = ""

      console.log('Local search query:', this.getApiHost())
      const apiHost = this.getApiHost()

      const cleanedQuery = query.split('\r\n')[1] ?? query

      const url = apiHost.replace('%s', encodeURIComponent(cleanedQuery))

      const response = await fetch(url, {})
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
      }
      html = await response.text()

      return {
        query: query,
        // results: []
      }
    } catch (error) {
      console.error('Local search failed:', error)
      throw new Error(`Search failed: ${error}`)
    } finally {
      console.log('Local search completed')
    }
  }

  parseValidUrls(htmlContent) {
    throw new Error('Not implemented')
  }
}
