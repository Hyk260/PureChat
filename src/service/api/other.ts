import { http } from "../request/index"

export const getPrompt = async () => {
  return http.request({
    url: "/market",
    method: "get",
  })
}
