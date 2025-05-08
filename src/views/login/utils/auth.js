import { useUserStore } from "@/stores/modules/user/index";
import { githubAuth, openAuthUrl } from "@/service/api/index";
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

/**
 * 从URL中提取路由信息和查询参数
 * @param url - 要解析的URL字符串
 * @returns 包含action和params的对象
 */
function extractRouteInfoFromURL(url) {
  const parsedUrl = new URL(url);
  const pathSegments = parsedUrl.pathname.split("/").filter(Boolean);
  const action = pathSegments[pathSegments.length - 1] || null;
  const params = Object.fromEntries(new URLSearchParams(parsedUrl.search).entries());

  return { action, params };
}

// GitHub OAuth授权
export const oauthAuthorize = async () => {
  const { url } = await openAuthUrl();
  openWindow(url, { target: __IS_ELECTRON__ ? "_blank" : "_self", });
};

// GitHub授权回调
export const authorizedLogin = async (_code = "") => {
  const code = _code || extractCodeFromUrl();
  if (code) {
    const data = await githubAuth({ code });
    useUserStore().handleSuccessfulAuth(data);
  } else {
    console.error("未获取到code");
  }
};
