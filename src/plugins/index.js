import { useElementPlus } from "./elementPlus";
import { useElIcons } from "./icons";
import { setupAppVersionNotification } from "./app";
// import { setupNProgress } from "./nprogress"
import { setupIconifyOffline } from "./iconify";

import "./assets";

function useGlobalProperties(app) {
  app.config.globalProperties.IS_ELECTRON = __IS_ELECTRON__
  app.config.globalProperties.IS_LOCAL_MODE = __LOCAL_MODE__
  app.config.globalProperties.APP_NAME = __APP_NAME__
}

export function setupPlugins(app) {
  app.use(useElIcons);
  app.use(useElementPlus);
  app.use(useGlobalProperties)
  setupIconifyOffline();
  // setupNProgress()
  setupAppVersionNotification();
}
