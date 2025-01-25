import { contextBridge } from 'electron'
import { electronAPI } from "../main/toolkit/preload";
import { isWindows, isMac } from "../main/platform";

console.log('main:preload.js')

const api = {
  isMac,
  isWindows,
  isTitlebar: true,
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
