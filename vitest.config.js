import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

// https://cn.vitest.dev/config/#配置索引
export default defineConfig({
  plugins: [
    vue(),
  ],
  test: {
    environment: 'happy-dom',
  },
})