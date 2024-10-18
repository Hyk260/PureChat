import store from "@/store";
import { scrollToDomPostion } from "@/utils/chat/index";
import { githubAuth } from "@/api/node-admin-api/index";

function extractRouteInfoFromURL(url) {
  const parsedUrl = new URL(url);
  const pathSegments = parsedUrl.pathname.split('/').filter(segment => segment);
  const action = pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : null;
  const params = new URLSearchParams(parsedUrl.search);
  const paramsObject = {};
  for (const [key, value] of params.entries()) {
    paramsObject[key] = value;
  }
  return {
    action: action,
    params: paramsObject
  };
}

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
  const { action, params } = extractRouteInfoFromURL(data)
  githubLogin(action, params)
}

window.openUrl = openUrl

export const appIpcEmit = () => {
  if (!window.electron && !electron?.ipcRenderer) return
  electron.ipcRenderer.on("awaken", (event, data) => {
    console.log("awaken:", data);
    openUrl(data)
  });

  electron.ipcRenderer.on("notif:click", (event, data) => {
    console.log("notif:click", data);
    const { conversationID: convId, ID } = data
    store.commit("taggleOueSide", "message");
    store.dispatch("addConversation", { convId });
    setTimeout(() => {
      scrollToDomPostion(ID);
    }, 500)
  });
};

