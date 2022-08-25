const {
  cdn,
  title,
  externals,
  devServer,
  production,
} = require("./src/config/vue.custom.config");

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
    // extract: false,
    // 是否为CSS开启source map.设置为true之后可能会影响构建的性能.
    // sourceMap: false,
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
      config.output.filename("static/js/[name].js").end();
      config.output.chunkFilename("static/js/[name].js").end();
      config.plugin("extract-css").tap((args) => [
        {
          filename: `static/css/[name].css`,
          chunkFilename: `static/css/[name].css`,
        },
      ]);
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
      return args;
    });
  },
  // webpack配置
  configureWebpack: (config) => {
    // Object.assign(config, {
    //   node: {
    //     global: true,
    //     __dirname: true,
    //     __filename: true
    //   }
    // })
    config.externals = externals;
  },
};
