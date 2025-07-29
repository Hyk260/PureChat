import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import prettier from 'eslint-config-prettier'

export default [
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  ...pluginVue.configs['flat/strongly-recommended'],
  ...pluginVue.configs['flat/recommended'],
  prettier,
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // 浏览器全局变量
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        // Node.js 全局变量
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.output/**',
      'public',
      'build',
      '*.d.ts',
      'local/**',
      '/src/assets',
      'scripts/**'
    ],
  },
]