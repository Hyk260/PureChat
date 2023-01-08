import http from "@/utils/http/index";
import axios from "axios";
import qs from "qs";

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
 * 上传文件
 */
export const loadFile = (params) => {
  console.log(params);
  const { file_url } = params;
  const formData = new FormData();
  formData.append("img", file_url);
  console.log(formData);
  return http({
    url: "/downloadFile",
    method: "post",
    // params: "", // query参数
    data: {
      file_url: file_url,
    }, // body参数
    // headers: config,
  });
};

export const loadFileCopy = (params) => {
  const { formData } = params;
  console.log(params);
  return axios({
    url: "http://localhost:8081/downloadFile",
    method: "post",
    data: formData,
    onDownloadProgress(progress) {
      console.log(Math.round((progress.loaded / progress.total) * 100) + "%");
    },
  }).then((res) => {
    console.log(res, "loadFileCopy");
  });
};
