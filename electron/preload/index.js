import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { isWindows } from '../main/platform';

const api = {
  isWindows
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
