import { NOTIFICATION_CHANNEL } from './constants'
const core = ((globalThis || window).uikit || (globalThis || window).electron)

export const notification = {
  show: (info) => {
    core.ipcRenderer.send(NOTIFICATION_CHANNEL, info)
  },
  destroy: () => {
    core.ipcRenderer.send(NOTIFICATION_CHANNEL)
  }
}
