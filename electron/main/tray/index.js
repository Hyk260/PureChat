import { Tray, app, Menu } from 'electron'
import path from "node:path";
import { isMac } from '../platform';

let tray = null
let icon = null
const toolTip = import.meta.env.VITE_APP_NAME || "PureChat"

if (app.isPackaged) {
  icon = path.join(process.cwd(), '/resources/app.asar.unpacked/resources/icon.png')
  if (isMac) {
    icon = path.join(process.cwd(), '/resources/app.asar.unpacked/resources/icon-32x32@2x.png')
  }
} else {
  icon = path.join(__dirname, "../../resources/icon.png");
  if (isMac) {
    icon = path.join(__dirname, "../../resources/icon-32x32@2x.png");
  }
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