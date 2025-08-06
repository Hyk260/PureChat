import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import prettier from 'eslint-config-prettier'
import globals from 'globals'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import { defineConfig } from 'eslint/config'

// const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";

export default defineConfig([
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
        // 浏览器环境全局变量
        ...globals.browser,
        // Node.js 环境全局变量
        ...globals.node,
        // 自定义全局变量
        __LOCAL_MODE__: 'readonly',
        __IS_ELECTRON__: 'readonly',
        __APP_INFO__: 'readonly',
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
      'no-console': isProd ? 'warn' : 'off',
      'no-debugger': isProd ? 'warn' : 'off',
      // 禁止未使用的变量
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      // 禁止未定义的变量
      'no-undef': ['warn', { typeof: true }],
    },
  },
  {
    files: ['**/*.{ts}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        __LOCAL_MODE__: 'readonly',
        __IS_ELECTRON__: 'readonly',
        __APP_INFO__: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
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
])