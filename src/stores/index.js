import { createPinia } from "pinia";
import { resetSetupStore } from './plugins/index';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const store = createPinia();

export function setupStore(app) {
  store.use(resetSetupStore);
  store.use(piniaPluginPersistedstate)
  app.use(store);
}

export * from './modules/index';

export { store };