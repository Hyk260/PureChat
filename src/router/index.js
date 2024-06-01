import { ACCESS_TOKEN } from "@/constants/index";
import { setPageTitle } from "@/utils/common";
import storage from "@/utils/localforage/index";
import NProgress from "@/utils/progress";
import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import {
  generateRoutes,
  scrollBehavior
} from "./utils";
import layout from "./modules/layout";
import remaining from "./modules/remaining";

let isF = false;
const historyMode = {
  history: createWebHistory(),
  hash: createWebHashHistory(),
};
// generateRoutes();
// console.log([...remaining, ...layout]);
const router = createRouter({
  history: historyMode[import.meta.env.VITE_ROUTER_HISTORY],
  // routes: generateRoutes(),
  routes: [...remaining, ...layout],
  scrollBehavior,
});

router.beforeEach((to, from, next) => {
  if (from.path === to.path) return;
  setPageTitle(to.meta.title);
  const token = storage.get(ACCESS_TOKEN);
  if (token) {
    NProgress.start();
    if (isF) {
      next();
    } else {
      isF = true;
      next({ ...to, replace: true });
    }
  } else {
    if (to.path !== "/login") {
      next({ path: "/login" });
    } else {
      next();
    }
  }
});

router.afterEach((to, from, next) => {
  NProgress.done();
});

/** setup vue router. - [安装vue路由] */
export async function setupRouter(app) {
  app.use(router);
  await router.isReady();
}

export default router;
