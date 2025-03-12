import { ipcMain, BrowserWindow } from 'electron'
import { TrayService } from '../tray/index';

const isMac = process.platform === 'darwin'

// 控制关闭按钮的行为，默认值为 false 表示最小化
let shouldCloseAppOnClose = false;

export function registerTitleBarListener() {
  if (isMac) {
    return
  }

  if (ipcMain.eventNames().some((ename) => ename === 'uikit:titlebar')) {
    return
  }

  ipcMain.on('uikit:titlebar', (e, action) => {
    const win = BrowserWindow.fromWebContents(e.sender)

    if (win) {
      if (action === 'show') {
        win.show()
      } else if (action === 'showInactive') {
        win.showInactive()
      } else if (action === 'minimize') {
        new TrayService()
        win.minimize()
      } else if (action === 'maximizeOrUnmaximize') {
        const isMaximized = win.isMaximized()
        if (isMaximized) {
          win.unmaximize()
        } else {
          win.maximize()
        }
      } else if (action === 'close') {
        if (shouldCloseAppOnClose) {
          win.close();
        } else {
          new TrayService()
          win.hide();
        }
      }
    }
  }
  )
}

/**
 * Attach a title bar to the window.
 * @param win BrowserWindow
 */
export function attachTitleBarToWindow(win) {
  if (win.fullScreenable) {
    win.on('enter-full-screen', () => {
      win.webContents.send('uikit:titlebar:fullscreen-reply', 1)
    })

    win.on('leave-full-screen', () => {
      win.webContents.send('uikit:titlebar:fullscreen-reply', 0)
    })
  }

  if (isMac) {
    return
  }

  win.on('maximize', () => {
    win.webContents.send('uikit:titlebar:maximize-reply', 1)
  })

  win.on('unmaximize', () => {
    win.webContents.send('uikit:titlebar:maximize-reply', 0)
  })
}
