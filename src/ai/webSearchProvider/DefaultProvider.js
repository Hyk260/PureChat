import BaseWebSearchProvider from './BaseWebSearchProvider'
import result from './test.json';

export default class DefaultProvider extends BaseWebSearchProvider {
  search() {
    return {
      query: result.query,
      results: result.results.map((t) => ({
        title: t.title || 'No title',
        content: t.content || '',
        url: t.url || ''
      }))
    }
  }
}
