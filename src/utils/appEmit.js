export const appIpcEmit = () => {
  electron.ipcRenderer.on("awaken", (event, data) => {
    console.warn("awaken:", data);
  });
};
