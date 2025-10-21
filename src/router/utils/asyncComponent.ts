import { defineAsyncComponent } from "vue"
import { ElLoading } from "element-plus"

/**
 * 创建带错误处理的异步组件
 * @param loader 组件加载函数
 * @param options 配置选项
 * @returns 异步组件
 */
export function createAsyncComponent(
  loader: () => Promise<any>,
  options: {
    /** 加载超时时间（毫秒），默认 5000 */
    timeout?: number
    /** 是否显示加载状态，默认 true */
    showLoading?: boolean
    /** 加载失败时的重试次数，默认 3 */
    retryCount?: number
  } = {}
) {
  const { timeout = 5000, showLoading = true, retryCount = 3 } = options

  let loadingInstance: any = null

  return defineAsyncComponent({
    loader: async () => {
      let attempts = 0

      while (attempts <= retryCount) {
        try {
          if (showLoading && !loadingInstance) {
            loadingInstance = ElLoading.service({
              lock: true,
              text: "正在加载组件...",
              background: "rgba(0, 0, 0, 0.7)",
            })
          }

          const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error("组件加载超时")), timeout)
          })

          const componentPromise = loader()

          const component = await Promise.race([componentPromise, timeoutPromise])

          if (loadingInstance) {
            loadingInstance.close()
            loadingInstance = null
          }

          return component
        } catch (error) {
          attempts++
          console.warn(`组件加载失败，第 ${attempts} 次尝试:`, error)

          if (attempts > retryCount) {
            if (loadingInstance) {
              loadingInstance.close()
              loadingInstance = null
            }

            throw new Error(`组件加载失败，已重试 ${retryCount} 次: ${error}`)
          }

          await new Promise((resolve) => setTimeout(resolve, 1000 * attempts))
        }
      }
    },

    // 加载组件
    loadingComponent: defineAsyncComponent(() => import("../components/LoadingComponent.vue")),

    // 错误组件
    errorComponent: defineAsyncComponent(() => import("../components/ErrorComponent.vue")),

    // 延迟显示加载组件的时间
    delay: 200,

    // 超时时间
    timeout: timeout + 1000,
  })
}

/**
 * 创建路由异步组件的便捷函数
 * @param importPath 组件导入路径
 * @param options 配置选项
 * @returns 异步组件
 */
export function createRouteComponent(importPath: string, options?: Parameters<typeof createAsyncComponent>[1]) {
  return createAsyncComponent(() => import(/* @vite-ignore */ importPath), options)
}
