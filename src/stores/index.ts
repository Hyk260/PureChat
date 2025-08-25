import { createPinia } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"

import { resetSetupStore } from "./plugins"

import type { App } from "vue"

export function setupStore(app: App) {
  const store = createPinia()
  store.use(resetSetupStore)
  store.use(piniaPluginPersistedstate)
  app.use(store)
}

export * from "./modules/index"
