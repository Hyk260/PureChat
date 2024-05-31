import http from "@/utils/http/index";

export const restApi = (data) => {
  return http({
    url: "/rest-api",
    method: "post",
    data,
  });
};
