import { isWindows, isMac, isProduction } from "../platform";
import { app, clipboard, shell } from "electron";
import { execFile, exec } from "child_process";
import path from "node:path";
import { fnFilePath } from './folder';
import log from '../logger/index';

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/* 置顶主窗口 */
export const mainTop = () => {
  const win = global.mainWin;
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
export const handleScreenshot = () => {
  const mainWin = global.mainWin;
  if (isWindows) {
    let filePath = ''
    if (app.isPackaged) {
      filePath = path.join(process.cwd(), '/resources/app.asar.unpacked/resources/ScreenCapture.exe')
    } else {
      filePath = path.join(__dirname, "../../resources/ScreenCapture.exe");
    }
    console.log(`windows:filePath:${filePath}`)
    log.info(`windows:filePath:${filePath}`)
    const screenWindow = execFile(filePath);
    screenWindow.on("exit", (code, stdout, stderr) => {
      log.info(`退出码 code:${code}, 输出流 stdout:${stdout},错误流 stderr:${stderr}`)
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
  const filePath = fnFilePath(fileName)
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
    const agreement = "pure"; // 自定义协议名
    let isSet = false; // 是否注册成功
    app.removeAsDefaultProtocolClient(agreement); // 每次运行都删除自定义协议 然后再重新注册
    isSet = app.setAsDefaultProtocolClient(agreement);
    console.log("注册协议", isSet ? "成功" : "失败");
  }
};

