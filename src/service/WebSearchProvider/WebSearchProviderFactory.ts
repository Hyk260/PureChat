// import LocalGoogleProvider from './LocalGoogleProvider'
import { WebSearchProviderId } from "@/stores/modules/websearch/type"

import BaseWebSearchProvider from "./BaseWebSearchProvider"
import DefaultProvider from "./DefaultProvider"
import ExaProvider from "./ExaProvider"
import LocalBaiduProvider from "./LocalBaiduProvider"
import LocalBingProvider from "./LocalBingProvider"
import TavilyProvider from "./TavilyProvider"

export default class WebSearchProviderFactory {
  static create(provider: WebSearchProviderId): BaseWebSearchProvider {
    switch (provider) {
      // case 'local-google':
      // return new LocalGoogleProvider(provider)
      case "local-baidu":
        return new LocalBaiduProvider(provider)
      case "local-bing":
        return new LocalBingProvider(provider)
      case "tavily":
        return new TavilyProvider(provider)
      case "exa":
        return new ExaProvider(provider)
      default:
        return new DefaultProvider(provider)
    }
  }
}
