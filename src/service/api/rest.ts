import { http } from "../request/index";

export const restApi = (data) => {
  return http.request({
    url: "/rest-api",
    method: "post",
    data,
  });
};
