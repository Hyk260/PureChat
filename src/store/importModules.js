export function importModules() {
  // const importedModules = {};
  // // 自动导入指定目录下的所有以index.js结尾的文件
  // const modules =  import.meta.glob("./modules/**/index.js");
  // console.log("🚀 ~ modules:", modules);
  // // 自动导入模块文件中的所有vuex模块
  // Object.keys(modules).forEach(async (filePath) => {
  //   console.log(filePath);
  //   const module = await import(filePath);
  //   console.log(module);
  //   // 从文件路径中提取模块名称，如'./modules/user/index.ts' => 'user'
  //   const moduleName = filePath.replace(/\.\/|\/index.js/g, "");
  //   importedModules[moduleName] = {
  //     // namespaced: true,
  //     ...module.default,
  //   };
  // });
  // console.log(importedModules);
  // return importedModules;
}
