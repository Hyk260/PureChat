const path = require('path');
const resolve = (dir) => {
  return path.join(__dirname, dir);
}
const environment = process.env.NODE_ENV === 'production'

module.exports = {
  lintOnSave: false,// 是否在保存的时候检查
  // 开发以及生产环境的路径配置
  publicPath: environment ? './' : '/',
  
  chainWebpack(config) {
    // svg-sprite-loader 配置
    // config.module
    //   .rule('svg')
    //   .exclude.add(resolve('src/assets/icons'))
    //   .end();
    // config.module
    //   .rule('icons')
    //   .test(/\.svg$/)
    //   .include.add(resolve('src/assets/icons'))
    //   .end()
    //   .use('svg-sprite-loader')
    //   .loader('svg-sprite-loader')
    //   .options({ symbolId: 'icon-[name]' })
    //   .end()

    const svgRule = config.module.rule('svg') // 找到svg-loader
    svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
    svgRule
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' })


    // 为生产环境修改配置...
    if (environment) {
      // 清除css,js版本号
      config.output.filename('static/js/[name].js').end();
      config.output.chunkFilename('static/js/[name].js').end();
      config.plugin('extract-css').tap(args => [{
        filename: `static/css/[name].css`,
        chunkFilename: `static/css/[name].css`
      }])
    }

    // 根路径
    config.resolve.alias.set("@", resolve("src"))
    // 修改标题
    config.plugin('html').tap((args) => {
      args[0].title = "后台管理";
      return args;
    })
  },

}
