import { ModelRuntime } from "@pure/model-runtime"

export interface InitializeWithClientStoreOptions {
  payload?: any
  provider: string
  runtimeProvider?: string
}

export const initializeWithClientStore = ({ provider, runtimeProvider, payload }: InitializeWithClientStoreOptions) => {
  const providerAuthPayload = { ...payload }
  const commonOptions = {
    dangerouslyAllowBrowser: true,
  }

  return ModelRuntime.initializeWithProvider(runtimeProvider ?? provider, {
    ...commonOptions,
    ...providerAuthPayload,
    ...payload,
  })
}
