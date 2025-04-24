import { useUserStore } from "@/stores/modules/user/index";
import { githubAuth, openAuthUrl } from "@/api/node-admin-api/index";
import { openWindow } from "@/utils/common";

const { DEV: isDev } = import.meta.env;

const extractCodeFromUrl = () => {
  if (!isDev) {
    const queryParams = window.location.search;
    const params = new URLSearchParams(queryParams);
    return params.get("code");
  }
  return "";
};

// GitHub OAuth授权
export const oauthAuthorize = async () => {
  const { url } = await openAuthUrl();
  openWindow(url, { target: __IS_ELECTRON__ ? "_blank" : "_self", });
};

// GitHub授权回调
export const authorizedLogin = async (_code = "") => {
  const code = _code || extractCodeFromUrl();;
  if (code) {
    const data = await githubAuth({ code });
    useUserStore().handleSuccessfulAuth(data);
  } else {
    console.error("未获取到code");
  }
};
