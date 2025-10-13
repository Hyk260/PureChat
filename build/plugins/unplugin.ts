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
      iconDirs: [path.join(process.cwd(), "src/assets/svg-icon")],
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
        include: [/\.vue$/, /\.tsx$/, /\.ts$/],
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
          // "@vueuse/core",
          // { from: 'vue-router', imports: ['RouterLink', 'RouterView'] },
        ],
        dts: "src/typings/auto-imports.d.ts",
        include: [/\.vue$/, /\.ts$/],
        eslintrc: {
          enabled: true, // 开启生成 ESLint 配置
          filepath: "./.eslintrc-auto-import.json", // 生成的文件
          globalsPropValue: true,
        },
      })
    )
  }

  return plugins
}
