import * as ElIcons from "@element-plus/icons-vue";

export function useElIcons(app) {
  // 本地引入
  for (const name in ElIcons) {
    app.component(name, ElIcons[name]);
  }
  // CDN引入
  // for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  //   app.component(key, component)
  // }
}
