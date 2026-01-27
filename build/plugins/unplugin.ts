import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver, AntDesignVueResolver } from "unplugin-vue-components/resolvers"
import type { PluginOption } from "vite"

export function setupUnplugin(viteEnv: Env.ImportMeta) {
  const { VITE_AUTO_COMPONENT, VITE_AUTO_IMPORT } = viteEnv

  const plugins: PluginOption = []

  if (VITE_AUTO_COMPONENT === "Y") {
    plugins.push(
      Components({
        dts: "src/typings/components.d.ts",
        types: [{ from: "vue-router", names: ["RouterLink", "RouterView"] }],
        resolvers: [
          ElementPlusResolver(),
          AntDesignVueResolver({
            importStyle: "css",
          }),
        ],
        include: [/\.vue$/, /\.tsx$/, /\.ts$/],
      })
    )
  }

  if (VITE_AUTO_IMPORT === "Y") {
    plugins.push(
      AutoImport({
        resolvers: [
          // ElementPlusResolver(),
          // AntDesignVueResolver()
        ],
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
