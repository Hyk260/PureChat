import "./config";
import { app, BrowserWindow, protocol } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { notify } from './notification/index';
import { isMac } from "./platform";
import { logger } from './logger/index';
// import { trayFn } from './tray/index';
import { createWindow, winSingle, ipcEvent, setDefaultProtocol, initFolder } from "./utils/index";

class Background {
  constructor() {
    logger.info('init')
    winSingle();
    initFolder();
    this.init();
  }
  init() {
    this.handleAppEvents();
  }
  createWindow(_options) {
    createWindow()
  }
  handleAppEvents() {
    // 注册协议
    protocol.registerSchemesAsPrivileged([
      { scheme: "app", privileges: { secure: true, standard: true } },
    ]);
    // 关闭所有窗口后退出
    app.on("window-all-closed", () => {
      // 在macOS上，应用程序及其菜单栏通常保持活动状态，直到用户使用Cmd+Q明确退出
      if (!isMac) {
        app.quit();
      }
    });

    app.on("activate", () => {
      // 在macOS上，当 dock图标被单击，并且没有其他窗口打开。
      if (BrowserWindow.getAllWindows().length === 0) this.createWindow();
    });
    // 此方法将在Electron完成后调用 初始化，并准备创建浏览器窗口。 某些API只能在此事件发生后使用。
    app.whenReady().then(() => {
      logger.info('app whenReady')
      notify()
      setDefaultProtocol()
      ipcEvent();
      this.createWindow();
      // trayFn()
      electronApp.setAppUserModelId('com.electron')
      optimizer.registerFramelessWindowIpc()
      app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
      })
    })

    // macOS 下通过协议URL启动
    app.on("open-url", (event, url) => {
      const win = global.mainWin;
      win.webContents.send("awaken", url);
    });
  }
}

new Background();