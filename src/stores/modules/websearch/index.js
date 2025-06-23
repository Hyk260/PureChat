import { defineStore } from 'pinia'
import { SetupStoreId } from '@/stores/plugins/index';

const { VITE_TAVILY_API_KEY } = import.meta.env

const providers = {
  providers: [
    {
      id: 'test',
      name: 'Test',
      apiKey: 'test-xxx'
    },
    {
      id: 'tavily',
      name: 'Tavily',
      apiKey: VITE_TAVILY_API_KEY || ''
    },
    {
      id: 'exa',
      name: 'Exa',
      apiKey: ''
    },
    // {
    //   id: 'local-google',
    //   name: 'Google',
    //   url: 'https://www.google.com/search?q=%s'
    // },
    // {
    //   id: 'local-bing',
    //   name: 'Bing',
    //   url: 'https://cn.bing.com/search?q=%s&ensearch=1'
    // },
    // {
    //   id: 'local-baidu',
    //   name: 'Baidu',
    //   url: 'https://www.baidu.com/s?wd=%s'
    // }
  ],
}

export const useWebSearchStore = defineStore(SetupStoreId.WebSearch, {
  state: () => ({
    defaultProvider: "tavily",
    providers,
    searchWithTime: true,
    maxResults: 5,
    excludeDomains: [],
    enhanceMode: false,
    checkProviders: [],
  }),
  getters: {
    getProviderConfig() {
      return this.providers.find((t) => t.id === this.defaultProvider)
    }
  },
  actions: {
    setDefaultProvider(action) {
      this.defaultProvider = action
    },
    setWebSearchProviders(action) {
      this.providers = action
    },
    updateCheckProviders(action) {
      const index = this.checkProviders.findIndex((t) => t === action)
      if (index !== -1) {
        this.checkProviders.splice(index, 1)
      } else {
        this.checkProviders.push(action)
      }
    },
    updateWebSearchProviders(action) {
      this.providers = action
    },
    updateWebSearchProvider(action) {
      const index = this.providers.findIndex((t) => t.id === action.id)
      if (index !== -1) {
        this.providers[index].apiKey = action.apiKey
      }
    },
    setSearchWithTime(action) {
      this.searchWithTime = action
    },
    setMaxResult(action) {
      this.maxResults = action
    },
    setExcludeDomains(action) {
      this.excludeDomains = action
    },
    setEnhanceMode(action) {
      this.enhanceMode = action
    }
  },
  persist: true,
});
