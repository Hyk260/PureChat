import { isMac, isLinux } from "../platform";
import {
  app,
  Menu,
  Tray,
  nativeImage, 
  // nativeTheme,
  // ipcMain
} from 'electron'

import icon from '../../../build/image/tray_icon.png?asset'
import iconMac from "../../../build/image/mac/icon-32x32.png?asset";

export class TrayService {
  static instance = null;
  tray = null;

  constructor() {
    if (!TrayService.instance) {
      this.updateTray();
      this.watchTrayChanges();
      TrayService.instance = this;
    }
    return TrayService.instance;
  }

  static getInstance() {
    return new TrayService();
  }

  createTray() {
    this.destroyTray();

    const iconPath = isMac ? iconMac : icon;
    
    this.tray = new Tray(iconPath);

    if (["win32", "darwin", "linux"].includes(process.platform)) {
      const image = nativeImage.createFromPath(iconPath);
      const resizedImage = image.resize({ width: 16, height: 16 });
      // isMac && resizedImage.setTemplateImage(true);
      this.tray.setImage(resizedImage);
    }

    const template = [
      {
        label: "显示窗口",
        click: () => global.mainWin.show()
      },
      { type: 'separator' },
      {
        label: "退出",
        click: () => this.quit()
      }
    ]

    const contextMenu = Menu.buildFromTemplate(template);

    if (isLinux) {
      // this.tray.setContextMenu(contextMenu);
    }

    this.tray.setToolTip('PureChat');

    this.tray.on('right-click', () => {
      this.tray.popUpContextMenu(contextMenu);
    });

    this.tray.on('click', () => {
      global.mainWin.show();
    });

    // ipcMain.on("handleShowNumber", (e, data) => {
    //   if (isMac) {
    //     let showNumber = 0;
    //     if (data > 99) {
    //       showNumber = "99+";
    //     } else if (data >= 1) {
    //       showNumber = data + "";
    //     } else {
    //       showNumber = "";
    //     }
    //     // 托盘设置数字
    //     this.tray.setTitle(showNumber);
    //     // 塞入消息的红点 mac
    //     app.dock.setBadge(showNumber);
    //   }
    // });
  }

  updateTray() {
    this.createTray();
  }

  restartTray() {

  }

  destroyTray() {
    if (this.tray) {
      this.tray.destroy();
      this.tray = null;
    }
  }

  watchTrayChanges() {

  }

  quit() {
    app.quit();
  }
}
