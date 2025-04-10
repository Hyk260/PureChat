import DefaultProvider from './DefaultProvider'
import ExaProvider from './ExaProvider'
import TavilyProvider from './TavilyProvider'

export default class WebSearchProviderFactory {
  static create(provider) {
    switch (provider) {
      case 'tavily':
        return new TavilyProvider(provider)
      case 'exa':
        return new ExaProvider(provider)
      default:
        return new DefaultProvider(provider)
    }
  }
}
