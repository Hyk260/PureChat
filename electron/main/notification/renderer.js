const core = (globalThis || window).electron

export const notification = {
  show: (info) => {
    core.ipcRenderer.send("uikit:notification", info)
  },
  destroy: () => {
    core.ipcRenderer.send("uikit:notification")
  }
}
