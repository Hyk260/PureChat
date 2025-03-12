import {
  defineConfig,
  // loadEnv,
  // bytecodePlugin
  // externalizeDepsPlugin
} from 'electron-vite'
import { resolve } from 'path'
import renderer from './vite.config';
import { manualChunks } from "./build/config/define";

export default defineConfig(({ mode }) => {
  return {
    main: {
      plugins: [
        // bytecodePlugin(),
        // https://cn.electron-vite.org/guide/dev#dependencies-vs-devdependencies
        // externalizeDepsPlugin()
      ],
      build: {
        rollupOptions: {
          input: {
            index: resolve(__dirname, 'electron/main/index.js')
          }
        }
      }
    },
    preload: {
      plugins: [
        // bytecodePlugin(),
        // externalizeDepsPlugin()
      ],
      build: {
        rollupOptions: {
          input: {
            index: resolve(__dirname, 'electron/preload/index.js'),
            notif: resolve(__dirname, 'electron/main/notification/preload.js')
          }
        }
      }
    },
    renderer: {
      ...renderer({ mode }),
      root: '.',
      server: {
        port: 8038,
      },
      build: {
        rollupOptions: {
          input: {
            index: resolve(__dirname, 'index.html'),
            notif: resolve(__dirname, 'notif.html')
          },
          // 静态资源分类打包
          output: {
            chunkFileNames: "static/js/[name]-[hash].js",
            entryFileNames: "static/js/[name]-[hash].js",
            // #https://cn.rollupjs.org/configuration-options/#output-assetfilenames
            assetFileNames: "static/[ext]/[name]-[hash].[ext]",
            // 手动分包 #https://cn.rollupjs.org/configuration-options/#output-manualchunks
            manualChunks,
          },
        }
      }
    }
  }
})