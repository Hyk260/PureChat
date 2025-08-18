import type { App, DefineComponent } from "vue";

const importModules = (app: App) => {
  const modules: Record<string, { default: DefineComponent }> = import.meta.glob('./**/index.vue', { eager: true, });

  Object.keys(modules).forEach((key) => {
    const component: DefineComponent = modules[key]!.default as DefineComponent;
    app.component(component.name, component);
  });
};

/** 注册全局组件 */
export function loadAllAssembly(app: App) {
  importModules(app);
}
