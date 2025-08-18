import { http } from "@/service/request/index";

export const openAuthUrl = () => {
  return http.request({
    url: '/auth/github',
    method: "get",
    params: {
      client: __IS_ELECTRON__ ? 'app' : 'web',
    },
  });
};

export const githubAuth = ({ code }: { code: string }) => {
  return http.request({
    url: "/auth/github/callback",
    method: "get",
    params: {
      code,
      client: __IS_ELECTRON__ ? 'app' : 'web',
    },
  });
};