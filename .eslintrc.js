module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential", //  检查 Vue3 语法
    "eslint:recommended", // 使用 ESLint 推荐规则
    "@vue/prettier", // 集成 Prettier，确保 ESLint 规则和 Prettier 规则相一致。
  ],
  // ESLint 的解析器选项
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  // 自定义规则
  rules: {
    "no-undef": "off", // 禁用未声明的变量
    "no-unused-vars": "off", // 禁止未使用过的变量
    "no-console": "off",
    "no-debugger": "off",
    "no-case-declarations": "off", // 不允许在case/default子句中使用词法声明
    "arrow-parens": ["error", "always"], // 规则用于控制箭头函数的参数括号，'always'表示参数必须加上括号。
    "prettier/prettier": "warn",
    "vue/valid-define-props": "off",
    "vue/valid-define-emits": "off",
    "no-inner-declarations": "off", // function不允许在嵌套块中使用变量或声明
    "vue/multi-word-component-names": [
      "off",
      {
        ignores: [],
      },
    ],
  },
};
