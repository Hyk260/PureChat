import http from "@/utils/http/index";

/**
 * 下载文件
 */
export const loadFile = (params) => {
  return http({
    url: "/downloadFile",
    method: "get",
    params,
  });
};
