import { isElectron } from "@/utils/common";
import { ACCESS_TOKEN } from "@/constants/index";
import { localStg } from "@/utils/storage";

function createProgressGuard(router) {
  router.beforeEach((to, from, next) => {
    window.NProgress?.start?.();
    next();
  });
  router.afterEach((to) => {
    window.NProgress?.done?.();
  });
}

function createRouteGuard(router) {
  router.beforeEach((to, from, next) => {
    if (from.path === to.path) return;
    if (__LOCAL_MODE__) {
      if (to.path === '/login') next({ path: "/" });
    }
    const token = localStg.get(ACCESS_TOKEN);
    if (token) {
      next();
    } else {
      if (__LOCAL_MODE__) next()
      if (to.path !== "/login") {
        next({ path: "/login" });
      } else {
        next();
      }
    }
  });
}

/**
 * Router guard
 * @param router - Router instance
 */
export function createRouterGuard(router) {
  if (!isElectron) createProgressGuard(router)
  createRouteGuard(router)
}
