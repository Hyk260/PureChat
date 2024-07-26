import store from "@/store";
import { githubAuth } from "@/api/node-admin-api/index";

async function githubLogin(action, params) {
  if (action !== 'authorized') return
  try {
    const data = await githubAuth({ code: params.code });
    // { code: 200, msg: "登录成功", result: data }
    store.dispatch("authorized", data);
  } catch (error) {
    console.log('githubLogin:', error)
  }
}

function openUrl(data) {
  const { action, params } = window.api.authorized(data)
  githubLogin(action, params)
}

window.openUrl = openUrl

export const appIpcEmit = () => {
  electron.ipcRenderer.on("awaken", (event, data) => {
    console.warn("awaken:", data);
    openUrl(data)
  });
};

