import { ModelRuntime } from "@pure/model-runtime"
import { useRobotStore } from "@/stores"

export interface InitializeWithClientStoreOptions {
  payload?: any
  provider: string
}

export const createPayloadWithKeyVaults = (provider: any) => {
  const keyVaults = useRobotStore().getAccessStore(provider) || {}

  return {
    ...keyVaults,
    apiKey: keyVaults?.token?.trim(),
    baseURL: keyVaults?.openaiUrl?.trim(),
  }
}

export const initializeWithClientStore = ({ provider, payload }: InitializeWithClientStoreOptions) => {
  const providerAuthPayload = { ...payload, ...createPayloadWithKeyVaults(provider) }
  const commonOptions = {
    dangerouslyAllowBrowser: true,
  }

  return ModelRuntime.initializeWithProvider(provider, {
    ...commonOptions,
    ...providerAuthPayload,
    ...payload,
  })
}
