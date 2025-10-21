import { defineAsyncComponent, type Component } from "vue"
import type { DefineComponent } from "vue"

/**
 * 异步组件加载配置
 */
interface AsyncComponentConfig {
  loader: () => Promise<any>
  delay?: number
  timeout?: number
}

/**
 * 默认的加载和错误组件配置
 */
const DEFAULT_LOADING_COMPONENT = {
  template: '<div class="message-loading">加载中...</div>',
  style: { height: "36px", color: "#666", fontSize: "12px" },
}

const DEFAULT_ERROR_COMPONENT = {
  template: '<div class="message-error">组件加载失败</div>',
  style: { height: "36px", color: "#c33", fontSize: "12px" },
}

/**
 * 创建异步消息组件的工厂函数
 * 统一配置加载状态、错误状态和超时设置
 *
 * @param loader - 组件加载器函数
 * @param config - 可选的自定义配置
 * @returns 配置好的异步组件
 */
export function createAsyncMessageComponent(
  loader: () => Promise<any>,
  config: Partial<AsyncComponentConfig> = {}
): Component | DefineComponent {
  return defineAsyncComponent({
    loader,
    loadingComponent: DEFAULT_LOADING_COMPONENT,
    errorComponent: DEFAULT_ERROR_COMPONENT,
    delay: config.delay ?? 300,
    timeout: config.timeout ?? 3000,
  })
}
