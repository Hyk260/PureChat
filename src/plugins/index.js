import { useElementPlus } from "./elementPlus";
import { useElIcons } from "./icons";
import { setupAppVersionNotification } from "./app";
// import { setupNProgress } from "./nprogress"
import { setupIconifyOffline } from "./iconify";

import "./assets";

export function setupPlugins(app) {
  app.use(useElIcons);
  app.use(useElementPlus);
  setupIconifyOffline();
  // setupNProgress()
  setupAppVersionNotification();
}
