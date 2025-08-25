import { http } from "../request/index"

const { DEV: isDev } = import.meta.env

export const getPrompt = async () => {
  return http.request({
    url: "/market",
    method: "get",
  })
}

if (isDev) {
  ;(window as any).getPrompt = getPrompt
}
