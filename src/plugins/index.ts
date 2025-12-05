import { setupAppErrorHandle, setupAppVersionNotification } from "./app"
import { setupDayjs } from "./dayjs"
import { useElementPlus } from "./elementPlus"
// import { setupNProgress } from "./nprogress"
import { setupIconifyOffline } from "./iconify"
import { useElIcons } from "./icons"
import { useLazyLoad } from "./lazyload"

import type { App } from "vue"

import "./assets"

const { DEV: isDev } = import.meta.env

function useGlobalProperties(app: App) {
  app.config.globalProperties.$appConfig = {
    isElectron: __IS_ELECTRON__,
    isLocalMode: __LOCAL_MODE__,
  }
  app.config.globalProperties.IS_DEV = isDev
  app.config.globalProperties.IS_ELECTRON = __IS_ELECTRON__
  app.config.globalProperties.IS_LOCAL_MODE = __LOCAL_MODE__
}

export function setupPlugins(app: App) {
  app.use(useElIcons)
  app.use(useElementPlus)
  app.use(useGlobalProperties)
  app.use(useLazyLoad)
  setupIconifyOffline()
  // setupNProgress()
  setupAppVersionNotification()
  setupAppErrorHandle(app)
  setupDayjs()
}
