import type { App } from "vue"
import { vLazy } from "@/directives/lazy"
import { getLazyLoadInstance } from "@/composables/useLazyload"

import type { ILazyLoadOptions } from "vanilla-lazyload"

/**
 * 全局注册懒加载功能
 */
export function useLazyLoad(app: App, options?: ILazyLoadOptions) {
  getLazyLoadInstance(options)

  app.directive("lazy", vLazy)

  app.config.globalProperties.$lazyLoad = {
    update: () => getLazyLoadInstance().update(),
    destroy: () => getLazyLoadInstance().destroy(),
  }
}

export default useLazyLoad
