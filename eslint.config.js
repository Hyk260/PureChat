import js from "@eslint/js"
import tseslint from "@typescript-eslint/eslint-plugin"
import tsparser from "@typescript-eslint/parser"
import { defineConfig } from "eslint/config"
import prettier from "eslint-config-prettier"
import prettierPlugin from "eslint-plugin-prettier"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import unusedImports from "eslint-plugin-unused-imports"
import pluginVue from "eslint-plugin-vue"
// import * as parserVue from "vue-eslint-parser";
import globals from "globals"

const isProd = process.env.NODE_ENV === "production"

/**
 * ESLint 配置
 * @see https://eslint.vuejs.org/user-guide/#configuration
 * @see https://eslint.org/docs/user-guide/configuring/configuration-files
 */
export default defineConfig([
  // 基础 JavaScript 规则
  js.configs.recommended,
  // Vue 相关规则
  ...pluginVue.configs["flat/essential"],
  ...pluginVue.configs["flat/strongly-recommended"],
  ...pluginVue.configs["flat/recommended"],
  // Prettier 配置（禁用与 Prettier 冲突的规则）
  prettier,
  // TypeScript 源码文件
  {
    files: ["src/**/*.?([cm])ts"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.web.json",
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        process: "readonly",
        __APP_INFO__: "readonly",
        __IS_ELECTRON__: "readonly",
        __LOCAL_MODE__: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      prettier: prettierPlugin,
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
    },
    rules: {
      // 继承推荐规则
      ...tseslint.configs.recommended.rules,
      ...tseslint.configs["recommended-type-checked"].rules,
      // === TypeScript 特定规则 ===
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/prefer-nullish-coalescing": "off",
      "@typescript-eslint/prefer-optional-chain": "warn",
      "@typescript-eslint/no-unnecessary-type-assertion": "warn",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/await-thenable": "warn",
      "@typescript-eslint/no-misused-promises": "warn",
      "@typescript-eslint/require-await": "warn",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-var-requires": "error",
      "@typescript-eslint/prefer-ts-expect-error": "warn",
      "@typescript-eslint/consistent-type-definitions": ["warn", "interface"],
      "@typescript-eslint/consistent-type-imports": [
        "off",
        {
          prefer: "type-imports",
          fixStyle: "separate-type-imports",
        },
      ],
      "@typescript-eslint/no-import-type-side-effects": "warn",
      "@typescript-eslint/prefer-readonly": "off",
      // "@typescript-eslint/strict": "error",
      // "@typescript-eslint/no-explicit-any": "error",
      // "@typescript-eslint/no-unsafe-argument": "error",
      // "@typescript-eslint/no-unsafe-member-access": "error",
      // "@typescript-eslint/no-unsafe-return": "error",

      // === 代码质量规则 ===
      "no-console": isProd ? "warn" : "off",
      "no-debugger": isProd ? "error" : "off",
      "no-undef": "warn",
      "no-unreachable": "error",
      "no-constant-condition": "error",
      "no-dupe-keys": "error",
      "no-dupe-args": "error",
      "no-dupe-class-members": "error",
      "no-dupe-else-if": "error",
      "no-duplicate-imports": "off",
      "no-empty": ["warn", { allowEmptyCatch: true }],
      "no-extra-semi": "error",
      "no-irregular-whitespace": "error",
      "no-multiple-empty-lines": ["warn", { max: 2, maxEOF: 1, maxBOF: 0 }],
      "no-trailing-spaces": "error",
      "no-unneeded-ternary": "warn",
      "prefer-const": "error",
      "no-var": "error",
      eqeqeq: ["error", "always", { null: "ignore" }],
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",
      "no-return-assign": "error",
      "no-sequences": "error",
      "no-throw-literal": "error",
      "prefer-promise-reject-errors": "error",

      // === Import/Export 规则 ===
      "simple-import-sort/imports": [
        "warn",
        {
          groups: [
            // Node.js 内置模块
            ["^node:"],
            // Vue 相关包
            ["^vue", "^@vue", "^@?\\w.*vue"],
            // 第三方包
            ["^@?\\w"],
            // 内部模块
            ["^@/"],
            // 相对导入
            ["^\\."],
            // 类型导入
            ["^.*\\u0000$"],
          ],
        },
      ],
      "simple-import-sort/exports": "warn",
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // === Prettier 规则 ===
      "prettier/prettier": "warn",
    },
  },
  // TypeScript 配置文件和测试文件
  {
    files: ["**/*.config.?([cm])ts", "**/*.test.?([cm])ts", "**/*.spec.?([cm])ts"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        Env: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      prettier: prettierPlugin,
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
    },
    rules: {
      // 仅基础规则，不包含类型检查
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-explicit-any": "off", // 配置文件中允许 any
      "@typescript-eslint/no-var-requires": "off", // 配置文件中可能需要 require
      "prettier/prettier": "warn",
      "no-undef": "warn",
    },
  },
  // Vue 单文件组件
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: pluginVue.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        extraFileExtensions: [".vue"],
        parser: tsparser,
        parserOptions: {
          project: "./tsconfig.web.json",
          tsconfigRootDir: import.meta.dirname,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        process: "readonly",
        __APP_INFO__: "readonly",
        __IS_ELECTRON__: "readonly",
        __LOCAL_MODE__: "readonly",
      },
    },
    plugins: {
      vue: pluginVue,
      prettier: prettierPlugin,
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
    },
    rules: {
      // Vue 特定规则
      ...pluginVue.configs["flat/essential"].rules,
      ...pluginVue.configs["flat/strongly-recommended"].rules,
      ...pluginVue.configs["flat/recommended"].rules,
      "vue/multi-word-component-names": "off",
      "vue/no-unused-vars": "warn",
      "vue/no-unused-components": "warn",
      "vue/prefer-import-from-vue": "warn",
      "vue/prefer-separate-static-class": "warn",
      "vue/prefer-true-attribute-shorthand": "off",

      // Import 规则
      "simple-import-sort/imports": [
        "warn",
        {
          groups: [
            // Vue 相关包
            ["^vue", "^@vue", "^@?\\w.*vue"],
            // 第三方包
            ["^@?\\w"],
            // 内部模块
            ["^@/"],
            // 相对导入
            ["^\\."],
            // 类型导入
            ["^.*\\u0000$"],
          ],
        },
      ],
      "simple-import-sort/exports": "warn",
      "unused-imports/no-unused-imports": "warn",

      // 性能相关
      // "vue/no-watch-after-await": "warn",
      // "vue/require-component-is": "warn",

      // Composition API 最佳实践
      // "vue/block-order": ["warn", {
      //   "order": ["script", "template", "style"]
      // }],
      // Prettier 规则
      "prettier/prettier": "warn",
    },
  },
  // 声明文件
  {
    files: ["**/*.d.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "eslint-comments/no-unlimited-disable": "off",
      "import/no-duplicates": "off",
      "no-restricted-syntax": "off",
      "unused-imports/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "off",
    },
  },
  // 忽略文件
  {
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "**/.output/**",
      "**/public/**",
      "**/build/**",
      "**/local/**",
      "**/scripts/**",
      "**/coverage/**",
      "**/*.min.js",
    ],
  },
])
