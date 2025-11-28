import { ref, onMounted, onUnmounted } from "vue"
import LazyLoad from "vanilla-lazyload"

import type { Ref } from "vue"
import type { ILazyLoadInstance, ILazyLoadOptions } from "vanilla-lazyload"

let lazyLoadInstance: ILazyLoadInstance | null = null

const defaultOptions: ILazyLoadOptions = {
  elements_selector: ".lazy",
  threshold: 300,
  class_loading: "lazy-loading",
  class_loaded: "lazy-loaded",
  class_error: "lazy-error",
}

/**
 * @sse https://github.com/verlok/vanilla-lazyload
 * @description: lazyload
 */
export function getLazyLoadInstance(options?: ILazyLoadOptions): ILazyLoadInstance {
  if (!lazyLoadInstance) {
    lazyLoadInstance = new LazyLoad({
      ...defaultOptions,
      ...options,
    })
  }
  return lazyLoadInstance
}

export function updateLazyLoad() {
  lazyLoadInstance?.update()
}

export function destroyLazyLoad() {
  lazyLoadInstance?.destroy()
  lazyLoadInstance = null
}

export function useLazyLoad(options?: ILazyLoadOptions) {
  const instance: Ref<ILazyLoadInstance | null> = ref(null)

  onMounted(() => {
    instance.value = getLazyLoadInstance(options)
  })

  onUnmounted(() => {
    // destroyLazyLoad()
  })

  return {
    instance,
    update: updateLazyLoad,
    destroy: destroyLazyLoad,
    /**
     * 手动加载指定元素
     */
    load: (el: HTMLElement) => {
      LazyLoad.load(el, defaultOptions)
    },
    /**
     * 重置元素状态
     */
    resetStatus: (el: HTMLElement) => {
      LazyLoad.resetStatus(el)
    },
  }
}

export function useLazyElement() {
  const elementRef = ref<HTMLElement | null>(null)
  const isLoaded = ref(false)
  const isError = ref(false)

  onMounted(() => {
    if (elementRef.value) {
      const instance = getLazyLoadInstance({
        callback_loaded: (el) => {
          if (el === elementRef.value) {
            isLoaded.value = true
          }
        },
        callback_error: (el) => {
          if (el === elementRef.value) {
            isError.value = true
          }
        },
      })
      instance.update()
    }
  })

  return {
    elementRef,
    isLoaded,
    isError,
  }
}
