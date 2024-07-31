import { ipcMain } from "electron";

import {
  mainTop,
  handleOpenFolder,
  handleScreenshot,
} from "../utils/util";

import { checkFileExist, createFolderChild, downloadFolder } from './folder';

export const ipcEvent = () => {
  // 置顶主窗口
  ipcMain.on("mainTop", (event) => {
    mainTop();
  });
  //截图
  ipcMain.on("screenshot", (e, data) => {
    handleScreenshot();
  });
  // 打开文件 & 文件夹
  ipcMain.on("openFolder", (e, data) => {
    handleOpenFolder(data)
  });
  // 托盘闪烁
  ipcMain.on("trayFlashIng", (e, option) => {
    global.mainWin.flashFrame(true);
  });

  ipcMain.handle('checkFileExist', async (e, fileName) => {
    return checkFileExist(fileName)
  })

  ipcMain.handle('createFolderChild', async (e) => {
    return createFolderChild()
  })

  ipcMain.on('downloadFolder', (e, data) => {
    downloadFolder(data)
  })
};
