import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/index";
import "virtual:svg-icons-register";

import { loadAllassembly } from "./components/index";
import { getServerConfig } from "./config/index";
import { setupDirectives } from "./directives/index";
import { setupPlugins } from "./plugins/index";
import { setupRouter } from "./router/index";

async function setupApp() {
  const app = createApp(App);
  // vue custom directives
  setupDirectives(app);
  loadAllassembly(app);
  setupPlugins(app);
  // 获取全局配置
  await getServerConfig(app);
  // vue router
  await setupRouter(app);
  app.use(store);
  app.mount("#app");
}
setupApp();
