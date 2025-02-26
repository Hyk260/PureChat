import { githubAuth, openAuthUrl } from "@/api/node-admin-api/index";
import store from "@/store";
import { useUserStore } from "@/stores/modules/user";

const { DEV: isDev } = import.meta.env;

// github 授权登录
export const oauthAuthorize = async () => {
  const { url } = await openAuthUrl();
  if (window?.electron) {
    window.open(url);
  } else {
    window.open(url, "_self");
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
  const data = await githubAuth({ code });
  useUserStore().handleSuccessfulAuth(data);
};
