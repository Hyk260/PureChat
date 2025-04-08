import { useWebSearchStore } from '@/stores/index';

export default class BaseWebSearchProvider {
  provider
  apiKey
  constructor(provider) {
    this.provider = provider
    this.apiKey = this.getApiKey()
  }
  getApiKey() {
    const config = useWebSearchStore().getProviderConfig
    return config?.apiKey || ''
  }
}
