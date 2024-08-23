import { registerNotificationListener, notification } from './main'
import { mainTop } from "../utils/util";

function notify() {
  registerNotificationListener()

  notification.config({
    title: 'PureChat',
    // duration: 100000,
    customPage: '',
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