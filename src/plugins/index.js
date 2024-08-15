import { useElementPlus } from "./elementPlus";
import { useElIcons } from "./icons";
import { setupAppVersionNotification } from "./app";
import { setupNProgress } from "./nprogress"

import "./assets";

export function setupPlugins(app) {
  app.use(useElIcons);
  app.use(useElementPlus);
  setupNProgress()
  setupAppVersionNotification();
}
