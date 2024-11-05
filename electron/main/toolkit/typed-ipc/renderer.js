/**
 * Typed emitter for Electron `ipcRenderer`.
 */
export class IpcEmitter {
  send(channel, ...args) {
    window.electron.ipcRenderer.send(channel, ...args)
  }

  invoke(channel,...args) {
    return window.electron.ipcRenderer.invoke(channel, ...args)
  }
}

/**
 * Typed listener for Electron `ipcRenderer`.
 */
export class IpcListener {
  on(channel, listener) {
    window.electron.ipcRenderer.on(channel, listener)
  }

  once(channel,listener) {
    return window.electron.ipcRenderer.once(channel, listener )
  }
}
