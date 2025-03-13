import "./config";
import { app, BrowserWindow, protocol } from 'electron'
import { electronApp, optimizer } from "./toolkit/utils";
import { setNotification } from "./notification/index";
import { isMac } from "./platform";
import { logger } from './logger/index';
import { TrayService } from "./tray/index";
import { createWindow, winSingle, registerIpc, setDefaultProtocol } from "./utils/index";

class WindowService {
  static instance = null;
  static mainWindow = null;

  constructor() {
    logger.info('Initializing WindowService');
    this.setupSingletonUtilities();
    this.registerAppEvents();
  }
  static getInstance() {
    if (!WindowService.instance) {
      WindowService.instance = new WindowService();
    }
    return WindowService.instance;
  }
  // 初始化单例工具
  setupSingletonUtilities() {
    winSingle();
  }

  createMainWindow(_options) {
    if (this.mainWindow && !this.mainWindow.isDestroyed()) {
      return this.mainWindow
    }

    this.mainWindow = createWindow();

    return this.mainWindow;
  }

  registerAppEvents() {
    this.registerProtocol();
    this.registerAppLifeCycleEvents();
    this.registerAppReadinessEvents();
  }

  handleMacSpecificBehaviors() {
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) this.createMainWindow();
    });

    app.on('open-url', (event, url) => {
      event.preventDefault();
      const win = this.mainWindow;
      if (win) {
        win.webContents.send('awaken', url);
      } else {
        logger.warn('Main window is not available to receive URL');
      }
    });
  }

  registerProtocol() {
    //  注册协议
    protocol.registerSchemesAsPrivileged([
      { scheme: 'app', privileges: { secure: true, standard: true } },
    ]);
  }

  registerAppLifeCycleEvents() {
    // 关闭所有窗口后退出
    app.on('window-all-closed', () => {
      if (!isMac) {
        app.quit();
      }
    });
  }

  registerAppReadinessEvents() {
    app.whenReady().then(() => {
      this.handleAppReadinessCallbacks();
    });
  }

  handleAppReadinessCallbacks() {
    logger.info('App ready');
    // Set app user model id for windows
    electronApp.setAppUserModelId('com.purechat.app');
    const mainWindow = this.createMainWindow();
    setNotification();
    setDefaultProtocol();
    registerIpc(mainWindow);
    new TrayService();
    this.setupOptimizerUtilities();
  }

  setupOptimizerUtilities() {
    optimizer.registerFramelessWindowIpc();
    app.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window, { escToCloseWindow: true });
    });
  }
  showMainWindow() {
    if (this.mainWindow && !this.mainWindow.isDestroyed()) {
      if (this.mainWindow.isMinimized()) {
        this.mainWindow.restore()
      }
      this.mainWindow.show()
      this.mainWindow.focus()
    } else {
      this.mainWindow = this.createMainWindow()
      this.mainWindow.focus()
    }
  }
}

// 使用单例模式
export const windowService = WindowService.getInstance();