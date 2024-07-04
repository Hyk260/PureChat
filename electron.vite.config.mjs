import { defineConfig, loadEnv } from 'electron-vite'
import { resolve } from 'path'
import renderer from './vite.config';

export default defineConfig(({ mode }) => {
  return {
    main: {
      build: {
        rollupOptions: {
          input: {
            index: resolve(__dirname, 'electron/main/index.js')
          }
        }
      }
    },
    preload: {
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