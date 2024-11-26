import { isWindows } from "../platform";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { electronRendererUrl, isDevelopment } from "../platform";
import {
  app,
  ipcMain,
  BrowserWindow,
  screen,
  Notification as ElectronNotification,
} from "electron";
import { TypedEventEmitter } from "@tiny-libs/typed-event-emitter";

const NOTIFICATION_OFFSET = 6
const NOTIFICATION_DURATION = 6000
const NOTIFICATION_WIDTH = 300
const NOTIFICATION_HEIGHT = 64

class Notification extends TypedEventEmitter {
  title;
  icon;
  offset = NOTIFICATION_OFFSET;
  duration = NOTIFICATION_DURATION;
  width = NOTIFICATION_WIDTH;
  height = NOTIFICATION_HEIGHT;
  debug = false;
  window;

  constructor() {
    super();
    this.title = app.name;
    this.icon = fileURLToPath(new URL("icon.svg", import.meta.url));
  }

  createWindow(info) {
    const { x, y, width, height } = screen.getPrimaryDisplay().workArea;

    const win = new BrowserWindow({
      title: "Notifications",
      width: this.width,
      height: this.height,
      x: x + width - this.width - this.offset,
      y: y + height - this.height - this.offset,
      show: false,
      frame: false,
      transparent: true, // 窗口透明
      titleBarStyle: "hidden",
      fullscreenable: false,
      minimizable: false,
      maximizable: false,
      movable: false,
      resizable: false,
      alwaysOnTop: true, // 窗口是否永远在别的窗口的上面
      skipTaskbar: true, // 是否在任务栏中显示窗口
      webPreferences: {
        preload: join(__dirname, "../preload/notif.mjs"),
        sandbox: false,
        backgroundThrottling: false,
        enableWebSQL: false,
        spellcheck: false,
        devTools: this.debug,
      },
    });

    win.setAlwaysOnTop(true, "screen-saver");

    win.on("ready-to-show", () => {
      setTimeout(() => {
        win.webContents.send('uikit:notification:show', info);
      }, 100);
      win.showInactive();
      if (this.debug) win.webContents.openDevTools();
    });

    const onClick = (event, extraData) => {
      this.emit("handleNotifClick", extraData);
      const win = BrowserWindow.fromWebContents(event.sender);
      if (win && !win.isDestroyed()) {
        win.close();
      }
    };

    const onClose = (event, immediately) => {
      const win = BrowserWindow.fromWebContents(event.sender);
      if (win) {
        if (!immediately && this.isMouseOver(win)) {
          event.reply('uikit:notification:show');
        } else {
          win.close();
        }
      }
    };

    win.on("closed", () => {
      ipcMain.removeListener("uikit:notification:on-click", onClick);
      ipcMain.removeListener("uikit:notification:close", onClose);

      this.window = undefined;
    });

    ipcMain.on('uikit:notification:on-click', onClick);
    ipcMain.on("uikit:notification:close", onClose);

    const winURL = isDevelopment ? electronRendererUrl : join(__dirname, "../renderer/index.html");
    win.loadURL(winURL + `#${"desktop"}`);
    this.window = win;
  }

  isMouseOver(window) {
    const screenCoord = screen.getCursorScreenPoint();
    const winBounds = window.getBounds();
    return (
      screenCoord.x >= winBounds.x &&
      screenCoord.x <= winBounds.x + winBounds.width &&
      screenCoord.y >= winBounds.y &&
      screenCoord.y <= winBounds.y + winBounds.height
    );
  }

  // 配置通知默认值或自定义通知窗口
  config(options) {
    const {
      title = app.name,
      icon,
      offset = NOTIFICATION_OFFSET,
      duration = NOTIFICATION_DURATION,
      width = NOTIFICATION_WIDTH,
      height = NOTIFICATION_HEIGHT,
      debug = false,
    } = options;

    this.title = title;
    this.icon = icon ? (typeof icon === "object" ? icon.toDataURL() : icon) : this.icon;
    this.offset = offset;
    this.duration = Math.max(duration, 3000);

      this.width = width;
      this.height = height;
      this.debug = debug;
  }

  destroy() {
    if (this.window) {
      this.window.close();
    }
  }

  show(info) {
    const { title, body, icon, extraData } = info;

    const _info = {
      title: title || this.title,
      body,
      icon: icon ? (typeof icon === "object" ? icon.toDataURL() : icon) : this.icon,
      extraData,
      duration: this.duration,
    };

    if (isWindows) {
      if (this.window && !this.window.isDestroyed()) {
        this.window.webContents.send('uikit:notification:show', _info);

        if (!this.window.isVisible()) {
          this.window.showInactive();
        }
      } else {
        this.createWindow(_info);
      }
    } else {
      // 当前系统是否支持桌面通知
      if (!ElectronNotification.isSupported()) {
        return;
      }

      const { title = this.title, body, icon, extraData } = info;
      console.log("info", info);
      // https://electron.nodejs.cn/docs/latest/api/notification/#new-notificationoptions
      const notifier = new ElectronNotification({
        title: "PureChat",
        body: body.payload.text,
        icon,
      });
      notifier.on("click", () => {
        this.emit("handleNotifClick", extraData);
      });
      notifier.show();
    }
  }
}

export const notification = new Notification();

/**
 * 注册通知 IPC 监听器，以供渲染进程使用。
 */
export function registerNotificationListener() {
  // 检查是否已经注册了通知通道
  if (ipcMain.eventNames().includes("uikit:notification")) {
    return;
  }

  // 注册通知通道的监听器
  ipcMain.on("uikit:notification", (_, info) => {
    if (info) {
      notification.show(info);
    } else {
      notification.destroy();
    }
  });
}
