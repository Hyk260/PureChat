import { useEventListener } from "@vueuse/core"

import { debounce, isArray, isFunction, isObject, throttle } from "lodash-es"

import type { Directive, DirectiveBinding } from "vue"

/**
 * 优化指令的选项接口
 */
export interface OptimizeOptions {
  /** 事件名 */
  event: string
  /** 事件触发的方法 */
  fn: (...params: any) => any
  /** 是否立即执行 */
  immediate?: boolean
  /** 防抖或节流的延迟时间（防抖默认：`200`毫秒、节流默认：`1000`毫秒） */
  timeout?: number
  /** 传递的参数 */
  params?: any[] | Record<string, any>
}

/**
 * 支持的优化类型
 */
export type OptimizeType = "debounce" | "throttle"

/**
 * 防抖（v-optimize或v-optimize:debounce）、节流（v-optimize:throttle）指令
 * 使用示例：
 * - 防抖: v-optimize="{ event: 'input', fn: handleInput }"
 * - 节流: v-optimize:throttle="{ event: 'scroll', fn: handleScroll }"
 */
export const optimize: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<OptimizeOptions>) {
    const { value } = binding
    // 设置默认优化类型为防抖
    const optimizeType = (binding.arg as OptimizeType) ?? "debounce"

    // 验证优化类型是否支持
    if (!["debounce", "throttle"].includes(optimizeType)) {
      throw new Error("[Directive: optimize]: only `debounce` and `throttle` are supported")
    }

    // 验证必要的配置项
    if (!value?.event || !isFunction(value.fn)) {
      throw new Error("[Directive: optimize]: `event` and `fn` are required, and `fn` must be a function")
    }

    // 处理参数
    let params: any[] | null = null
    if (value.params) {
      if (isArray(value.params)) {
        params = value.params
      } else if (isObject(value.params)) {
        params = [value.params]
      } else {
        throw new Error("[Directive: optimize]: `params` must be an array or object")
      }
    }

    // 根据优化类型创建对应的处理函数
    const handler = params ? () => value.fn(...params) : value.fn

    // 设置默认超时时间
    const defaultTimeout = optimizeType === "debounce" ? 200 : 1000

    // 注册事件监听（VueUse会自动处理销毁）
    useEventListener(
      el,
      value.event,
      optimizeType === "debounce"
        ? debounce(handler, value?.timeout ?? defaultTimeout, {
            leading: value?.immediate ?? false,
          })
        : throttle(handler, value?.timeout ?? defaultTimeout)
    )
  },
}
