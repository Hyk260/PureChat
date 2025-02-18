import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/index";
import { setupStore } from "./stores/index";

import { setupI18n } from './locales/index';
import { loadAllAssembly } from "./components/index";
import { setupDirectives } from "./directives/index";
import { setupPlugins } from "./plugins/index";
import { setupRouter } from "./router/index";

async function setupApp() {
  const app = createApp(App);
  // vue custom directives
  setupDirectives(app);
  loadAllAssembly(app);
  setupPlugins(app);
  setupStore(app);
  // vue router
  await setupRouter(app);
  setupI18n(app);
  app.use(store);
  app.mount("#app");
}
setupApp();
