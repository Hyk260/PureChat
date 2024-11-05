import { ipcMain } from 'electron'

/**
 * Typed listener for Electron `ipcMain`.
 */
export class IpcListener {
  listeners = []
  handlers = []

  /**
   * Listen to `channel`.
   */
  on(channel, listener) {
    this.listeners.push(channel)
    ipcMain.on(channel, listener)
  }

  /**
   * Handle a renderer invoke request.
   */
  handle(channel,  listener) {
    this.handlers.push(channel)
    ipcMain.handle(channel, listener)
  }

  /**
   * Dispose all listeners and handlers.
   */
  dispose() {
    this.listeners.forEach(c => ipcMain.removeAllListeners(c))
    this.listeners = []
    this.handlers.forEach(c => ipcMain.removeHandler(c))
    this.handlers = []
  }
}

/**
 * Typed emitter for sending an asynchronous message to the renderer process.
 */
export class IpcEmitter {
  /**
   * Send an asynchronous message to the renderer process.
   */
  send(sender, channel, ...args) {
    sender.send(channel, ...args)
  }
}
