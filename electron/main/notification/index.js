import { registerNotificationListener, notification } from './main'
import { mainTop } from "../utils/util";
import { getIconPath } from '../utils/util';

function notify() {
  registerNotificationListener()

  let filePath = getIconPath('notify.html')

  notification.config({
    title: 'PureChat',
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