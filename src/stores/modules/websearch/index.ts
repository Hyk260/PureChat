import { defineStore } from "pinia"

import { SetupStoreId } from "@/stores/enum"

import { WebSearchProvider, WebSearchState } from "./type"

const { VITE_TAVILY_API_KEY } = import.meta.env

const localSearch = __IS_ELECTRON__
// const localSearch = true

const providers = [
  // {
  //   id: "test",
  //   name: "Test",
  //   apiKey: "test-xxx",
  // },
  {
    id: "tavily",
    name: "Tavily",
    apiKey: VITE_TAVILY_API_KEY || "",
    apiHost: "https://api.tavily.com",
  },
  {
    id: "exa",
    name: "Exa",
    apiKey: "",
    apiHost: "https://api.exa.ai",
  },
  // {
  //   id: 'local-google',
  //   name: 'Google',
  //   url: 'https://www.google.com/search?q=%s'
  // },
  {
    id: "local-bing",
    name: "Bing",
    url: "https://cn.bing.com/search?q=%s&ensearch=1",
  },
  {
    id: "local-baidu",
    name: "Baidu",
    url: "https://www.baidu.com/s?wd=%s",
  },
].filter((item) => (localSearch ? true : !item.id.startsWith("local-")))

export const useWebSearchStore = defineStore(SetupStoreId.WebSearch, {
  state: (): WebSearchState => ({
    defaultProvider: localSearch ? "local-bing" : "tavily",
    providers,
    searchWithTime: true,
    maxResults: 5,
    excludeDomains: [],
    checkProviders: [],
  }),
  getters: {
    getProviderConfig(): WebSearchProvider | undefined {
      return this.providers.find((t) => t.id === this.defaultProvider)
    },
  },
  actions: {
    setDefaultProvider(action: string) {
      this.defaultProvider = action
    },
    setWebSearchProviders(action: WebSearchProvider[]) {
      this.providers = action
    },
    updateCheckProviders(action: string) {
      const index = this.checkProviders.findIndex((t) => t === action)
      if (index !== -1) {
        this.checkProviders.splice(index, 1)
      } else {
        this.checkProviders.push(action)
      }
    },
    updateWebSearchProviders(action: WebSearchProvider[]) {
      this.providers = action
    },
    updateWebSearchProvider(action: WebSearchProvider) {
      const index = this.providers.findIndex((t) => t.id === action.id)
      if (index !== -1) {
        this.providers[index].apiKey = action.apiKey || ""
      }
    },
    setSearchWithTime(action: boolean) {
      this.searchWithTime = action
    },
    setMaxResult(action: number) {
      this.maxResults = action
    },
    setExcludeDomains(action: string[]) {
      this.excludeDomains = action
    },
  },
  persist: {
    pick: ["defaultProvider", "checkProviders"],
  },
})
