import { cloneDeep } from "lodash-es"

import { SetupStoreId } from "@/stores/enum"

import type { PiniaPluginContext } from "pinia"

/**
 * 该插件重置了通过设置语法写入的状态。
 * @param context
 */
export function resetSetupStore(context: PiniaPluginContext) {
  const setupSyntaxIds = Object.values(SetupStoreId) as string[]

  if (setupSyntaxIds.includes(context.store.$id)) {
    const { $state } = context.store

    const defaultStore = cloneDeep($state)

    context.store.$reset = () => {
      context.store.$patch(defaultStore)
    }
  }
}
