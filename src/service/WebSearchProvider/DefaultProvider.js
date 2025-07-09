import BaseWebSearchProvider from './BaseWebSearchProvider'
import result from './test.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default class DefaultProvider extends BaseWebSearchProvider {
  async search() {
    await delay(500);
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
