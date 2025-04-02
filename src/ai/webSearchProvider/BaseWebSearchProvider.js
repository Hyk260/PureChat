import { localStg } from "@/utils/storage";

export default class BaseWebSearchProvider {
  provider
  apiKey
  constructor(provider) {
    this.provider = provider
    this.apiKey = this.getApiKey()
  }
  getApiKey() {
    return localStg.get("webSearch")?.providers[0]?.apiKey
  }
}
