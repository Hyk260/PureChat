import { defineStore } from "pinia";
import { SetupStoreId } from '@/stores/enum';

// export type RouteKey = keyof RouteMap;

export interface RouteStore {
  /**
   * 缓存的路由，用于keep-alive
   */
  cacheRoutes: string[];
  /**
   * Exclude cache routes
   *
   * for reset route cache
   */
  excludeCacheRoutes: string[];
}

export const useRouteStore = defineStore(SetupStoreId.Route, {
  state: (): RouteStore => ({
    cacheRoutes: ['chat'],
    excludeCacheRoutes: []
  }),
  getters: {},
  actions: {}
});