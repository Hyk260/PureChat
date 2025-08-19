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
    try {
      if (__IS_ELECTRON__) {

      } else {
        return {
          query: query,
          results: []
        }
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
