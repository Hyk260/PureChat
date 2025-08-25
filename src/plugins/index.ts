import { setupAppErrorHandle, setupAppVersionNotification } from "./app"
import { setupDayjs } from "./dayjs"
import { useElementPlus } from "./elementPlus"
// import { setupNProgress } from "./nprogress"
import { setupIconifyOffline } from "./iconify"
import { useElIcons } from "./icons"

import type { App } from "vue"

import "./assets"

function useGlobalProperties(app: App) {
  app.config.globalProperties.IS_ELECTRON = __IS_ELECTRON__
  app.config.globalProperties.IS_LOCAL_MODE = __LOCAL_MODE__
}

export function setupPlugins(app: App) {
  app.use(useElIcons)
  app.use(useElementPlus)
  app.use(useGlobalProperties)
  setupIconifyOffline()
  // setupNProgress()
  setupAppVersionNotification()
  setupAppErrorHandle(app)
  setupDayjs()
}
