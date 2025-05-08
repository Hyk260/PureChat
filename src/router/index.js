import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import { scrollBehavior } from "./utils";
import { createRouterGuard } from './guard/index';
import layout from "./modules/layout";
import remaining from "./modules/remaining";

const { VITE_ROUTER_HISTORY } = import.meta.env

const historyMode = {
  history: createWebHistory(),
  hash: createWebHashHistory(),
};

const router = createRouter({
  history: __IS_ELECTRON__ ? createWebHashHistory() : historyMode[VITE_ROUTER_HISTORY],
  routes: [...remaining, ...layout],
  scrollBehavior,
});

/** 安装vue路由 */
export async function setupRouter(app) {
  app.use(router);
  createRouterGuard(router);
  await router.isReady();
}

export default router;
