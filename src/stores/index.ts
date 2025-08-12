import type { App } from 'vue';
import { createPinia } from "pinia";
import { resetSetupStore } from './plugins';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export function setupStore(app: App) {
  const store = createPinia();
  store.use(resetSetupStore);
  store.use(piniaPluginPersistedstate)
  app.use(store);
}

export * from './modules/index';