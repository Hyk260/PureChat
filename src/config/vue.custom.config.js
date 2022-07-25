/*
 * @Description: webpack 打包配置
 */
const vueDefaultConfig = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: true,
  production: process.env.NODE_ENV === "production", // 环境配置
  transpileDependencies: ["vue-echarts", "resize-detector"],
  //webpack 配置的项目名称
  title: "PURE ADMIN", // 标题
  pwa: false,
  titleSeparator: " - ",
  titleReverse: false,
  devPort: "9999",
  abbreviation: "vt2at",
  providePlugin: {},
  build7z: false,
  startMessage: "",
};

module.exports = vueDefaultConfig;
