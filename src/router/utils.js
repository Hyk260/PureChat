import remainingRouter from "./modules/remaining";

/*
 * 自定义路由切换时页面如何滚动
 * 参考 https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html
 */
export const scrollBehavior = (to, from) => {
  return new Promise((resolve) => {
    if (to.hash) {
      const el = document.querySelector(to.hash);
      if (el) {
        resolve({ el, behavior: "smooth" });
      }
    }
  });
};

export const generateRoutes = async () => {
  const routes = [];
  const modules = import.meta.glob(
    ["./modules/**/*.js", "!./modules/**/remaining.js"],
    {
      eager: true,
    }
  );
  Object.keys(modules).forEach((key) => {
    routes.push(modules[key].default);
  });
  // Object.keys(files).forEach(async (filePath) => {
  //   if (filePath.indexOf("remaining") !== -1) return;
  //   console.log(filePath);
  //   const module = await import(filePath);
  //   console.log(module);
  //   routes.push(...module.default);
  // });
  // routes.unshift(...remainingRouter);
  console.log(routes);
  return routes;
};
