import { ipcRenderer, contextBridge } from 'electron'
import {
  NOTIFICATION_SHOW_CHANNEL,
  NOTIFICATION_CLOSE_CHANNEL,
  NOTIFICATION_ON_CLICK_CHANNEL
} from './constants'

let timeout = null

ipcRenderer.on(NOTIFICATION_SHOW_CHANNEL, (_, data) => {
  let duration = 2000;  // 默认持续时间为2000毫秒;

  if (data) {
    duration = data.duration || 2000;
    if (data.custom) {
      const { title, body, icon, extraData } = data;
      window.dispatchEvent(
        new CustomEvent('notification-message', {
          detail: { title, body, icon, extraData }
        })
      );
    }
  }

  // 清除之前的定时器
  if (timeout) clearTimeout(timeout);

  // 设置定时器，发送关闭通知的消息
  timeout = setTimeout(() => {
    ipcRenderer.send(NOTIFICATION_CLOSE_CHANNEL, false);
  }, duration);
});

contextBridge.exposeInMainWorld('notification', {
  close: () => {
    ipcRenderer.send(NOTIFICATION_CLOSE_CHANNEL, true)
  },
  doClick: (extraData) => {
    ipcRenderer.send(NOTIFICATION_ON_CLICK_CHANNEL, extraData)
  }
})

contextBridge.exposeInMainWorld('electron', {})
