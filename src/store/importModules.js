export async function importModules() {
  const importedModules = {};
  const modules = import.meta.glob("./modules/**/index.js");

  for (const filePath of Object.keys(modules)) {

    const module = await import(filePath);

    const moduleName = filePath.split('/').slice(-2, -1)[0];
    
    importedModules[moduleName] = {
      ...module.default,
    };
  }
}
