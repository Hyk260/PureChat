export interface WebSearchProvider {
  id: string
  name: string
  apiKey?: string
  apiHost?: string
  url?: string
  parentSpanId?: string
  modelName?: string
}

export interface WebSearchState {
  // 默认搜索提供商的ID
  defaultProvider: WebSearchProviderId
  // 所有可用的搜索提供商列表
  providers: WebSearchProvider[]
  /**
   * 是否在搜索查询中添加当前日期
   */
  searchWithTime: boolean
  // 搜索结果的最大数量
  maxResults: number
  // 要排除的域名列表
  excludeDomains: string[]

  checkProviders: string[]
  // 订阅源列表
  subscribeSources?: []
  // 具体供应商的配置
  providerConfig?: Record<string, any>
}

export const WebSearchProviderIds = {
  zhipu: "zhipu",
  tavily: "tavily",
  exa: "exa",
  searxng: "searxng",
  "local-google": "local-google",
  "local-bing": "local-bing",
  "local-baidu": "local-baidu",
} as const

export type WebSearchProviderId = keyof typeof WebSearchProviderIds
