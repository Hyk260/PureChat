import { githubAuth, openAuthUrl } from "@/api/node-admin-api/index";
import { isElectron } from "@/utils/common";
import { isDev } from "@/config/env";
import store from "@/store";

const client = isElectron ? 'app' : 'web'

// github 授权登录
export const oauthAuthorize = async () => {
  const { url } = await openAuthUrl({ client });
  if (client === 'web') {
    window.open(url, "_self");
  } else {
    window.open(url);
  }
};

// github 授权成功回调 username userSig
export const authorizedLogin = async (_code = "") => {
  let code = _code;
  // 生产环境 hash
  if (!isDev) {
    const queryParams = window.location.search;
    const params = new URLSearchParams(queryParams);
    code = params.get("code");
  }
  if (!code) return;
  const data = await githubAuth({ code, client });
  // { code: 200, msg: "登录成功", result: data }
  store.dispatch("authorized", data);
};
