export function setupHtmlPlugin(buildTime) {
  const plugin = {
    name: 'html-plugin',
    apply: 'build',
    // https://cn.vitejs.dev/guide/api-plugin#transformindexhtml
    transformIndexHtml(html) {
      return html.replace('<head>', `<head>\n    <meta name="buildTime" content="${buildTime}">`);
    }
  };

  return plugin;
}
