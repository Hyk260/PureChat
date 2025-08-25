import { localStg } from "@/utils/storage"

import type { Router } from "vue-router"

function createRouteGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    // 相同路径不处理
    if (from.path === to.path) return next()

    // 本地模式且访问登录页时重定向到首页
    if (__LOCAL_MODE__ && to.path === "/login") {
      return next({ path: "/" })
    }

    const token = localStg.get("Access-Token")

    // 有token直接放行
    if (token) {
      return next()
    }

    // 无token且非本地模式
    if (!__LOCAL_MODE__) {
      // 访问非登录页重定向到登录
      if (to.path !== "/login") {
        return next({ path: "/login" })
      }
    }

    // 其他情况直接放行
    return next()
  })
}

/**
 * Router guard
 * @param router - Router instance
 */
export function createRouterGuard(router: Router) {
  createRouteGuard(router)
}
