import { githubAuth, openAuthUrl } from "@/api/node-admin-api/index";
import { isDev } from "@/config/env";
import store from "@/store";

// github 授权
export const oauthAuthorize = async (id) => {
  const res = await openAuthUrl(id);
  window.open(res, "_self");
};

// github 授权回调 username userSig
export const authorizedLogin = async (_code = "") => {
  let code = _code;
  // 生产环境 hash
  if (!isDev) {
    const queryParams = window.location.search;
    const params = new URLSearchParams(queryParams);
    code = params.get("code");
  }
  if (!code) return;
  const data = await githubAuth({ code });
  store.dispatch("authorized", data);
};
