import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import { scrollBehavior } from "./utils";
import layout from "./modules/layout";
import remaining from "./modules/remaining";
import { createRouterGuard } from './guard/index';

const historyMode = {
  history: createWebHistory(),
  hash: createWebHashHistory(),
};

const router = createRouter({
  history: historyMode[import.meta.env.VITE_ROUTER_HISTORY],
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
