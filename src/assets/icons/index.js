import SvgIcon from '@/components/SvgIcon' // svg component

/**
 * 一次性的引入某个文件夹下的所有文件
* require.context(directory, useSubdirectories,regExp)
* 形参: 
* directory：需要引入文件的目录
* useSubdirectories：是否查找该目录下的子级目录
* regExp：匹配引入文件的正则表达式
*/

const registerSvgIcon = (app) => {
  app.component('svg-icon', SvgIcon) // 注册全局组件
  
  const req = require.context('./svg', false, /\.svg$/);  
  const requireAll = requireContext => requireContext.keys().map(requireContext);
  requireAll(req);
}

export default registerSvgIcon;