import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { isWindows } from '../main/platform';
console.log('main:preload.js')

function authorized(url) {
  const parsedUrl = new URL(url);
  const pathSegments = parsedUrl.pathname.split('/').filter(segment => segment);
  const action = pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : null;
  const params = new URLSearchParams(parsedUrl.search);
  const paramsObject = {};
  for (const [key, value] of params.entries()) {
    paramsObject[key] = value;
  }
  return {
    action: action,
    params: paramsObject
  };
}

const api = {
  isWindows,
  authorized,
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

if (window.electron) {
  window.electron.ipcRenderer.on("awaken", (event, data) => {
    console.log("awaken:", data);
  });
}