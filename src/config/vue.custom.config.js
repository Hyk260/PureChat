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
  devServer: {
    // 是否自动打开浏览器.
    open: false,
    // 局域网和本地访问.
    host: "0.0.0.0",
    // 端口.
    port: process.env.VUE_APP_PORT || 9585,
    // 代理.
    proxy:
      process.env.VUE_APP_PROXY === "false"
        ? null
        : {
            "/proxy": {
              // 目标代理服务器地址.
              target: "http://localhost:8888",
              // 是否允许跨域.
              changeOrigin: true,
              secure: true,
              pathRewrite: {
                "^/proxy": "/",
              },
            },
          },
  },
};

module.exports = vueDefaultConfig;
