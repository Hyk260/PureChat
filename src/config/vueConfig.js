/*
 * @Description: webpack 打包配置
 */
const proxy = {
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
};

const pwa = {
  name: "PureChat",
  iconPaths: {
    favicon32: "img/icons/favicon-32x32.png",
  },
  themeColor: "#ffffff00",
  manifestOptions: {
    background_color: "#335eea",
  },
};

module.exports = {
  title: "PureChat", // 标题
  // pwa 渐进式网页应用
  pwa,
  devServer: {
    client: {
      progress: true,
      overlay: false,
    },
    // 是否自动打开浏览器.
    open: true,
    // 局域网和本地访问.
    // host: "0.0.0.0",
    // 端口.
    port: process.env.VITE_PORT || 8080,
    // 代理.
    proxy: process.env.VITE_PROXY === "false" ? null : proxy,
  },
  cdn: {
    css: [],
    js: [
      // #https://github.com/catdad/canvas-confetti/
      // "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js",
      // "https://cdn.bootcdn.net/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",
      // "https://cdn.jsdelivr.net/npm/pinyin-pro@3.18.5/dist/index.js"
    ],
  },
  css: {
    // css文件名是否可省略module,默认为false.
    // requireModuleExtension: false,
    // 是否使用css分离插件 默认生产环境下是true, 开发环境下是false.
    // extract: false,
    // 是否为CSS开启source map.设置为true之后可能会影响构建的性能.
    sourceMap: false,
    // 向CSS相关的loader传递选项(支持:css-loader postcss-loader sass-loader less-loader stylus-loader).
    loaderOptions: {
      sass: {
        // 引入全局scss全局样式
        prependData: `@import '@/styles/mixin.scss';`,
      },
    },
  },
  // 打包忽略项
  externals: {},
  // 用于配置如何展示性能提示，以及如何限制资源体积，从而优化网站性能。
  performance: {
    // 提示类型 warning
    hints: false,
    // 限制入口文件（即webpack.config.js中配置的entry属性）的体积不超过100KB。
    // maxEntrypointSize: 102400 * 1,
    // 限制单个资源（如js文件、css文件等）的体积不超过100KB。
    // maxAssetSize: 102400 * 1,
  },
  // 用于配置代码分割
  optimization: {
    realContentHash: true,
  },
};
