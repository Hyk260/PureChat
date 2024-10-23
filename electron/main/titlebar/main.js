import { ipcMain, BrowserWindow } from 'electron'

const isMac = process.platform === 'darwin'

export function registerTitleBarListener() {
  if (isMac) {
    return
  }

  if (ipcMain.eventNames().some((ename) => ename === 'uikit:titlebar')) {
    return
  }

  ipcMain.on(
    'uikit:titlebar',
    (
      e,
      action,
      // 'show'
      // 'showInactive'
      // 'minimize'
      // 'maximizeOrUnmaximize'
      // 'close'
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
          win.close()
          // win.hide()
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
