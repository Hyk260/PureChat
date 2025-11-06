import { http } from "@/service/request"

export const getPrompt = async () => {
  return http.request({
    url: "/api/agents",
    method: "get",
  })
}
