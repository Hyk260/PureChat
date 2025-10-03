import type { ComponentCustomProperties } from 'vue'

declare module 'vue' {
  interface ComponentCustomProperties {
    /** 全局应用配置 */
    $appConfig: {
      /** 是否是electron环境 */
      isElectron: boolean
      /** 是否是本地模式 */
      isLocalMode: boolean
      [key: string]: any
    }

    IS_ELECTRON: boolean
    IS_LOCAL_MODE: boolean
  }
}

export {}
