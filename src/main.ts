import App from "./App.vue";
import { createApp } from "vue";
import { setupStore } from "./stores";
import { setupI18n } from './locales';
import { loadAllAssembly } from "./components/Automatic";
import { setupDirectives } from "./directives";
import { setupPlugins } from "./plugins";
import { setupRouter } from "./router";

async function setupApp() {
  const app = createApp(App);
  setupDirectives(app);
  loadAllAssembly(app);
  setupPlugins(app);
  setupStore(app);
  await setupRouter(app);
  setupI18n(app);
  app.mount("#app");
}

setupApp();
