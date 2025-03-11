import { ipcRenderer, contextBridge } from "electron";
import { electronAPI } from "../toolkit/preload";

console.log("notification:preload.js");

const api = {}
let timeout = null;

ipcRenderer.on("uikit:notification:show", (_, data) => {
  let duration = 2000; // 默认持续时间为2000毫秒;

  if (data) {
    duration = data.duration || 2000;
    const { title, body, icon, extraData } = data;
    window.dispatchEvent(
      new CustomEvent("notification-message", {
        detail: { title, body, icon, extraData },
      })
    );
  }

  // 清除之前的定时器
  if (timeout) clearTimeout(timeout);

  // 设置定时器，发送关闭通知的消息
  timeout = setTimeout(() => {
    ipcRenderer.send("uikit:notification:close", false);
  }, duration);
});

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("notification", {
      close: () => {
        ipcRenderer.send("uikit:notification:close", true);
      },
      doClick: (extraData) => {
        ipcRenderer.send("uikit:notification:on-click", extraData);
      },
    });
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}