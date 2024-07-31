import { getConversationList } from "./index";

export const handleNotification = (data) => {
  window.electron.ipcRenderer.send("uikit:notification", { title: `${data.nick}提到了你`, body: data });
}

// 托盘闪烁
export const handleTrayFlashIng = (data) => {
  const massage = getConversationList(data);
  // 消息免打扰
  if (!massage || massage?.[0].messageRemindType === "AcceptNotNotify") return;
  window.electron.ipcRenderer.send("trayFlashIng");
};

// 窗口抖动
export const handlesOnShake = (data) => {
  const { payload, type } = data[0];
  if (type !== "TIMCustomElem") return;
  if (payload?.data !== "dithering") return;
  const massage = getConversationList(data);
  // 消息免打扰
  if (!massage || massage?.[0].messageRemindType === "AcceptNotNotify") return;
  if (payload?.data === "dithering") {
    window.electron.ipcRenderer.send("shakeWindow");
  }
};
