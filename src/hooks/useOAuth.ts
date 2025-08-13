import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { githubAuth, openAuthUrl } from '@/service/api/index';
import { openWindow } from '@/utils/common';

interface OAuthOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  autoWatch?: boolean;
}

/**
 * 从URL中提取路由信息和查询参数
 * @param url - 要解析的URL字符串
 * @returns 包含action和params的对象
 */
export function extractRouteInfoFromURL(url: string) {
  const parsedUrl = new URL(url);
  const pathSegments = parsedUrl.pathname.split("/").filter(Boolean);
  const action = pathSegments[pathSegments.length - 1] || null;
  const params = Object.fromEntries(new URLSearchParams(parsedUrl.search).entries());

  return { action, params };
}

export function useOAuth(options: OAuthOptions) {
  const { onSuccess, onError, autoWatch = true } = options;
  const route = useRoute();

  // History 模式: http://localhost:8080/login?code=xxx
  // Hash 模式: http://localhost:8080/#/login?code=xxx

  /**
   * 从 URL 中提取授权码
   */
  const extractCodeFromUrl = (url?: string) => {
    const searchParams = url
      ? new URL(url, window.location.origin).searchParams
      : new URLSearchParams(window.location.search);

    return searchParams.get('code') || '';
  };

  /**
   * 检查 URL 是否包含 code 参数
   */
  const hasCodeInUrl = (url: string) => {
    try {
      const urlObj = new URL(url, window.location.origin);
      return urlObj.searchParams.has('code');
    } catch {
      return false;
    }
  };

  /**
   * GitHub OAuth 授权
   */
  const oauthAuthorize = async () => {
    try {
      const { url } = await openAuthUrl();
      openWindow(url, { target: __IS_ELECTRON__ ? '_blank' : '_self', });
    } catch (error) {
      onError?.(error);
    }
  };

  /**
   * GitHub 授权回调处理
   * @param code - 可选的授权码，如果不传则从 URL 中提取
   */
  const authorizedLogin = async (code = '') => {
    const authCode = code || extractCodeFromUrl();

    if (!authCode) {
      const error = new Error('未获取到授权码');
      onError?.(error);
      return;
    }

    try {
      const data = await githubAuth({ code: authCode });
      onSuccess?.(data);
    } catch (error) {
      onError?.(error);
    }
  };

  if (autoWatch) {
    watch(
      () => route.fullPath,
      (fullPath) => {
        if (hasCodeInUrl(fullPath)) authorizedLogin();
      },
      { immediate: true }
    );
  }

  return {
    oauthAuthorize,
    authorizedLogin,
    extractCodeFromUrl,
  };
}
