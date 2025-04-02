import process from 'node:process';
import path from 'node:path';
import AutoImport from 'unplugin-auto-import/vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export function setupUnplugin(viteEnv) {
  const plugins = [
    // SvgIcon
    createSvgIconsPlugin({
      iconDirs: [path.join(process.cwd(), "src/assets/icons/svg")],
      symbolId: `${viteEnv.VITE_ICON_LOCAL_PREFIX}-[dir]-[name]`,
      inject: "body-last",
      customDomId: "__SVG_ICON_LOCAL__",
    }),
  ];

  if (viteEnv.VITE_AUTO_COMPONENT === "Y") {
    plugins.push(
      Components({
        dts: 'src/typings/components.d.ts',
        types: [{ from: 'vue-router', names: ['RouterLink', 'RouterView'] }],
        resolvers: [ElementPlusResolver()]
      })
    )
  }

  if (viteEnv.VITE_AUTO_IMPORT === "Y") {
    plugins.push(
      AutoImport({
        // resolvers: [ElementPlusResolver()],
        imports: [
          'vue',
          'vue-router',
          'pinia'
          // 你可以在这里添加更多的自动导入
          // { from: 'vue-router', imports: ['RouterLink', 'RouterView'] },
        ],
        dts: 'src/typings/auto-imports.d.ts',
      })
    );
  }

  return plugins;
}
