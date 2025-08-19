import WebSearchProviderFactory from './WebSearchProviderFactory'

export default class WebSearchEngineProvider {
  sdk
  constructor(provider) {
    this.sdk = WebSearchProviderFactory.create(provider)
  }
  async search(query, websearch, httpOptions) {
    return await this.sdk.search(query, websearch, httpOptions)
  }
}
