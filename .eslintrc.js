module.exports = {
  root: true,
  // 指定环境
  env: {
    // browser: true,
    node: true,
    // es6: true
  },
  extends: [
    // 'plugin:prettier/recommended',
    "plugin:vue/vue3-essential", //  检查 Vue3 语法
    "eslint:recommended", // 使用 ESLint 推荐规则
    "@vue/prettier", // 集成 Prettier，确保 ESLint 规则和 Prettier 规则相一致。
  ],
  // ESLint 的解析器选项
  parserOptions: {
    parser: "babel-eslint",
  },
  // 自定义规则
  rules: {
    "no-unused-vars": "off", // 禁止未使用过的变量
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-case-declarations": "off", // 不允许在case/default子句中使用词法声明
    "arrow-parens": ["error", "always"], // 规则用于控制箭头函数的参数括号，'always'表示参数必须加上括号。
    // "arrow-body-style": ["error", "always"], // 该规则可以强制或禁止箭头函数体使用大括号。
    // 'prefer-arrow-callback': 'off',
    "prettier/prettier": "warn", // off warn
  },
};

/*
 * "off" -> 0 关闭规则
 * "warn" -> 1 开启警告规则
 * "error" -> 2 开启错误规则
 */
