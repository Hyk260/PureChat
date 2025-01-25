import { defineConfig } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'
import presetUno from '@unocss/preset-uno'

export default defineConfig({
  content: {
    pipeline: {
      exclude: ['node_modules', 'dist', '.git', '.vscode', 'public', 'build', 'config']
    }
  },
  presets: [
    presetUno(),
    presetRemToPx({ baseFontSize: 4 }),
  ],
  /**
   * 快捷键命名标准
   */
  shortcuts: {
    "wh-full": 'w-full h-full',
    'flex-c': 'flex justify-center items-center',
    'flex-sc': 'flex justify-start items-center',
    'flex-ac': 'flex justify-around items-center',
    'flex-bc': 'flex justify-between items-center',
    'flex-ae': 'flex justify-around items-end',
    'flex-ss': 'flex justify-start items-start',
  }
})