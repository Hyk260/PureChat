import { useRouteStore } from "@/stores/modules/route"

import { createProgressGuard } from "./progress"
import { createRouteGuard } from "./route"

import type { Router } from "vue-router"

/**
 * Router guard
 * @param router - Router instance
 */
export function createRouterGuard(router: Router) {
  createProgressGuard(router)
  createRouteGuard(router)

  const routeStore = useRouteStore()
  routeStore.initCacheRoutes(router.getRoutes())
}
