import { defineConfig, loadEnv, bytecodePlugin } from 'electron-vite'
import { resolve } from 'path'
import renderer from './vite.config';

export default defineConfig(({ mode }) => {
  return {
    main: {
      plugins: [bytecodePlugin()],
      build: {
        rollupOptions: {
          input: {
            index: resolve(__dirname, 'electron/main/index.js')
          }
        }
      }
    },
    preload: {
      plugins: [bytecodePlugin()],
      build: {
        rollupOptions: {
          input: {
            index: resolve(__dirname, 'electron/preload/index.js')
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
            index: resolve(__dirname, 'index.html')
          },
        }
      }
    }
  }
})