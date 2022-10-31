/* eslint-disable no-irregular-whitespace */
import url from "url";
import path from "path";
import os from "os";

export const generateTemplateElement = async (
  convId,
  convType,
  userProfile,
  messageId,
  element,
  groupMemberProfile
) => {
  let formatedElement;
  if (element.elem_type === 1) {
    const base64Url = await localFileToBase64(element.image_elem_orig_path);
    formatedElement = {
      ...element,
      image_elem_orig_url: base64Url,
    };
  } else {
    formatedElement = element;
  }
  return {
    message_client_time: Math.round(new Date().getTime() / 1000),
    message_server_time: 0,
    message_is_peer_read: false,
    message_status: 1, // 消息发送状态 1 2
    message_conv_type: convType,
    message_conv_id: convId,
    message_is_from_self: true,
    message_elem_array: [formatedElement],
    message_msg_id: messageId,
    message_sender_profile: userProfile,
    message_sender_group_member_info: groupMemberProfile || {},
  };
};

export const getMessageElemItem = (type, data, videoInfoList) => {
  switch (type) {
    case "text": {
      return {
        elem_type: 0,
        text_elem_content: data.text,
      };
    }
    case "block-video": {
      const item = videoInfoList.find((item) => item.videoPath === data.path);
      const {
        videoType,
        videoSize,
        videoDuration,
        videoPath,
        screenshotType,
        screenshotSize,
        screenshotWidth,
        screenshotHeight,
        screenshotPath,
      } = item;
      return {
        elem_type: 9,
        video_elem_video_type: videoType,
        video_elem_video_size: videoSize,
        video_elem_video_duration: videoDuration,
        video_elem_video_path: videoPath,
        video_elem_image_type: screenshotType,
        video_elem_image_size: screenshotSize,
        video_elem_image_width: screenshotWidth,
        video_elem_image_height: screenshotHeight,
        video_elem_image_path: screenshotPath,
      };
    }
    case "block-file": {
      return {
        elem_type: 4,
        file_elem_file_path: data.path,
        file_elem_file_name: data.name,
        file_elem_file_size: data.size,
      };
    }
    case "block-image": {
      return {
        elem_type: 1,
        image_elem_orig_path: data.path,
        image_elem_level: 0,
      };
    }
  }
};
// buffer to Base64
export const bufferToBase64Url = (data, type) => {
  const buffer = new Buffer(data, "binary");
  return `data:image/${type};base64,` + buffer.toString("base64");
};
// File to base64
export const fileImgToBase64Url = async (file) => {
  return new Promise((res) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const base64Value = e.target.result;
      // target.result 该属性表示目标对象的DataURL
      res(base64Value);
    };
    reader.readAsDataURL(file);
  });
};
// 网络地址 to base64
export const urlToBase64 = (url) => {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.onload = function () {
      let canvas = document.createElement("canvas");
      canvas.width = this.naturalWidth;
      canvas.height = this.naturalHeight;
      canvas.getContext("2d").drawImage(image, 0, 0);
      let result = canvas.toDataURL("image/png");
      resolve(result);
    };
    image.setAttribute("crossOrigin", "Anonymous");
    image.src = url;
    image.onerror = () => {
      reject(new Error("转换失败"));
    };
  });
};
// 图片类型
export const getImageType = (str) => {
  const reg = /\.(png|jpg|gif|jpeg|webp)$/;
  return str.match(reg)[1];
};
// base64 to File
export const dataURLtoFile = (dataUrl, fileName) => {
  var arr = dataUrl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
};
