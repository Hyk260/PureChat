import { core } from './common'
import { NOTIFICATION_CHANNEL } from './constants'

export const notification = {
  show: (info) => {
    core.ipcRenderer.send(NOTIFICATION_CHANNEL, info)
  },
  destroy: () => {
    core.ipcRenderer.send(NOTIFICATION_CHANNEL)
  }
}
