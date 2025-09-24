import { createApp } from "vue"

import App from "./App.vue"
import { loadAllAssembly } from "./components/Automatic"
import { setupDirectives } from "./directives"
import { setupI18n } from "./locales"
import { setupPlugins } from "./plugins"
import { setupRouter } from "./router"
import { setupStore } from "./stores"

import "@purechat/ui"

async function setupApp() {
  const app = createApp(App)
  setupDirectives(app)
  loadAllAssembly(app)
  setupPlugins(app)
  setupStore(app)
  await setupRouter(app)
  setupI18n(app)
  app.mount("#app")
}

setupApp()
