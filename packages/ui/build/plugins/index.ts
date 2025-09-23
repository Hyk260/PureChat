import react from '@vitejs/plugin-react';
import { CodeInspectorPlugin } from 'code-inspector-plugin';
import { visualizer } from 'rollup-plugin-visualizer';
import type { PluginOption } from 'vite';

/**
 * 配置 Vite 插件
 */
export function setupVitePlugins() {
  const isDev = process.env.NODE_ENV === 'development';
  const isAnalyze = process.env.ANALYZE === 'true';
  
  const plugins: PluginOption = [
    react({
      babel: {
        plugins: !isDev
          ? [
              // 生产环境移除 propTypes
              ['transform-react-remove-prop-types', { removeImport: true }],
            ]
          : [],
      },
    }),
    // 只在开发环境下启用 CodeInspectorPlugin
    ...(isDev ? [CodeInspectorPlugin({ bundler: 'vite' })] : []),
  ];
  
  // 包大小分析
  if (isAnalyze) {
    plugins.push(
      visualizer({
        filename: 'stats.html',
        gzipSize: true,
        brotliSize: true,
        open: true,
      }),
    );
  }
  
  return plugins;
}

/**
 * 获取 Rollup 配置
 */
export function getRollupOptions() {
  const isDev = process.env.NODE_ENV === 'development';
  
  return {
    output: {
      inlineDynamicImports: true,
      // 生产环境下进行代码优化
      compact: !isDev,
      // 生产环境下混淆属性名
      generatedCode: {
        reservedNamesAsProps: false,
      },
      extend: true,
      // 静态资源文件名哈希，避免缓存问题
      assetFileNames: 'assets/[name].[hash].[ext]',
    },
    // 配置treeshaking优化
    treeshake: {
      // 生产环境启用treeshaking
      moduleSideEffects: false,
      // 更严格的treeshaking
      preset: 'smallest',
    },
  };
}