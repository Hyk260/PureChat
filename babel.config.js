/**
 * 主要用于在当前和旧的浏览器或环境中，将 ECMAScript 2015 + 代码转换为 JavaScript 向后兼容版本的代码
 *
 */
const plugins = [];
if (process.env.NODE_ENV === "production") {
  // exclude(忽略)
  plugins.push(["transform-remove-console", { exclude: ["error", "warn"] }]);
}
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins,
};
