import { createPinia } from "pinia";

const store = createPinia();

export function setupStore(app) {
  app.use(store);
}

export { store };