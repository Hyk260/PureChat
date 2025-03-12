const fs = require('fs');
const path = require('path');

module.exports = async function (context) {
  const platform = context.packager.platform.name

  // 根据平台确定 locales 目录位置
  let resourceDirs = []
  if (platform === 'mac') {
    // macOS 的语言文件位置
    resourceDirs = [
      path.join(context.appOutDir, 'PureChat.app', 'Contents', 'Resources'),
      path.join(
        context.appOutDir,
        'PureChat.app',
        'Contents',
        'Frameworks',
        'Electron Framework.framework',
        'Resources'
      )
    ]
  } else {
    // Windows 和 Linux 的语言文件位置
    resourceDirs = [path.join(context.appOutDir, 'locales')]
  }

  // 处理每个资源目录
  for (const resourceDir of resourceDirs) {
    if (!fs.existsSync(resourceDir)) {
      console.log(`Resource directory not found: ${resourceDir}, skipping...`)
      continue
    }

    // 读取所有文件和目录
    const items = fs.readdirSync(resourceDir)

    // 遍历并删除不需要的语言文件
    for (const item of items) {
      if (platform === 'mac') {
        // 在 macOS 上检查 .lproj 目录
        if (item.endsWith('.lproj') && !item.match(/^(en|zh)/)) {
          const dirPath = path.join(resourceDir, item)
          fs.rmSync(dirPath, { recursive: true, force: true })
          console.log(`Removed locale directory: ${item} from ${resourceDir}`)
        }
      } else {
        // 其他平台处理 .pak 文件
        if (!item.match(/^(en|zh)/)) {
          const filePath = path.join(resourceDir, item)
          fs.unlinkSync(filePath)
          console.log(`Removed locale file: ${item} from ${resourceDir}`)
        }
      }
    }
  }

  console.log('Locale cleanup completed!')
}
