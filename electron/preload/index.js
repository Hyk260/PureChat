import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from "../main/toolkit/preload";
import { isWindows, isMac } from "../main/platform";

console.log('main:preload.js')

const api = {
  isMac,
  isWindows,
  isTitlebar: true,
  handleScreenshot: () => ipcRenderer.invoke('handleScreenshot'),
  trayFlashIng: () => ipcRenderer.invoke('trayFlashIng'),
  fileDownloadFolder: (data) => ipcRenderer.invoke('file:downloadFolder', data),
  fileOpenFolder: (data) => ipcRenderer.invoke('file:openFolder', data),
  fileCheckExist: (data) => ipcRenderer.invoke('file:checkExist', data),
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
