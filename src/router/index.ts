import { createRouter, createWebHashHistory, createWebHistory, type RouterHistory } from "vue-router"

import { createRouterGuard } from "./guard"
import layout from "./modules/layout"
import remaining from "./modules/remaining"
import { scrollBehavior } from "./utils"

import type { App } from "vue"

const { VITE_ROUTER_HISTORY = "history", VITE_BASE_URL } = import.meta.env

const historyCreatorMap: Record<Env.RouterHistoryMode, (base?: string) => RouterHistory> = {
  hash: createWebHashHistory,
  history: createWebHistory,
}

const router = createRouter({
  history: __IS_ELECTRON__ ? createWebHashHistory() : historyCreatorMap[VITE_ROUTER_HISTORY](VITE_BASE_URL),
  routes: [...remaining, ...layout],
  scrollBehavior,
})

/** 安装vue路由 */
export async function setupRouter(app: App) {
  app.use(router)
  createRouterGuard(router)
  await router.isReady()
}

export default router
