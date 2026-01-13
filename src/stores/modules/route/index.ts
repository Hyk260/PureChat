import { defineStore } from "pinia"
import { SetupStoreId } from "@/stores/enum"
import { getCacheRouteNames, getTabIdByRoute } from "./shared"
import { useChatStore } from "@/stores/modules/chat"
import { useTopicStore } from "@/stores/modules/topic"

import router from "@/router"
import type { DB_Session } from "@pure/database/schemas"
// export type RouteKey = keyof RouteMap;

/**
 * 路由查询参数类型
 */
export interface RouteQueryParams {
  session?: string
  topicId?: string
}

/**
 * routerPushQuery 函数参数类型
 */
export interface RouterPushQueryOptions {
  path?: string
  query?: RouteQueryParams
}

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
    routerPushQuery({ path = "/chat", query }: RouterPushQueryOptions) {
      const _query: Record<string, string> = {}

      if (query?.session) {
        _query.session = query.session
      }

      if (query?.topicId) {
        _query.topic = query.topicId
      }

      router.push({ path, query: _query })
    },
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
      this.routerPushQuery({
        query: {
          session: payload.conversationID,
          topicId: topicStore.topicId || "",
        },
      })
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
