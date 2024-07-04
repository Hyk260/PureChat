import { app, session, ipcMain, BrowserWindow, shell, protocol } from "electron";
import { join } from "path";
import __cjs_mod__ from "node:module";
const __filename = import.meta.filename;
const __dirname = import.meta.dirname;
const require2 = __cjs_mod__.createRequire(import.meta.url);
global.mainWinOptions = {
  width: 1038,
  height: 706,
  minWidth: 1038,
  minHeight: 706
};
global.loginWinOptions = {
  width: 380,
  height: 550,
  maxWidth: 380,
  maxHeight: 550,
  minWidth: 380,
  minHeight: 550,
  frame: false,
  // 创建无边框窗口
  resizable: false
  //禁止改变窗口尺寸
};
const is = {
  dev: !app.isPackaged
};
const platform = {
  isWindows: process.platform === "win32",
  isMacOS: process.platform === "darwin",
  isLinux: process.platform === "linux"
};
const electronApp = {
  setAppUserModelId(id) {
    if (platform.isWindows)
      app.setAppUserModelId(is.dev ? process.execPath : id);
  },
  setAutoLaunch(auto) {
    if (platform.isLinux)
      return false;
    const isOpenAtLogin = () => {
      return app.getLoginItemSettings().openAtLogin;
    };
    if (isOpenAtLogin() !== auto) {
      app.setLoginItemSettings({
        openAtLogin: auto,
        path: process.execPath
      });
      return isOpenAtLogin() === auto;
    } else {
      return true;
    }
  },
  skipProxy() {
    return session.defaultSession.setProxy({ mode: "direct" });
  }
};
const optimizer = {
  watchWindowShortcuts(window, shortcutOptions) {
    if (!window)
      return;
    const { webContents } = window;
    const { escToCloseWindow = false, zoom = false } = shortcutOptions || {};
    webContents.on("before-input-event", (event, input) => {
      if (input.type === "keyDown") {
        if (!is.dev) {
          if (input.code === "KeyR" && (input.control || input.meta))
            event.preventDefault();
        } else {
          if (input.code === "F12") {
            if (webContents.isDevToolsOpened()) {
              webContents.closeDevTools();
            } else {
              webContents.openDevTools({ mode: "undocked" });
              console.log("Open dev tool...");
            }
          }
        }
        if (escToCloseWindow) {
          if (input.code === "Escape" && input.key !== "Process") {
            window.close();
            event.preventDefault();
          }
        }
        if (!zoom) {
          if (input.code === "Minus" && (input.control || input.meta))
            event.preventDefault();
          if (input.code === "Equal" && input.shift && (input.control || input.meta))
            event.preventDefault();
        }
      }
    });
  },
  registerFramelessWindowIpc() {
    ipcMain.on("win:invoke", (event, action) => {
      const win = BrowserWindow.fromWebContents(event.sender);
      if (win) {
        if (action === "show") {
          win.show();
        } else if (action === "showInactive") {
          win.showInactive();
        } else if (action === "min") {
          win.minimize();
        } else if (action === "max") {
          const isMaximized = win.isMaximized();
          if (isMaximized) {
            win.unmaximize();
          } else {
            win.maximize();
          }
        } else if (action === "close") {
          win.close();
        }
      }
    });
  }
};
const isWindows = process.platform === "win32";
const isMac = process.platform === "darwin";
process.env.NODE_ENV === "development";
process.env.NODE_ENV === "production";
const electronRendererUrl = process.env["ELECTRON_RENDERER_URL"];
const createWindow = (_options) => {
  const options = {
    ...global.mainWinOptions,
    // mainWinOptions loginWinOptions
    show: false,
    frame: isWindows ? false : true,
    autoHideMenuBar: true,
    titleBarStyle: isWindows ? "hiddenInset" : "default",
    // 在上阅读更多信息https://www.electronjs.org/docs/latest/tutorial/context-isolation
    webPreferences: {
      // 在外部浏览器中打开链接
      // nativeWindowOpen: true,
      // // 否启用 Node.js 的集成
      // nodeIntegration: true,
      // // 是否启用渲染进程的上下文隔离
      // contextIsolation: false,
      // // 是否启用渲染进程访问 Electron 的 remote 模块
      // enableRemoteModule: true,
      // 预加载文件preload
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false
    }
  };
  const win = new BrowserWindow(options);
  if (is.dev && electronRendererUrl) {
    win.loadURL(electronRendererUrl);
  } else {
    win.loadURL("app://./index.html");
  }
  win.webContents.on("did-finish-load", () => {
    let argv = process.argv;
    if (argv.length > (app.isPackaged ? 1 : 2)) {
      app.emit("second-instance", null, argv);
    }
  });
  win.on("ready-to-show", () => {
    win.show();
  });
  win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });
  win.on("maximize", () => {
    win.webContents.send("toggleSize", { type: "maximize", win: "mainWin" });
  });
  win.on("unmaximize", () => {
    win.webContents.send("toggleSize", { type: "unmaximize", win: "mainWin" });
  });
  global.mainWin = win;
};
class Background {
  constructor() {
    this.init();
  }
  init() {
    this.handleAppEvents();
  }
  createWindow(_options) {
    createWindow();
  }
  handleAppEvents() {
    protocol.registerSchemesAsPrivileged([
      { scheme: "app", privileges: { secure: true, standard: true } }
    ]);
    app.on("window-all-closed", () => {
      if (!isMac) {
        app.quit();
      }
    });
    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) this.createWindow();
    });
    app.whenReady().then(() => {
      this.createWindow();
      electronApp.setAppUserModelId("com.electron");
      app.on("browser-window-created", (_, window) => {
        optimizer.watchWindowShortcuts(window);
      });
    });
    app.on("open-url", (event, url) => {
      const win = global.mainWin;
      win.webContents.send("awaken", url);
    });
  }
}
new Background();
