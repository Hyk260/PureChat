import { ipcMain, BrowserWindow } from 'electron'
import {
  TITLE_BAR_CHANNEL,
  TITLE_BAR_MAXIMIZE_REPLY_CHANNEL,
  TITLE_BAR_FULLSCREEN_REPLY_CHANNEL
} from './constants'

const isMacintosh = process.platform === 'darwin'

export function registerTitleBarListener() {
  if (isMacintosh) {
    return
  }

  if (ipcMain.eventNames().some((ename) => ename === TITLE_BAR_CHANNEL)) {
    return
  }

  ipcMain.on(
    TITLE_BAR_CHANNEL,
    (
      e,
      action,
      // | 'show'
      // | 'showInactive'
      // | 'minimize'
      // | 'maximizeOrUnmaximize'
      // | 'close'
    ) => {
      const win = BrowserWindow.fromWebContents(e.sender)

      if (win) {
        if (action === 'show') {
          win.show()
        } else if (action === 'showInactive') {
          win.showInactive()
        } else if (action === 'minimize') {
          win.minimize()
        } else if (action === 'maximizeOrUnmaximize') {
          const isMaximized = win.isMaximized()
          if (isMaximized) {
            win.unmaximize()
          } else {
            win.maximize()
          }
        } else if (action === 'close') {
          // win.close()
          win.hide()
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
      win.webContents.send(TITLE_BAR_FULLSCREEN_REPLY_CHANNEL, 1)
    })

    win.on('leave-full-screen', () => {
      win.webContents.send(TITLE_BAR_FULLSCREEN_REPLY_CHANNEL, 0)
    })
  }

  if (isMacintosh) {
    return
  }

  win.on('maximize', () => {
    win.webContents.send(TITLE_BAR_MAXIMIZE_REPLY_CHANNEL, 1)
  })

  win.on('unmaximize', () => {
    win.webContents.send(TITLE_BAR_MAXIMIZE_REPLY_CHANNEL, 0)
  })
}
