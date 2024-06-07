import { useElementPlus } from "./elementPlus";
import { useI18n } from "./i18n";
import { useElIcons } from "./icons";

// 导入 Element Plus 样式
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";

// https://animate.style/
import "@/styles/index.scss";
import "animate.css";
import "virtual:svg-icons-register";
// import "uno.css";

export function setupPlugins(app) {
  app.use(useI18n);
  app.use(useElIcons);
  app.use(useElementPlus);
}
