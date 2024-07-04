import { useElementPlus } from "./elementPlus";
import { useI18n } from "./i18n";
import { useElIcons } from "./icons";
import { setupAppVersionNotification } from "./app";
import "./assets";

export function setupPlugins(app) {
  app.use(useI18n);
  app.use(useElIcons);
  app.use(useElementPlus);
  setupAppVersionNotification();
}
