
import fs from "node:fs";
import path from "node:path";
import { app, clipboard, shell } from "electron";
import { execFile, exec } from "node:child_process";
import { isWindows, isMac, isProduction } from "../platform";
import { getFilePath } from './folder';
import { logger } from '../logger/index';

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 获取图标文件的完整路径
 * @param {string} iconName - 图标文件的名称，例如 'icon.png'
 * @returns {string} - 图标文件的完整路径
 */
export function getIconPath(iconName) {
  let iconPath;

  if (app.isPackaged) {
    // 打包后的路径
    iconPath = path.join(process.cwd(), 'resources/app.asar.unpacked/resources', iconName);
  } else {
    // 开发模式下的路径
    iconPath = path.join(__dirname, '../../resources', iconName);
  }

  // 检查图标路径是否存在
  if (!fs.existsSync(iconPath)) {
    console.error(`Icon file does not exist: ${iconPath}`);
  }

  return iconPath;
}

/* 置顶主窗口 */
export const showMainWindow = (win = global.mainWin) => {
  win.show();
  win.focus();
  win.moveTop();
  // win.center();
};

/**
 * 发送截图数据到主窗口
 * @param {BrowserWindow} win - 主窗口对象
 */
const sendCapturedImageData = (win) => {
  const pngData = clipboard.readImage().toPNG();
  const imageData = "data:image/png;base64," + pngData.toString("base64");
  win.webContents.send("captureScreenBack", imageData);
};
/* 截屏 */
export const handleScreenshot = (mainWin = global.mainWin) => {
  if (isWindows) {
    let filePath = getIconPath('ScreenCapture.exe')
    console.log(`windows:filePath:${filePath}`)
    logger.info(`windows:filePath:${filePath}`)
    const screenWindow = execFile(filePath);
    screenWindow.on("exit", (code, stdout, stderr) => {
      logger.info(`退出码 code:${code}, 输出流 stdout:${stdout},错误流 stderr:${stderr}`)
      console.log("退出码 code:", code, "输出流 stdout:", stdout, "错误流 stderr:", stderr);
      // 粘贴
      if (code == 7) {
        sendCapturedImageData(mainWin);
      }
    });
  } else if (isMac) {
    exec(`screencapture -w  -c`, (error, stdout, stderr) => {
      if (!error) {
        //截图完成，在粘贴板中
        sendCapturedImageData(mainWin);
      }
    });
  }
};

export const handleOpenFolder = ({ type, fileName }) => {
  console.log('handleOpenFolder:', { type, fileName })
  const filePath = getFilePath(fileName)
  console.log('filePath:', filePath)
  // showItemInFolder openPath
  shell[type](filePath);
}

/**
 * 注册协议
 * 并通过浏览器打开 PureApp 程序 pure://
 * pure://groupShare?groupID=@TGS#2P5E55UNV
 * pure://authorized?code=5ef9ae63fa285965025f
 */
export const setDefaultProtocol = () => {
  if (isProduction) {
    const agreement = "pure";
    let isSet = false;
    // 每次运行都删除自定义协议 然后再重新注册
    app.removeAsDefaultProtocolClient(agreement);
    isSet = app.setAsDefaultProtocolClient(agreement);
    logger.info(`注册协议`, isSet ? "成功" : "失败");
    console.log("注册协议", isSet ? "成功" : "失败");
  }
};
