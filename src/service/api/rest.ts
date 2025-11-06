import { http } from "@/service/request"

export const restApi = (data) => {
  return http.request({
    url: "/api/rest-api",
    method: "post",
    data,
  })
}
