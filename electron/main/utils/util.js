
import { app, clipboard } from "electron";
import { execFile, exec } from "node:child_process";
import { isWindows, isMac, isProduction } from "../platform";
import { logger } from '../logger/index';
import { getIconPath } from './file';

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 置顶主窗口 
export const showMainWindow = (win = global.mainWin) => {
  win.show();
  win.focus();
  win.moveTop();
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

// 截屏 
export const handleScreenshot = (mainWin = global.mainWin) => {
  if (isWindows) {
    let filePath = getIconPath('ScreenCapture.exe')
    logger.info(`windows:filePath:${filePath}`)
    const screenWindow = execFile(filePath);
    screenWindow.on("exit", (code, stdout, stderr) => {
      logger.info(`退出码 code:${code}, 输出流 stdout:${stdout},错误流 stderr:${stderr}`)
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

export function getInstanceName(baseURL) {
  try {
    return new URL(baseURL).host.split('.')[0]
  } catch (error) {
    return ''
  }
}