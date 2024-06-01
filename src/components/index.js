import FontIcon from "./FontIcon/index.vue";
import QrCode from "./QrCode/index.vue";
import SvgIcon from "./SvgIcon/index.vue";
import UserAvatar from "./UserAvatar/index.vue";



const importModules = (app) => {
  // const moduleFiles = await import.meta.glob("./**/index.vue");
  // Object.keys(moduleFiles).forEach(async (filePath) => {
  //   const moduleName = filePath.match(/\/([^/]+)\/index\.vue$/)[1]; // 从文件路径中提取模块名称
  //   const module = await import(filePath);
  //   app.component(moduleName, module.default);
  // });
  app.component("QrCode", QrCode);
  app.component("SvgIcon", SvgIcon);
  app.component("UserAvatar", UserAvatar);
  app.component("FontIcon", FontIcon);
};

/** 自动加载全局组件 */
export function loadAllassembly(app) {
  importModules(app);
}
