import { ACCESS_TOKEN } from "@/constants/index";
import { localStg } from "@/utils/storage";
import { noService } from '@/config/index';

/**
 * create route guard
 * @param router router instance
 */
export function createRouteGuard(router) {
  router.beforeEach((to, from, next) => {
    if (from.path === to.path) return;
    const token = localStg.get(ACCESS_TOKEN);
    if (token || noService) {
      next();
    } else {
      if (to.path !== "/login") {
        next({ path: "/login" });
      } else {
        next();
      }
    }
  });
}