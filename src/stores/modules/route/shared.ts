import type { RouteLocationNormalized, RouteRecordRaw } from "vue-router"

/**
 * Get cache route names
 *
 * @param routes Vue routes (two levels)
 */
export function getCacheRouteNames(routes: RouteRecordRaw[]) {
  const cacheNames = []

  routes.forEach((route) => {
    if (route.meta?.keepAlive && route.components) {
      cacheNames.push(route.name)
    }
  })

  return cacheNames
}

/**
 * Get tab id by route
 *
 * @param route
 */
export function getTabIdByRoute(route: RouteLocationNormalized) {
  const { path, query = {}, meta } = route

  let id = path

  if (meta?.multiTab) {
    const queryKeys = Object.keys(query).sort()
    const qs = queryKeys.map((key) => `${key}=${query[key]}`).join("&")

    id = `${path}?${qs}`
  }

  return id
}
