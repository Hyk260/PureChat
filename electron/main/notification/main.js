import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { join } from 'node:path'
import {
  app,
  ipcMain,
  BrowserWindow,
  screen,
  Notification as ElectronNotification,
} from 'electron'

import { TypedEventEmitter } from '@tiny-libs/typed-event-emitter'

import {
  NOTIFICATION_WIDTH,
  NOTIFICATION_HEIGHT,
  NOTIFICATION_OFFSET,
  NOTIFICATION_DURATION,
  NOTIFICATION_CHANNEL,
  NOTIFICATION_SHOW_CHANNEL,
  NOTIFICATION_CLOSE_CHANNEL,
  NOTIFICATION_ON_CLICK_CHANNEL
} from './constants'

class Notification extends TypedEventEmitter {
  title
  icon
  offset = NOTIFICATION_OFFSET
  duration = NOTIFICATION_DURATION
  customPage
  width = NOTIFICATION_WIDTH
  height = NOTIFICATION_HEIGHT
  debug = false
  window

  constructor() {
    super()
    this.title = app.name
    this.icon = fileURLToPath(new URL('icon.svg', import.meta.url))
  }

  createWindow(info) {
    const { x, y, width, height } = screen.getPrimaryDisplay().workArea

    const win = new BrowserWindow({
      title: 'Notifications',
      width: this.width,
      height: this.height,
      x: x + width - this.width - this.offset,
      y: y + height - this.height - this.offset,
      show: false,
      frame: false,
      titleBarStyle: 'hidden',
      fullscreenable: false,
      minimizable: false,
      maximizable: false,
      movable: false,
      resizable: false,
      alwaysOnTop: true,
      skipTaskbar: true,
      webPreferences: {
        // preload: fileURLToPath(new URL('preload.js', import.meta.url)),
        preload: join(__dirname, "../preload/notif.mjs"),
        sandbox: false,
        backgroundThrottling: false,
        enableWebSQL: false,
        spellcheck: false,
        devTools: this.debug && !!this.customPage
      }
    })

    win.setAlwaysOnTop(true, 'screen-saver')

    win.on('ready-to-show', () => {
      win.webContents.send(NOTIFICATION_SHOW_CHANNEL, info)
      win.showInactive()
      if (this.debug && !!this.customPage) win.webContents.openDevTools()
    })

    const onClick = (event, extraData) => {
      this.emit('click', extraData)
      const win = BrowserWindow.fromWebContents(event.sender)
      if (win && !win.isDestroyed()) {
        win.close()
      }
    }

    const onClose = (event, immediately) => {
      const win = BrowserWindow.fromWebContents(event.sender)
      if (win) {
        if (!immediately && this.isMouseOver(win)) {
          event.reply(NOTIFICATION_SHOW_CHANNEL)
        } else {
          win.close()
        }
      }
    }

    win.on('closed', () => {
      ipcMain.removeListener(NOTIFICATION_ON_CLICK_CHANNEL, onClick)
      ipcMain.removeListener(NOTIFICATION_CLOSE_CHANNEL, onClose)

      this.window = undefined
    })

    ipcMain.on(NOTIFICATION_ON_CLICK_CHANNEL, onClick)
    ipcMain.on(NOTIFICATION_CLOSE_CHANNEL, onClose)

    win.loadFile(
      this.customPage || fileURLToPath(new URL('index.html', import.meta.url))
    )

    this.window = win
  }

  isMouseOver(window) {
    const screenCoord = screen.getCursorScreenPoint()
    const winBounds = window.getBounds()
    return (
      screenCoord.x >= winBounds.x &&
      screenCoord.x <= winBounds.x + winBounds.width &&
      screenCoord.y >= winBounds.y &&
      screenCoord.y <= winBounds.y + winBounds.height
    )
  }

  /**
   * Configure notification defaults or customize notification windows.
   * @param options NotificationOptions
   */
  config(options) {
    const {
      title = app.name,
      icon,
      offset = NOTIFICATION_OFFSET,
      duration = NOTIFICATION_DURATION,
      customPage,
      width = NOTIFICATION_WIDTH,
      height = NOTIFICATION_HEIGHT,
      debug = false
    } = options

    this.title = title
    this.icon = icon
      ? typeof icon === 'object'
        ? icon.toDataURL()
        : icon
      : this.icon

    this.offset = offset
    this.duration = Math.max(duration, 2000)

    if (customPage) {
      this.customPage = customPage
      this.width = width
      this.height = height
      this.debug = debug
    }
  }

  /**
   * Dismiss the notification windows.
   *
   * @platform win32
   */
  destroy() {
    if (this.window) {
      this.window.close()
    }
  }

  /**
   * Immediately shows the notification to the user. On Windows, if the notification
   * has been shown before, this method will re-render the notification window and
   * continue to display it. For other platforms,
   * see [Electron's Notification Guide](https://www.electronjs.org/docs/latest/api/notification) for more details.
   *
   * @param info NotificationInfo
   */
  show(info) {
    const { title, body, icon, extraData } = info

    const _info = {
      title: title || this.title,
      body,
      icon: icon
        ? typeof icon === 'object'
          ? icon.toDataURL()
          : icon
        : this.icon,
      extraData,
      duration: this.duration,
      custom: !!this.customPage
    }

    if (process.platform === 'win32') {
      if (this.window && !this.window.isDestroyed()) {
        this.window.webContents.send(NOTIFICATION_SHOW_CHANNEL, _info)

        if (!this.window.isVisible()) {
          this.window.showInactive()
        }
      } else {
        this.createWindow(_info)
      }
    } else {
      if (!ElectronNotification.isSupported()) {
        return
      }

      const { title = this.title, body, icon, extraData } = info

      const notifier = new ElectronNotification({ title, body, icon })
      notifier.on('click', () => {
        this.emit('click', extraData)
      })
      notifier.show()
    }
  }
}

export const notification = new Notification()

/**
 * Register the notification ipc listener for use by the renderer.
 */
export function registerNotificationListener() {
  if (ipcMain.eventNames().some((ename) => ename === NOTIFICATION_CHANNEL)) {
    return
  }

  ipcMain.on(NOTIFICATION_CHANNEL, (_, info) => {
    if (info) {
      notification.show(info)
    } else {
      notification.destroy()
    }
  })
}
