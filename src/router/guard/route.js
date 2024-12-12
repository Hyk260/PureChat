import { ACCESS_TOKEN } from "@/constants/index";
import { localStg } from "@/utils/storage";

/**
 * create route guard
 * @param router router instance
 */
export function createRouteGuard(router) {
  router.beforeEach((to, from, next) => {
    if (from.path === to.path) return;
    const token = localStg.get(ACCESS_TOKEN);
    if (token) {
      next();
    } else {
      if (to.path !== "/login") {
        if (__LOCAL_MODE__) next()
        next({ path: "/login" });
      } else {
        next();
      }
    }
  });
}