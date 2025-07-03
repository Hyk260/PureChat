import WebSearchProviderFactory from './WebSearchProviderFactory'

export default class WebSearchEngineProvider {
  sdk
  constructor(provider) {
    this.sdk = WebSearchProviderFactory.create(provider)
  }
  async search(query, maxResult, excludeDomains) {
    return await this.sdk.search(query, maxResult, excludeDomains)
  }
}
