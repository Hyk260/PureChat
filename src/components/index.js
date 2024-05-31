// function importModules(app) {
//   // 自动导入指定目录下的所有以index.vue结尾的文件
//   const requireModules = require.context("./", true, /\.vue$/);

//   requireModules.keys().forEach((filePath) => {
//     const module = requireModules(filePath);
//     // 从文件路径中提取模块名称，如'./FontIcon/index.vue' => 'FontIcon'
//     const moduleName = filePath.replace(/\.\/(.*)\/index\.vue/, "$1");
//     if (moduleName === "SvgIcon") return;
//     app.component(moduleName, module.default);
//   });
// }
const importModules = async () => {
  const moduleFiles = await glob("./**/index.vue"); // 使用 glob 或者其他方法获取文件列表
  console.lgo(moduleFiles);
  for (const filePath of moduleFiles) {
    const moduleName = filePath.match(/\/([^/]+)\/index\.vue$/)[1]; // 从文件路径中提取模块名称
    if (moduleName === "SvgIcon") continue; // 如果模块名称是 SvgIcon，则跳过

    const module = await import(`./${filePath}`);
    app.component(moduleName, module.default);
  }
};

/** 自动加载全局组件 */
export function loadAllassembly(app) {
  importModules(app);
}
