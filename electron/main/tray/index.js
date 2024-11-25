import { Tray, Menu, app, ipcMain } from "electron";
import { isMac } from "../platform";
import { getIconPath } from "../utils/util";

let tray = null;
let icon = null;
const toolTip = import.meta.env.VITE_APP_NAME || "PureChat";

if (isMac) {
  icon = getIconPath("icon-32x32@2x.png");
} else {
  icon = getIconPath("icon.png");
}

export function setTray() {
  if (tray) return;
  // 设置托盘图标
  tray = new Tray(icon);

  tray.setToolTip(toolTip); // 鼠标指针在托盘图标上悬停时显示的文本
  // 设置右键菜单列表
  const trayContextMenu = Menu.buildFromTemplate([
    {
      label: "退出",
      role: "quit",
    },
    // {
    //   label: "菜单",
    //   click: () => {
    //     console.log('菜单')
    //   }
    // },
  ]);
  // 监听鼠标左键信息
  tray.on("click", () => {
    global.mainWin.show();
  });

  // 监听鼠标右键信息
  tray.on("right-click", () => {
    tray.popUpContextMenu(trayContextMenu);
  });

  ipcMain.on("handleShowNumber", (e, data) => {
    console.log("handleShowNumber", data);
    if (isMac) {
      let showNumber = 0;
      if (data > 99) {
        showNumber = "99+";
      } else if (data >= 1) {
        showNumber = data + "";
      } else {
        showNumber = "";
      }
      // 托盘设置数字
      tray.setTitle(showNumber);
      // 塞入消息的红点 mac
      app.dock.setBadge(showNumber);
    }
  });

  global.tray = tray;
}
