import { registerNotificationListener, notification } from './main'
import { showMainWindow } from "../utils/util";

export function setNotification() {
  registerNotificationListener();

  notification.config({
    title: "PureChat",
    width: 320,
    height: 80,
    // duration: 100000,// debugging
    // debug: true, // Open the devTool for debugging
  });

  notification.on("handleNotifClick", (data) => {
    if (!data) return;
    showMainWindow(global.mainWin);
    global.mainWin.webContents.send("notif:click", data);
  });
}