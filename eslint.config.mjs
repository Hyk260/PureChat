import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import prettier from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'

// const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";

export default defineConfig([
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  ...pluginVue.configs['flat/strongly-recommended'],
  ...pluginVue.configs['flat/recommended'],
  prettier,
  // JavaScript 文件
  {
    files: ["**/*.?([cm])js"],
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
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // Vue 相关规则
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
      'vue/require-default-prop': 'warn',
      'vue/require-prop-types': 'warn',
      'vue/no-unused-components': 'warn',
      'vue/no-unused-vars': 'warn',

      // 代码质量规则
      'no-console': isProd ? 'warn' : 'off',
      'no-debugger': isProd ? 'warn' : 'off',
      'no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_'
      }],
      'no-undef': 'error',
      'no-unreachable': 'error',
      'no-constant-condition': 'error',
      'no-dupe-keys': 'error',
      'no-dupe-args': 'error',
      'no-dupe-class-members': 'error',
      'no-dupe-else-if': 'error',
      'no-duplicate-imports': 'error',
      'no-empty': 'warn',
      'no-extra-semi': 'error',
      'no-irregular-whitespace': 'error',
      'no-multiple-empty-lines': ['warn', { max: 2 }],
      'no-trailing-spaces': 'error',
      'no-unneeded-ternary': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',

      // Prettier 规则
      'prettier/prettier': 'error',
    },
  },
  // TypeScript 文件
  {
    files: ["**/*.?([cm])ts"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.web.json',
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        __LOCAL_MODE__: 'readonly',
        __IS_ELECTRON__: 'readonly',
        __APP_INFO__: 'readonly',
        Env: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: prettierPlugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...tseslint.configs['recommended-type-checked'].rules,

      // TypeScript 特定规则
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_'
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/prefer-optional-chain': 'warn',
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/await-thenable': 'warn',
      '@typescript-eslint/no-misused-promises': 'warn',
      '@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',

      // 代码质量规则
      'no-console': isProd ? 'warn' : 'off',
      'no-debugger': isProd ? 'warn' : 'off',
      'no-unreachable': 'error',
      'no-constant-condition': 'error',
      'no-dupe-keys': 'error',
      'no-dupe-args': 'error',
      'no-dupe-class-members': 'error',
      'no-dupe-else-if': 'error',
      'no-duplicate-imports': 'error',
      'no-empty': 'warn',
      'no-extra-semi': 'error',
      'no-irregular-whitespace': 'error',
      'no-multiple-empty-lines': ['warn', { max: 2 }],
      'no-trailing-spaces': 'error',
      'no-unneeded-ternary': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',

      // Prettier 规则
      'prettier/prettier': 'error',
    },
  },
  // Vue 文件
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: pluginVue.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // Prettier 规则
      'prettier/prettier': 'error',
    },
  },
  // 声明文件
  {
    files: ["**/*.d.ts"],
    rules: {
      "eslint-comments/no-unlimited-disable": "off",
      "import/no-duplicates": "off",
      "no-restricted-syntax": "off",
      "unused-imports/no-unused-vars": "off"
    }
  },
  // 忽略文件
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.output/**',
      'public/**',
      'build/**',
      '*.d.ts',
      'local/**',
      'scripts/**',
      'coverage/**',
      '.nyc_output/**',
      '*.min.js',
      '*.min.css',
      'pnpm-lock.yaml',
      'package-lock.json',
      'yarn.lock'
    ],
  },
])