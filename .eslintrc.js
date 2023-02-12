module.exports = {
  root: true,
  // 指定环境
  env: {
    node: true,
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  // 自定义规则
  rules: {
    'no-unused-vars': 'off', // 禁止未使用过的变量
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    'no-case-declarations': 'off', // 不允许在case/default子句中使用词法声明
  },
};

/*
 * "off" -> 0 关闭规则
 * "warn" -> 1 开启警告规则
 * "error" -> 2 开启错误规则
 */