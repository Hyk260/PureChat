import { ElButton, type NotificationHandle } from "element-plus"
import { type App, h } from "vue"

import { $t } from "@/locales"

let isShow = false
let Notification: NotificationHandle | null = null
const { DEV: isDev, PROD: isProd, VITE_BASE_URL, VITE_AUTOMATICALLY_DETECT_UPDATE } = import.meta.env

export function setupAppErrorHandle(app: App) {
  app.config.errorHandler = (err, vm, info) => {
    console.error(err, vm, info)
  }
}

function notify() {
  if (Notification) Notification.close()
  Notification = window.$notification!({
    title: $t("system.updateContent"),
    dangerouslyUseHTMLString: true,
    message: h("div", [
      h(
        ElButton,
        {
          onClick() {
            Notification?.close()
          },
        },
        () => $t("system.updateCancel")
      ),
      h(
        ElButton,
        {
          type: "primary",
          onClick() {
            location.reload()
            Notification?.close()
          },
        },
        () => $t("system.updateConfirm")
      ),
    ]),
    onClose: () => {
      isShow = false
    },
    duration: 0,
  })
}

async function getHtmlBuildTime(): Promise<string | null> {
  const baseUrl = VITE_BASE_URL || "/"

  try {
    const res = await fetch(`${baseUrl}index.html?time=${Date.now()}`)

    if (!res.ok) {
      console.error("getHtmlBuildTime error:", res.status, res.statusText)
      return null
    }

    const html = await res.text()
    const match = html.match(/<meta name="buildTime" content="(.*)">/)
    return match?.[1] || null
  } catch (error) {
    console.error("getHtmlBuildTime error:", error)
    return null
  }
}

const checkForUpdates = async () => {
  if (isShow) return

  const buildTime = await getHtmlBuildTime()

  const BUILD_TIME = __APP_INFO__.lastBuildTime

  // If build time hasn't changed, no update is needed
  if (buildTime === BUILD_TIME) {
    return
  }

  isShow = true

  notify()
}

export function setupAppVersionNotification() {
  if (isDev || __IS_ELECTRON__) return
  const canAutoUpdateApp = VITE_AUTOMATICALLY_DETECT_UPDATE === "Y" && isProd
  if (!canAutoUpdateApp) return

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      checkForUpdates()
    }
  })
}
