/*
 * 自定义路由切换时页面如何滚动
 * 参考 https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html
 */
import type { RouteLocationNormalized } from "vue-router";

export const scrollBehavior = (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  return new Promise<{ el: Element; behavior: ScrollBehavior } | false | void>((resolve) => {
    if (to.hash) {
      const el = document.querySelector(to.hash);
      if (el) {
        resolve({ el, behavior: "smooth" as ScrollBehavior });
      }
    }
  });
};
