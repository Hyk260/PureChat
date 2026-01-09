// https://prettier.io/playground

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  trailingComma: "es5",
  /** 是否使用制表符 */
  useTabs: false,
  /** Tab 键的空格数 */
  tabWidth: 2,
  /** 每一行的宽度 */
  printWidth: 140,
  /** 是否换行 */
  proseWrap: "preserve",
  /** 箭头函数的参数无论有几个，都要括号包裹 */
  arrowParens: "always",
  /** 是否加分号 */
  semi: false,
  /** 是否采用单引号 */
  singleQuote: false,
  /** 是否使用单引号 */
  jsxSingleQuote: true,
  /** 换行符的使用 */
  endOfLine: "auto",
};

export default config;
