import { ipcMain, app, shell, dialog } from "electron";

import {
  handleScreenshot,
} from "../utils/util";

export const ipcEvent = () => {
  //截图
  ipcMain.on("screenshot", (event, data) => {
    handleScreenshot();
  });
};
