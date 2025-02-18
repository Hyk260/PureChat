import { __APP_INFO__ } from "../config/define";

const buildTime = __APP_INFO__.lastBuildTime;

export function setupHtmlPlugin() {
  const plugin = {
    name: "html-plugin",
    apply: "build",
    // https://cn.vitejs.dev/guide/api-plugin#transformindexhtml
    transformIndexHtml(html) {
      return html.replace("<head>", `<head>\n    <meta name="buildTime" content="${buildTime}">`);
    },
  };

  return plugin;
}
