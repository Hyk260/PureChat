import { createPinia } from "pinia";
import { resetSetupStore } from './plugins/index';

const store = createPinia();

export function setupStore(app) {
  store.use(resetSetupStore);
  app.use(store);
}

export * from './modules/index';

export { store };