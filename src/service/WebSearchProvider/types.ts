export interface WebSearchProviderResult {
  title: string
  content: string
  url: string
}

export interface WebSearchProviderResponse {
  query?: string
  results: WebSearchProviderResult[]
}
