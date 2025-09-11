import type { Plugin } from "vite"
import { getBuildTime } from "../config/time"

export function setupHtmlPlugin() {
  const buildTime = getBuildTime()
  const plugin: Plugin = {
    name: "html-plugin",
    apply: "build",
    // https://cn.vitejs.dev/guide/api-plugin#transformindexhtml
    transformIndexHtml(html) {
      return html.replace("<head>", `<head>\n    <meta name="buildTime" content="${buildTime}">`)
    },
  }

  return plugin
}
