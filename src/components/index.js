const importModules = (app) => {
  const modules = import.meta.glob('./**/index.vue', { eager: true, });

  Object.keys(modules).forEach((key) => {
    const component = modules[key].default;
    app.component(component.name, component);
  });
};

/** 注册全局组件 */
export function loadAllassembly(app) {
  importModules(app);
}
