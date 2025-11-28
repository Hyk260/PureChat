import type { Directive, DirectiveBinding } from "vue"
import { getLazyLoadInstance, updateLazyLoad } from "@/composables/useLazyload"

export interface LazyDirectiveValue {
  src?: string
  srcset?: string
  sizes?: string
  bg?: string
  bgHidpi?: string
  poster?: string
}

/**
 * v-lazy 指令
 *
 * 使用方式：
 * - v-lazy="'image-url.jpg'" - 简单字符串
 * - v-lazy="{ src: 'image.jpg', srcset: '...' }" - 对象配置
 * - v-lazy:bg="'bg-url.jpg'" - 背景图片
 */
export const vLazy: Directive<HTMLElement, string | LazyDirectiveValue> = {
  mounted(el: HTMLElement, binding: DirectiveBinding<string | LazyDirectiveValue>) {
    el.classList.add("lazy")

    const value = binding.value
    const arg = binding.arg

    if (typeof value === "string") {
      if (arg === "bg") {
        el.setAttribute("data-bg", value)
      } else if (arg === "poster") {
        el.setAttribute("data-poster", value)
      } else {
        el.setAttribute("data-src", value)
      }
    } else if (value && typeof value === "object") {
      if (value.src) el.setAttribute("data-src", value.src)
      if (value.srcset) el.setAttribute("data-srcset", value.srcset)
      if (value.sizes) el.setAttribute("data-sizes", value.sizes)
      if (value.bg) el.setAttribute("data-bg", value.bg)
      if (value.bgHidpi) el.setAttribute("data-bg-hidpi", value.bgHidpi)
      if (value.poster) el.setAttribute("data-poster", value.poster)
    }

    getLazyLoadInstance()
    updateLazyLoad()
  },

  updated(el: HTMLElement, binding: DirectiveBinding<string | LazyDirectiveValue>) {
    if (binding.value !== binding.oldValue) {
      const value = binding.value
      const arg = binding.arg

      if (typeof value === "string") {
        if (arg === "bg") {
          el.setAttribute("data-bg", value)
        } else {
          el.setAttribute("data-src", value)
        }
      }

      updateLazyLoad()
    }
  },

  unmounted(el: HTMLElement) {
    el.classList.remove("lazy", "lazy-loading", "lazy-loaded", "lazy-error")
  },
}

export default vLazy
