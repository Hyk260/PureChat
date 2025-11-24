import { defineStore } from "pinia"
import { SetupStoreId } from "@/stores/enum"
import { getCacheRouteNames, getTabIdByRoute } from "./shared"
import { useChatStore } from "@/stores/modules/chat"
import router from "@/router"
// export type RouteKey = keyof RouteMap;

export interface RouteStore {
  reloadFlag: boolean
  /**
   * 缓存的路由，用于keep-alive
   */
  cacheRoutes: string[]
  /**
   * Exclude cache routes
   *
   * for reset route cache
   */
  excludeCacheRoutes: string[]
}

export const useRouteStore = defineStore(SetupStoreId.Route, {
  state: (): RouteStore => ({
    reloadFlag: true,
    cacheRoutes: [],
    excludeCacheRoutes: [],
  }),
  getters: {},
  actions: {
    getTabIdByRoute,
    routerPush(routeName: string) {
      router.push(routeName)
      useChatStore().toggleMultiSelectMode(false)
    },
    addCacheRoute(routeName: string) {
      if (!this.cacheRoutes.includes(routeName)) {
        this.cacheRoutes.push(routeName)
      }
    },
    removeCacheRoute(routeName: string) {
      const index = this.cacheRoutes.indexOf(routeName)
      if (index > -1) {
        this.cacheRoutes.splice(index, 1)
      }
    },
    initCacheRoutes(routes) {
      this.cacheRoutes = getCacheRouteNames(routes)
    },
  },
})
