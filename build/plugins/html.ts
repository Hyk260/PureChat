import type { Plugin } from "vite"
import { getBuildTime } from "../config/time"
import { __APP_INFO__ } from "../config/define"

export function setupHtmlPlugin() {
  const name = __APP_INFO__?.pkg?.name || "PureChat"
  const version = __APP_INFO__?.pkg?.version || "1.0.0"
  const buildTime = getBuildTime()

  const metaTag = `<meta name="version" content="${version}">\n    <meta name="buildTime" content="${buildTime}">`

  const logScript = `<script data-injected="unplugin-version-injector">
      (function () {
        var isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        var bg = isDark ? '#ffffff' : '#1e1e1e' ;
        var border = 'border-radius: 4px; padding: 4px; font-size: 12px;';
        var styles = {
          version: \`background: \${bg}; color: #00c853; \${border}\`,
          time:    \`background: \${bg}; color: #ffab00; \${border}\`,
        };
        console.log("%c ${name}@${version} ", styles.version);
        console.log("%c Build Time: ${buildTime} ", styles.time);
      })();
    </script>`

  const plugin: Plugin = {
    name: "html-plugin",
    apply: "build",
    // https://cn.vitejs.dev/guide/api-plugin#transformindexhtml
    transformIndexHtml(html) {
      if (!html.includes('<meta name="version"')) {
        html = html.replace("<head>", `<head>\n    ${metaTag}`)
      }

      if (!html.includes('data-injected="unplugin-version-injector"')) {
        html = html.replace(/<\/body>/i, `  ${logScript}\n</body>`)
      }

      return html
    },
  }

  return plugin
}
