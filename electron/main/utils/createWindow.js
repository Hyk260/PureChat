import { join } from 'node:path'
import { app, shell, BrowserWindow } from "electron";
import { electronRendererUrl } from "../platform";
import { is } from '../toolkit/utils'
import {
  registerTitleBarListener,
  attachTitleBarToWindow
} from '../titlebar/main'

export const createWindow = (_options) => {
  const options = {
    ...global.mainWinOptions, // mainWinOptions loginWinOptions
    show: false,
    frame: false,
    autoHideMenuBar: true,
    trafficLightPosition: { x: 7, y: 7 },
    titleBarStyle: 'hiddenInset', //? "hiddenInset" : "default",
    // 在上阅读更多信息https://www.electronjs.org/docs/latest/tutorial/context-isolation
    webPreferences: {
      // 在外部浏览器中打开链接
      // nativeWindowOpen: true,
      // 否启用 Node.js 的集成
      // nodeIntegration: true,
      // 是否启用渲染进程的上下文隔离
      // contextIsolation: false,
      // 是否启用渲染进程访问 Electron 的 remote 模块
      // enableRemoteModule: true,
      // 预加载文件preload
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false
    },
  };
  // 注册自定义标题组件 IPC 侦听器
  registerTitleBarListener()
  // 创建浏览器窗口
  const win = new BrowserWindow(options);

  //  Attach a title bar to the window
  attachTitleBarToWindow(win)
  
  if (is.dev && electronRendererUrl) {
    win.webContents.openDevTools()
    // 如果处于开发模式，则加载开发服务器的url
    win.loadURL(electronRendererUrl);
  } else {
    // 生产环境下加载打包后的文件
    win.loadFile(join(__dirname, '../renderer/index.html'))
  }
  // 在窗口加载完成后
  win.webContents.on("did-finish-load", () => {
    win.webContents.setZoomFactor(1);
    let argv = process.argv;
    // 直接打开软件的话开发环境的启动参数为2，安装包为1，大于这个数的话说明是通过伪协议拉起软件的
    if (argv.length > (app.isPackaged ? 1 : 2)) {
      app.emit("second-instance", null, argv);
    }
  });

  win.on("ready-to-show", () => {
    win.show();
  });

  win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  global.mainWin = win;
};
