import { http } from "@/service/request"
import type { ApiResponse } from "@/service/request/types"
import type { LoginResult } from "@/stores/modules/user/type"

export const openAuthUrl = () => {
  return http.request<{ url: string }>({
    url: "/api/auth/github",
    method: "get",
    params: {
      client: __IS_ELECTRON__ ? "app" : "web",
    },
  })
}

export const githubAuth = ({ code }: { code: string }) => {
  return http.request<ApiResponse<LoginResult>>({
    url: "/api/auth/github/callback",
    method: "get",
    params: {
      code,
      client: __IS_ELECTRON__ ? "app" : "web",
    },
  })
}
