import { SetupStoreId } from '../../plugins/index';
import { PROVIDER_IDS } from "@/config/webSearchProviders";

const initialState = {
  // defaultProvider: PROVIDER_IDS.TAVILY,
  defaultProvider: "test",
  providers: [
    {
      id: 'test',
      name: 'Test',
      apiKey: 'test-xxx'
    },
    {
      id: 'tavily',
      name: 'Tavily',
      apiKey: ''
    },
    {
      id: 'exa',
      name: 'Exa',
      apiKey: ''
    }
  ],
  searchWithTime: true,
  maxResults: 5,
  excludeDomains: [],
  enhanceMode: false,
  checkProviders: [],
}

export const useWebSearchStore = defineStore(SetupStoreId.WebSearch, {
  state: () => ({
    ...initialState
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
