import { useRouteStore } from "@/stores/modules/route"

import { createProgressGuard } from "./progress"
import { createRouteGuard } from "./route"

import type { Router } from "vue-router"

/**
 * 创建错误处理守卫
 * @param router - Router instance
 */
export function createErrorGuard(router: Router) {
  router.onError((error) => {
    console.warn("路由错误:", error)
    // 检查是否是组件加载失败
    if (
      error.message.includes("Failed to resolve module specifier") ||
      error.message.includes("Loading chunk") ||
      error.message.includes("Loading CSS chunk")
    ) {
      console.warn("页面加载失败，请刷新页面重试")
    }
  })
}

/**
 * Router guard
 * @param router - Router instance
 */
export function createRouterGuard(router: Router) {
  createProgressGuard(router)
  createRouteGuard(router)
  createErrorGuard(router)

  const routeStore = useRouteStore()
  routeStore.initCacheRoutes(router.getRoutes())
}
