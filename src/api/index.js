import http from "@/utils/http/index";
import axios from "axios";
import qs from "qs";

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

export const createForData = ({ name, type, size, fileName, uploadedSize = 0, file }) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("type", type);
  formData.append("size", size);
  formData.append("fileName", fileName);
  formData.append("uploadedSize", uploadedSize);
  formData.append("file", file);
  return formData;
}

/**
 * @description: 文件上传
 * @param { params }  File
 * @return {*}
 * 
 */
export const uploadFiles = async (params) => {
  const { files } = params || {};
  if (!files) return;
  let uploadedSize = 0
  let uploadedResult = null
  const { name, type, size } = files || {}
  const fileName = new Date().getTime() + '_' + name

  const formData = createForData({
    name,
    type,
    size,
    fileName,
    uploadedSize,
    file: files,
  })
  try {
    uploadedResult = await http({
      url: "/upload_files",
      method: "post",
      data: formData, // body参数
      onUploadProgress: (progressEvent) => {
        let persent = ((progressEvent.loaded / progressEvent.total) * 100) | 0; //上传进度百分比
        console.log(persent + '%');
      },

    });
    console.log(uploadedResult)
  } catch (error) {
    console.log(error)
  }
};



export const loadFileCopy = async (params) => {
  const { files } = params;
  const { name, type, size } = files || {}
  console.log(files)
  let uploadedSize = 0
  const CHUNK_SIZE = 64 * 1024;
  let uploadedResult = null
  // return
  console.log(params);
  const fileName = new Date().getTime() + '_' + name
  console.log(fileName)
  // return;
  // formData.append("file", files);
  // while (uploadedSize < size) {
  //   const fileChunk = files.slice(uploadedSize, uploadedSize + CHUNK_SIZE)
  //   const formData = createForData({
  //     name,
  //     type,
  //     size,
  //     fileName,
  //     uploadedSize,
  //     file: fileChunk,
  //   })
  //   try {
  //     uploadedResult = await axios({
  //       url: "http://localhost:8081/downloadFile",
  //       method: "post",
  //       data: formData,
  //       // onDownloadProgress(progress) {
  //       //   console.log(Math.round((progress.loaded / progress.total) * 100) + "%");
  //       // },
  //     })
  //   } catch (error) {
  //     console.log(error)
  //     return;
  //   }
  //   uploadedSize += fileChunk.size
  //   console.log(uploadedResult)
  //   console.log(Math.round((uploadedSize / size) * 100) + "%")
  // }
  const formData = createForData({
    name,
    type,
    size,
    fileName,
    uploadedSize,
    file: files,
  })
  return axios({
    url: "http://localhost:8081/downloadFile",
    method: "post",
    data: formData,
    onUploadProgress: (progressEvent) => {
      let persent = ((progressEvent.loaded / progressEvent.total) * 100) | 0; //上传进度百分比
      console.log(persent + '%');
    },
  }).then((res) => {
    console.log(res, "loadFileCopy");
  });
};
