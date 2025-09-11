import process from "node:process"
import path from "node:path"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import type { PluginOption } from "vite"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"

export function setupUnplugin(viteEnv: Env.ImportMeta) {
  const { VITE_AUTO_COMPONENT, VITE_ICON_LOCAL_PREFIX, VITE_AUTO_IMPORT } = viteEnv

  const plugins: PluginOption = [
    // SvgIcon
    createSvgIconsPlugin({
      iconDirs: [path.join(process.cwd(), "src/assets/icons/svg")],
      symbolId: `${VITE_ICON_LOCAL_PREFIX}-[dir]-[name]`,
      inject: "body-last",
      customDomId: "__SVG_ICON_LOCAL__",
    }),
  ]

  if (VITE_AUTO_COMPONENT === "Y") {
    plugins.push(
      Components({
        dts: "src/typings/components.d.ts",
        types: [{ from: "vue-router", names: ["RouterLink", "RouterView"] }],
        resolvers: [ElementPlusResolver()],
        include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/, /\.ts$/],
      })
    )
  }

  if (VITE_AUTO_IMPORT === "Y") {
    plugins.push(
      AutoImport({
        // resolvers: [ElementPlusResolver()],
        imports: [
          "vue",
          "vue-router",
          "pinia",
          // 你可以在这里添加更多的自动导入
          // { from: 'vue-router', imports: ['RouterLink', 'RouterView'] },
        ],
        dts: "src/typings/auto-imports.d.ts",
        include: [/\.vue$/, /\.vue\?vue/, /\.ts$/],
      })
    )
  }

  return plugins
}
