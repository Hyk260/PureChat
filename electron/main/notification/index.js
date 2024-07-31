import { registerNotificationListener, notification } from './main'
import { app, shell } from "electron";
import path from "node:path";
import { mainTop } from "../utils/util";

function notify() {
  registerNotificationListener()

  let filePath = ''
  if (app.isPackaged) {
    filePath = path.join(process.cwd(), '/resources/app.asar.unpacked/resources/notify.html')
  } else {
    filePath = path.join(__dirname, "../../resources/notify.html");
  }

  notification.config({
    title: 'Electron',
    // duration: 100000,
    customPage: filePath,
    width: 320,
    height: 80,
    // debug: true // Open the devTool for debugging
  })

  notification.on('click', (data) => {
    if (!data) return
    const win = global.mainWin;
    mainTop()
    win.webContents.send("notif:click", data);
  })
}

export {
  notify,
}