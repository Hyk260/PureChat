import fs from "fs";
import path from "path";
import os from "os";
/**
 * userProfile
 *
 * **/

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
    message_status: 1,
    message_conv_type: convType,
    message_conv_id: convId,
    message_is_from_self: true,
    message_elem_array: [formatedElement],
    message_msg_id: messageId,
    message_sender_profile: userProfile,
    message_sender_group_member_info: groupMemberProfile || {},
  };
};

export const localFileToBase64 = (url) => {
  return new Promise((resolve, reject) => {
    try {
      fs.readFile(url, "binary", (err, data) => {
        if (err) {
          reject(err);
        } else {
          const base64Url = bufferToBase64Url(data, getImageType(url));
          resolve(base64Url);
        }
      });
    } catch (e) {
      console.log(e);
    }
  });
};

export const bufferToBase64Url = (data, type) => {
  const buffer = new Buffer(data, "binary");
  return `data:image/${type};base64,` + buffer.toString("base64");
};

// 得到图片的base64
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

export const getImageType = (str) => {
  const reg = /\.(png|jpg|gif|jpeg|webp)$/;
  return str.match(reg)[1];
};
/**
 * 用于同步检查给定路径中是​​否已存在文件。它返回一个布尔值，该值指示文件的存在。
 *
 * */
export const checkFileExist = (path) => {
  return fs.existsSync(path);
};
export const getFileByPath = async (filePath) => {
  const size = fs.statSync(filePath).size;
  const name = path.parse(filePath).base;
  const type = name.split(".")[1];
  const fileContent = await fs.readFileSync(filePath);
  return {
    path: filePath,
    size,
    name,
    type,
    fileContent,
  };
};

export const getMessageElemItem = (type, data, videoInfoList) => {
  console.log(data);
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
