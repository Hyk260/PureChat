import BaseWebSearchProvider from './BaseWebSearchProvider'

export default class DefaultProvider extends BaseWebSearchProvider {
  search() {
    throw new Error('Method not implemented.')
  }
}
