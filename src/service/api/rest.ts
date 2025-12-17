import { http } from "@/service/request"

export interface RestApi {
  result: {
    ActionStatus: string
    ErrorCode: number
    ErrorInfo: string
  }
  success: boolean
}

export const restApi = (data: any) => {
  return http.request<RestApi>({
    url: "/api/rest-api",
    method: "post",
    data,
  })
}
