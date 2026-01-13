import { ModelRuntime } from "@pure/model-runtime"

export interface InitializeWithClientStoreOptions {
  payload?: any
  provider: string
}

export const initializeWithClientStore = ({ provider, payload }: InitializeWithClientStoreOptions) => {
  const providerAuthPayload = { ...payload }
  const commonOptions = {
    dangerouslyAllowBrowser: true,
  }

  return ModelRuntime.initializeWithProvider(provider, {
    ...commonOptions,
    ...providerAuthPayload,
    ...payload,
  })
}
