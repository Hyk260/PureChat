import { ACCESS_TOKEN } from "@/constants/index";
import { localStg } from "@/utils/storage";

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
  // if (!__IS_ELECTRON__) createProgressGuard(router)
  createRouteGuard(router)
}
