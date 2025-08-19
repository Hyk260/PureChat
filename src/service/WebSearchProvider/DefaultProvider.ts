import BaseWebSearchProvider from './BaseWebSearchProvider'
import type { WebSearchProviderResponse } from './types'

// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default class DefaultProvider extends BaseWebSearchProvider {
  search(): Promise<WebSearchProviderResponse> {
    throw new Error('Method not implemented.')
  }
}
