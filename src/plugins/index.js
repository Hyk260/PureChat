import { useElementPlus } from "./elementPlus";
import { useElIcons } from "./icons";
import { setupAppVersionNotification } from "./app";

import "./assets";

export function setupPlugins(app) {
  app.use(useElIcons);
  app.use(useElementPlus);
  setupAppVersionNotification();
}
