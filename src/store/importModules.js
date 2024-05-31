export function importModules() {
  const importedModules = {};

  // 自动导入指定目录下的所有以index.js结尾的文件
  const requireModules =  import.meta.glob("./modules/**/index.(ts|js)");
  console.log("🚀 ~ importModules ~ requireModules:", requireModules)
  
  // 自动导入模块文件中的所有vuex模块
  Object.keys(requireModules).forEach((filePath) => {
    console.log(filePath);
    const module = requireModules(filePath);
    // 从文件路径中提取模块名称，如'./modules/user/index.ts' => 'user'
    const moduleName = filePath.replace(/\.\/|\/index.(js|ts)/g, "");
    importedModules[moduleName] = {
      // namespaced: true,
      ...module.default,
    };
  });

  return importedModules;
}
