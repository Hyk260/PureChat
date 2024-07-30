import { registerNotificationListener, notification } from './main'
import { app, shell } from "electron";
import path from "node:path";

function notify() {
  registerNotificationListener()

  let filePath = ''
  if (app.isPackaged) {
    filePath = path.join(process.cwd(), '/resources/app.asar.unpacked/resources/notify.html')
  } else {
    filePath = path.join(__dirname, "../../resources/notify.html");
  }

  notification.config({
    title: 'Electron UIKit',
    duration: 100000,
    customPage: filePath,
    height: 300,
    width: 300,
    debug: true // Open the devTool for debugging
  })
}

export {
  notify,
}