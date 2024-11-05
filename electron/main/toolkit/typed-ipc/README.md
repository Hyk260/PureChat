1. 使用 toolkit/preload 来暴露 Electron API。

   ```js
   import { contextBridge } from 'electron'
   import { electronAPI } from 'toolkit/preload'

   if (process.contextIsolated) {
     try {
       contextBridge.exposeInMainWorld('electron', electronAPI)
     } catch (error) {
       console.error(error)
     }
   } else {
     window.electron = electronAPI
   }
   ```

   or

   ```js
   import { exposeElectronAPI } from 'toolkit/preload'

   exposeElectronAPI()
   ```

2. 在主进程中注册侦听器或处理程序，或向渲染器发送消息。

   ```js
   import { IpcListener, IpcEmitter } from 'toolkit/typed-ipc/main'

   const ipc = new IpcListener()

   const emitter = new IpcEmitter()

   ipc.on('ping', (e, arg) => {
     console.log(arg)
     emitter.send(e.sender, 'ready', true)
   })

   ipc.handle('say-hello', () => {
     return 'hello'
   })
   ```

3. 从渲染进程向主进程发送消息，或侦听来自主进程的消息。

   ```js
   import { IpcListener, IpcEmitter } from 'toolkit/typed-ipc/renderer'

   const ipc = new IpcListener()

   const emitter = new IpcEmitter()

   ipc.on('ready', (e, arg) => {
     console.log(arg)
   })

   emitter.send('ping', 'pong')

   emitter.invoke('say-hello').then((str) => {
     console.log(str)
   })
   ```
