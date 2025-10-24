/**
 * 搜索结果的基础信息结构，包含所有搜索结果共有的核心字段
 */
export interface SearchResultBase {
  /** 结果标题（通常为网页标题或内容主题） */
  title: string
  /** 结果内容摘要（用于预览的关键内容片段） */
  content: string
  /** 结果对应的原始网页URL */
  url: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface WebSearchProviderResult extends SearchResultBase {}

export interface WebSearchProviderResponse {
  query?: string
  results: WebSearchProviderResult[]
}

export interface WebSearchResult extends SearchResultBase {
  id: string
}
