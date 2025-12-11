import { defineStore } from "pinia"
import { SetupStoreId } from "@/stores/enum"
import { getCacheRouteNames, getTabIdByRoute } from "./shared"
import { useChatStore } from "@/stores/modules/chat"
import { useTopicStore } from "@/stores/modules/topic"

import router from "@/router"
import type { DB_Session } from "@/types"
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
      const chatStore = useChatStore()
      if (routeName === "/chat") {
        this.handleSessionClick({
          conversationID: chatStore.sessionId,
        })
      } else {
        router.push(routeName)
      }
      chatStore.toggleMultiSelectMode(false)
    },
    handleSessionClick(payload: Partial<DB_Session>) {
      const topicStore = useTopicStore()
      const query: Record<string, string> = {}
      if (payload.conversationID) {
        query.session = payload.conversationID
      }
      if (topicStore.topicId) {
        // query.topic = topicStore.topicId
      }
      if (payload.topicId) {
        query.topic = payload.topicId
      }
      router.push({ path: "/chat", query })
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
