const pkg = require("./package.json");
const dayjs = require("dayjs");
const {
  cdn,
  title,
  externals,
  devServer,
  production,
  publicPath,
  performance,
} = require("./src/config/vue.custom.config");

const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack"); // 组件按需引入
const CompressionPlugin = require("compression-webpack-plugin"); // gzip压缩
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer"); // 打包文件分析工具
// const DefineOptions = require('unplugin-vue-define-options/webpack')

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
};

const path = require("path");
const resolve = (dir) => {
  return path.join(__dirname, dir);
};

module.exports = {
  // 是否在保存的时候检查
  lintOnSave: false,
  // 开发以及生产环境的路径配置
  publicPath: production ? "/" : "/",
  // 打包时输出的文件目录
  outputDir: "dist",
  //是否为生产环境构建生成 source map?
  productionSourceMap: false,
  // 配置 webpack-dev-server
  // devServer,
  // css相关配置.
  css: {
    // css文件名是否可省略module,默认为false.
    // requireModuleExtension: false,
    // 是否使用css分离插件 默认生产环境下是true, 开发环境下是false.
    extract: production,
    // 是否为CSS开启source map.设置为true之后可能会影响构建的性能.
    sourceMap: false,
    // 向CSS相关的loader传递选项(支持:css-loader postcss-loader sass-loader less-loader stylus-loader).
    /* loaderOptions: {
      sass: {
        // 引入全局scss全局样式
        prependData: `@import '~@/assets/sass/element.scss';`
      }
    } */
  },
  // 对内部的webpack配置(比如修改、增加Loader选项)(链式操作).
  chainWebpack(config) {
    // 为生产环境修改配置...
    if (production) {
      // 清除css,js版本号
      // config.output.filename("static/js/[name].js").end();
      // config.output.chunkFilename("static/js/[name].js").end();
      // config.plugin("extract-css").tap((args) => [
      //   {
      //     filename: `static/css/[name].css`,
      //     chunkFilename: `static/css/[name].css`,
      //   },
      // ]);

      // const analyzer = new BundleAnalyzerPlugin({
      //   analyzerPort: 9999
      // })
      // config.plugin('webpack-bundle-analyzer').use(analyzer)
    }
    // svg-sprite-loader 配置
    const svgRule = config.module.rule("svg"); // 找到svg-loader
    svgRule.uses.clear(); // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule.exclude.add(/node_modules/); // 正则匹配排除node_modules目录
    svgRule
      .test(/\.svg$/)
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ symbolId: "icon-[name]" });

    // 根路径
    config.resolve.alias.set("@", resolve("src"));

    config.plugin("html").tap((args) => {
      args[0].title = title; // 修改标题
      args[0].cdn = cdn; // CDN外链
      args[0].__APP_INFO__ = JSON.stringify(__APP_INFO__);
      return args;
    });
  },
  // webpack配置
  configureWebpack: {
    externals,
    plugins: [
      // setup语法糖通过defineOptions定义组件name
      // DefineOptions()
      // 自动按需引入 vue\vue-router\vuex 等的 api
      AutoImport({
        imports: ["vue"],
        resolvers: [ElementPlusResolver()],
      }),
      // 按需引入Element-plus
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      // 压缩配置
      // new CompressionPlugin({
      //   test: /\.(js|css|html)?$/i, // 压缩文件格式
      //   filename: '[path].gz[query]', // 压缩后的文件名
      //   algorithm: 'gzip', // 使用gzip压缩
      //   minRatio: 0.8 // 压缩率小于1才会压缩
      // })
    ],
    // webpack 的性能提示
    // performance,
  },
};
