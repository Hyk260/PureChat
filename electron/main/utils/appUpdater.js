import { app, dialog } from 'electron'
import { autoUpdater } from 'electron-updater'
import logger from 'electron-log'

import icon from '../../../resources/icon.png?asset';

export default class AppUpdater {
  constructor(mainWindow) {
    this.mainWindow = mainWindow;
    this.releaseInfo = null;

    logger.transports.file.level = 'info';
    autoUpdater.logger = logger;
    autoUpdater.forceDevUpdateConfig = !app.isPackaged;
    autoUpdater.autoDownload = true;

    this.registerEventHandlers();
  }

  registerEventHandlers() {
    autoUpdater.on('error', this.handleError.bind(this));
    autoUpdater.on('update-available', this.handleUpdateAvailable.bind(this));
    autoUpdater.on('update-not-available', this.handleUpdateNotAvailable.bind(this));
    autoUpdater.on('download-progress', this.handleDownloadProgress.bind(this));
    autoUpdater.on('update-downloaded', this.handleUpdateDownloaded.bind(this));
  }

  handleError(error) {
    logger.error('更新异常', {
      message: error.message,
      stack: error.stack,
      time: new Date().toISOString(),
    });
    this.mainWindow.webContents.send('update-error', error);
  }

  handleUpdateAvailable(info) {
    logger.info('检测到新版本', info);
    this.mainWindow.webContents.send('update-available', info);
  }

  handleUpdateNotAvailable() {
    this.mainWindow.webContents.send('update-not-available');
  }

  handleDownloadProgress(progress) {
    this.mainWindow.webContents.send('download-progress', progress);
  }

  handleUpdateDownloaded(info) {
    this.mainWindow.webContents.send('update-downloaded', info);
    this.releaseInfo = info;
    logger.info('下载完成', info);
  }

  async showUpdateDialog() {
    if (!this.releaseInfo) return;

    try {
      const { response } = await dialog.showMessageBox({
        type: 'info',
        title: '安装更新',
        icon,
        message: `新版本 ${this.releaseInfo.version} 已准备就绪`,
        detail: this.formatReleaseNotes(this.releaseInfo.releaseNotes),
        buttons: ['稍后安装', '立即安装'],
        defaultId: 1,
        cancelId: 0,
      });

      if (response === 1) {
        app.isQuitting = true;
        setImmediate(() => autoUpdater.quitAndInstall());
      } else {
        this.mainWindow.webContents.send('update-downloaded-cancelled');
      }
    } catch (dialogError) {
      logger.error('对话框显示失败', dialogError);
    }
  }

  formatReleaseNotes(releaseNotes) {
    if (!releaseNotes) return '暂无更新说明';

    if (typeof releaseNotes === 'string') {
      return releaseNotes;
    }

    return releaseNotes.map(note => note.note).join('\n');
  }
}