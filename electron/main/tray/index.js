import { Tray, Menu } from 'electron'
import { isMac } from '../platform';
import { getIconPath } from '../utils/util';

let tray = null
let icon = null
const toolTip = import.meta.env.VITE_APP_NAME || "PureChat"

if (isMac) {
  icon = getIconPath('icon-32x32@2x.png')
} else {
  icon = getIconPath('icon.png')
}

export function trayFn() {
  // 设置托盘图标
  tray = new Tray(icon)

  tray.setToolTip(toolTip)
  // 设置右键菜单列表
  const trayContextMenu = Menu.buildFromTemplate([
    {
      label: '退出',
      role: 'quit'
    }
  ])
  // 监听鼠标左键信息
  tray.on('click', () => {
    global.mainWin.show()
  })
  // 监听鼠标右键信息
  tray.on('right-click', () => {
    tray.popUpContextMenu(trayContextMenu)
  })
}