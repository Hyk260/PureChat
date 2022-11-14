import http from "@/utils/http/index";
import axios from "axios";

const onHandleUploadProgress = (progressEvent) => {
  if (progressEvent.lengthComputable) {
    return (
      Math.round((progressEvent.loaded / progressEvent.total) * 10000) / 100.0
    );
  }
};

let config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
  transformRequest: [
    function (data) {
      return data;
    },
  ],
  onUploadProgress: (progressEvent) => {
    let persent = ((progressEvent.loaded / progressEvent.total) * 100) | 0; //上传进度百分比
    console.log(persent);
  },
};

/**
 * 下载文件
 */
export const loadFile = (params) => {
  console.log(config);
  return http({
    url: "/downloadFile",
    method: "get",
    params,
    config,
  });
};

export const loadFileCopy = (params) => {
  return axios({
    url: params.file_url,
    method: "post",
    onDownloadProgress(progress) {
      console.log(Math.round((progress.loaded / progress.total) * 100) + "%");
    },
  });
};
