import { ipcMain, session, shell } from "electron";
import { handleScreenshot } from "./util";
import { TrayService } from '../tray/index';
import FileStorage from "./fileStorage";

const fileManager = new FileStorage()

/**
 * 为主窗口和应用程序注册 IPC 事件。
 *
 * @param {BrowserWindow} mainWindow - Electron 应用程序的主窗口。
 * @param {Electron.App} app - Electron 应用程序实例。
 */
export const registerIpc = (mainWindow, app) => {

  ipcMain.handle('open:website', (_, url) => shell.openExternal(url))

  // open path
  ipcMain.handle('open:path', async (_, path) => {
    await shell.openPath(path)
  })

  ipcMain.handle('app:proxy', async (_, proxy) => {
    const sessions = [session.defaultSession, session.fromPartition('persist:webview')]
    const proxyConfig = proxy === 'system' ? { mode: 'system' } : proxy ? { proxyRules: proxy } : {}
    await Promise.all(sessions.map((session) => session.setProxy(proxyConfig)))
  })

  // tray
  ipcMain.handle('app:set-tray', (_, isActive) => {
    configManager.setTray(isActive)
  })

  ipcMain.handle('app:restart-tray', () => TrayService.getInstance().restartTray())

  // check for update
  ipcMain.handle('app:check-for-update', async () => {
    // const update = await appUpdater.autoUpdater.checkForUpdates()
    // return {
    //   currentVersion: appUpdater.autoUpdater.currentVersion,
    //   updateInfo: update?.updateInfo
    // }
  })

  ipcMain.handle('config:set', (_, key, value) => {
    // configManager.set(key, value)
  })

  ipcMain.handle('config:get', (_, key) => {
    // return configManager.get(key)
  })

  //截图
  ipcMain.handle("handleScreenshot", (_, data) => {
    handleScreenshot(mainWindow);
  });

  // 托盘闪烁
  ipcMain.handle("trayFlashIng", (_, data) => {
    global.mainWin.flashFrame(true);
  });

  // file
  ipcMain.handle('file:open', fileManager.open)

  ipcMain.handle('file:checkExist', (_, fileName) => {
    return fileManager.checkFileExists(fileName)
  })

  // 打开文件 & 文件夹
  ipcMain.handle("file:openFolder", (_, data) => {
    fileManager.openFolder(data)
  });

  // 下载文件
  ipcMain.handle('file:download', (_, data) => {
    fileManager.download(data)
  })
};
