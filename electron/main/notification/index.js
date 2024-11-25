import { registerNotificationListener, notification } from './main'
import { mainTop } from "../utils/util";

export function setNotification() {
  registerNotificationListener();

  notification.config({
    title: "PureChat",
    // duration: 100000,
    customPage: true,
    width: 320,
    height: 80,
    // debug: true // Open the devTool for debugging
  });

  notification.on("click", (data) => {
    if (!data) return;
    mainTop();
    global.mainWin.webContents.send("notif:click", data);
  });
}