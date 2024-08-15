export function createProgressGuard(router) {
  router.beforeEach((to, from, next) => {
    window.NProgress?.start?.();
    next();
  });
  router.afterEach((to) => {
    window.NProgress?.done?.();
  });
}
