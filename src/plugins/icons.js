import * as ElIcons from "@element-plus/icons-vue";

export default function loadComponent(app) {
  for (const name in ElIcons) {
    app.component(name, ElIcons[name]);
  }
}
