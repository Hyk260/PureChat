import "./assets";

import type { App } from "vue";

import { setupAppErrorHandle, setupAppVersionNotification } from "./app";
import { useElementPlus } from "./elementPlus";
// import { setupNProgress } from "./nprogress"
import { setupIconifyOffline } from "./iconify";
import { useElIcons } from "./icons";

function useGlobalProperties(app: App) {
  app.config.globalProperties.IS_ELECTRON = __IS_ELECTRON__;
  app.config.globalProperties.IS_LOCAL_MODE = __LOCAL_MODE__;
  app.config.globalProperties.APP_NAME = __APP_NAME__;
}

export function setupPlugins(app: App) {
  app.use(useElIcons);
  app.use(useElementPlus);
  app.use(useGlobalProperties);
  setupIconifyOffline();
  // setupNProgress()
  setupAppVersionNotification();
  setupAppErrorHandle(app);
}
