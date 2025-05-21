import { http } from "@/service/request/index";

export const openAuthUrl = (params) => {
  return http.request({
    url: '/auth/github',
    method: "get",
    params: {
      client: __IS_ELECTRON__ ? 'app' : 'web',
      ...params
    },
  });
};

export const githubAuth = (params) => {
  return http.request({
    url: "/auth/github/callback",
    method: "get",
    params: {
      // code:'',
      client: __IS_ELECTRON__ ? 'app' : 'web',
      ...params,
    },
  });
};