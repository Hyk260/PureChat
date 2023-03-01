import http from "@/utils/http/index";
import axios from "axios";
import qs from "qs";
import config from "@/config/defaultSettings";
const { BASE_API } = config;

export const createForData = ({
  name,
  type,
  size,
  fileName,
  uploadedSize = 0,
  file,
}) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("type", type);
  formData.append("size", size);
  formData.append("fileName", fileName);
  formData.append("uploadedSize", uploadedSize);
  formData.append("file", file);
  return formData;
};

/**
 * @description: 文件上传
 * @param { params }  File
 * @return {*}
 *
 */
export const uploadFiles = async params => {
  const { files } = params || {};
  if (!files) return;
  let uploadedSize = 0;
  let uploadedResult = null;
  const { name, type, size } = files || {};
  const fileName = new Date().getTime() + "_" + name;

  const formData = createForData({
    name,
    type,
    size,
    fileName,
    uploadedSize,
    file: files,
  });
  try {
    uploadedResult = await http({
      url: "/upload_files",
      method: "post",
      data: formData, // body参数
      onUploadProgress: progressEvent => {
        let persent = ((progressEvent.loaded / progressEvent.total) * 100) | 0; //上传进度百分比
        console.log(persent + "%");
      },
    });
    console.log(uploadedResult);
  } catch (error) {
    console.log(error);
  }
};

function openai(params) {
  const { prompt } = params;

  const openaiApiKey = "";
  const model = "text-babbage-001";
  const temperature = 0.5;
  const maxTokens = 50;

  axios
    .post(
      "https://api.openai.com/v1/engines/" + model + "/completions",
      {
        prompt: prompt,
        temperature: temperature,
        max_tokens: maxTokens,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + openaiApiKey,
        },
      }
    )
    .then(response => {
      console.log(response.data.choices[0].text);
    })
    .catch(error => {
      console.log(error);
    });
}

export const SendMessageCd = async params => {
  const { sender, receiver, message } = params;
  console.log(params);
  openai({ prompt: message });
  // `${BASE_API}callback/send-message-cd`
  // const requestBody = {
  //   sender,
  //   receiver,
  //   message
  // }
  // const apiEndpoint = `${BASE_API}callback/send-message-cd`;
  // const requestBodyJson = JSON.stringify(requestBody);
  // axios.post(apiEndpoint, requestBodyJson, {
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // })
  //   .then(response => {
  //     console.log(response.data);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  // await http({
  //   url: "/callback/send-message-cd",
  //   method: "post",
  //   // method: "get",
  //   // params: { sender, receiver, message }
  //   data: 123 // body参数
  // });
  // JSON.stringify({
  //   sender,
  //   receiver,
  //   message
  // }),
};
