const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: false,// 是否在保存的时候检查
  chainWebpack(config) {
    // svg-sprite-loader 配置
    config.module.rules.delete('svg');
    config.module.rule('svg').exclude.add(resolve('src/assets/icons')).end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();
    // 根路径
    config.resolve.alias.set("@", resolve("src"))
    // 修改标题
    config.plugin('html').tap((args) => {
      args[0].title = "后台管理";
      return args;
    })
  },

}
