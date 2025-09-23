import { resolve } from 'path';

export const viteDefine = () => {
  const isDev = process.env.NODE_ENV === 'development';
  
  return {
    // 环境变量
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || (isDev ? 'development' : 'production')),
  };
};

/**
 * 获取路径别名配置
 */
export const getAlias = () => {
  return {
    '@': resolve(__dirname, '../../src'),
    '@purechat/ui': resolve(__dirname, '../../src'),
  };
};

/**
 * 获取构建配置
 */
export const getBuildConfig = () => {
  const isDev = process.env.NODE_ENV === 'development';
  const isAnalyze = process.env.ANALYZE === 'true';
  
  return {
    isDev,
    isAnalyze,
    lib: {
      entry: resolve(__dirname, '../../src/index.tsx'),
      name: 'PureChatUI', // UMD 模式下全局变量名
      formats: ['es'],
      fileName: 'index',
    },
    sourcemap: isDev,
    minify: !isDev ? 'terser' : false,
    terserOptions: !isDev
      ? {
          compress: {
            drop_console: true, // 移除console
            drop_debugger: true, // 移除debugger
            pure_funcs: ['console.log', 'console.warn', 'console.error'], // 移除特定函数调用
          },
          mangle: {
            // 混淆变量名
            properties: {
              regex: /^_/,
            },
          },
        }
      : {},
    chunkSizeWarningLimit: 600,
    cssCodeSplit: true,
  };
};