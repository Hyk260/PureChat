import DefaultProvider from "./DefaultProvider"
import ExaProvider from "./ExaProvider"
import LocalBaiduProvider from "./LocalBaiduProvider"
import LocalBingProvider from "./LocalBingProvider"
import TavilyProvider from "./TavilyProvider"
// import LocalGoogleProvider from './LocalGoogleProvider'

export default class WebSearchProviderFactory {
  static create(provider: string) {
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
