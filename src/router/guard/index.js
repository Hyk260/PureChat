import { isElectron } from "@/utils/common";
import { createRouteGuard } from './route';
import { createProgressGuard } from './progress';

/**
 * Router guard
 * @param router - Router instance
 */
export function createRouterGuard(router) {
  !isElectron && createProgressGuard(router)
  createRouteGuard(router)
}
