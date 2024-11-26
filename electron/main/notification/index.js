import { registerNotificationListener, notification } from './main'
import { mainTop } from "../utils/util";

export function setNotification() {
  registerNotificationListener();

  notification.config({
    title: "PureChat",
    width: 320,
    height: 80,
    // debugging
    // duration: 100000,
    // debug: true, // Open the devTool for debugging
  });

  notification.on("handleNotifClick", (data) => {
    if (!data) return;
    mainTop();
    global.mainWin.webContents.send("notif:click", data);
  });
}