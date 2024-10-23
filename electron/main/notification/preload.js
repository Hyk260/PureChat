import { ipcRenderer, contextBridge } from 'electron'

let timeout = null

ipcRenderer.on('uikit:notification:show', (_, data) => {
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
    ipcRenderer.send("uikit:notification:close", false);
  }, duration);
});

contextBridge.exposeInMainWorld('notification', {
  close: () => {
    ipcRenderer.send("uikit:notification:close", true)
  },
  doClick: (extraData) => {
    ipcRenderer.send('uikit:notification:on-click', extraData)
  }
})

contextBridge.exposeInMainWorld('electron', {})
