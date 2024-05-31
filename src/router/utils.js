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

export const generateRoutes = () => {
  const routes = [];
  const files = require.context("./modules/", false, /\.js$/);
  files.keys().forEach((key) => {
    if (key === "./remaining.js") return;
    routes.push(...files(key).default);
  });
  routes.unshift(...remainingRouter);
  return routes;
};
