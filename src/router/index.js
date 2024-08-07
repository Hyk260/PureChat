import { ACCESS_TOKEN } from "@/constants/index";
import { setPageTitle, isElectron } from "@/utils/common";
import storage from "@/utils/localforage/index";
import NProgress from "@/utils/progress";
import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import { scrollBehavior } from "./utils";
import layout from "./modules/layout";
import remaining from "./modules/remaining";
import { noService } from '@/config/index';

let isF = false;
const historyMode = {
  history: createWebHistory(),
  hash: createWebHashHistory(),
};

const router = createRouter({
  history: historyMode[import.meta.env.VITE_ROUTER_HISTORY],
  routes: [...remaining, ...layout],
  scrollBehavior,
});

router.beforeEach((to, from, next) => {
  if (from.path === to.path) return;
  // setPageTitle(to.meta.title);
  const token = storage.get(ACCESS_TOKEN);
  if (token || noService) {
    !isElectron && NProgress.start();
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

/** 安装vue路由 */
export async function setupRouter(app) {
  app.use(router);
  await router.isReady();
}

export default router;
