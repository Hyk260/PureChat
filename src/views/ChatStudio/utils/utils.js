import useClipboard from "vue-clipboard3";
import TIM from "tim-js-sdk";
import {
  CreateTextMsg,
  CreateTextAtMsg,
  CreateFiletMsg,
  CreateImgtMsg,
  sendMsg,
} from "@/api/im-sdk-api";

const { toClipboard } = useClipboard();

export const dragControllerDiv = (node) => {
  let svgResize = document.getElementById("svgResize"); //滑块
  let svgTop = document.getElementById("svgTop"); //聊天框
  let svgDown = document.getElementById("svgDown"); //编辑器
  let svgBox = document.getElementById("svgBox"); //整个盒子
  // 按下鼠标执行
  svgResize.onmousedown = (e) => {
    let startY = e.clientY; //鼠标按下 起始Y
    svgResize.top = svgResize.offsetTop;
    // 事件会在鼠标指针移到指定的对象时发生。
    document.onmousemove = (e) => {
      let endY = e.clientY; //鼠标移动 结束得y
      //移动距离 = 原来高度+（结束y-开始y）
      let moveLen = svgResize.top + (endY - startY);
      // 最大移动距离 = 整个盒子高度 - 现在高度
      let maxT = svgBox.clientHeight - svgResize.offsetHeight;
      // 控制移动最小
      if (moveLen < 200) moveLen = 200;
      // 控制移动最大
      if (moveLen > maxT - 200) moveLen = maxT - 200;
      svgResize.style.top = moveLen;
      svgTop.style.height = moveLen - 60 + "px";
      svgDown.style.height = svgBox.clientHeight - moveLen - 5 + "px";
    };
    // 鼠标按键被松开时执行
    document.onmouseup = (evt) => {
      document.onmousemove = null;
      document.onmouseup = null;
      svgResize.releaseCapture && svgResize.releaseCapture();
      // 手动更新滚动条高度
      node.updateScrollbar();
    };
    svgResize.setCapture && svgResize.setCapture();
    return false;
  };
};

// 复制
export const fncopy = async (data) => {
  const { elements } = data;
  const { content, type } = elements[0];
  // 文本
  if (type === "TIMTextElem") {
    await toClipboard(content.text);
  }
};

export const GroupSystemNotice = (message) => {
  const groupName =
    message.payload.groupProfile.name || message.payload.groupProfile.groupID;
  switch (message.payload.operationType) {
    case 1:
      return `${message.payload.operatorID} 申请加入群组：${groupName}`;
    case 2:
      return `成功加入群组：${groupName}`;
    case 3:
      return `申请加入群组：${groupName}被拒绝`;
    case 4:
      return `你被管理员${message.payload.operatorID}踢出群组：${groupName}`;
    case 5:
      return `群：${groupName} 已被${message.payload.operatorID}解散`;
    case 6:
      return `${message.payload.operatorID}创建群：${groupName}`;
    case 7:
      return `${message.payload.operatorID}邀请你加群：${groupName}`;
    case 8:
      return `你退出群组：${groupName}`;
    case 9:
      return `你被${message.payload.operatorID}设置为群：${groupName}的管理员`;
    case 10:
      return `你被${message.payload.operatorID}撤销群：${groupName}的管理员身份`;
    case 12:
      return `${message.payload.operatorID}邀请你加群：${groupName}`;
    case 13:
      return `${message.payload.operatorID}同意加群：${groupName}`;
    case 14:
      return `${message.payload.operatorID}拒接加群：${groupName}`;
    case 255:
      return "自定义群系统通知: " + message.payload.userDefinedField;
  }
};

export const renderFileIcon = (fileType = "") => {
  let type;
  if (fileType == "xlsx" || fileType == "xls") {
    type = "表格";
  } else if (fileType == "doc" || fileType == "docx") {
    type = "文档";
  } else if (fileType == "pptx" || fileType == "ppt") {
    type = "ppt";
  } else if (fileType == "rar" || fileType == "zip") {
    type = "压缩包";
  } else if (fileType == "txt") {
    type = "txt";
  } else if (fileType == "pdf") {
    type = "pdf";
  } else {
    type = "通用";
  }
  return require(`@/assets/message/${type}.png`);
};

export const getMsgElemItem = (type, data, videoInfoList) => {
  switch (type) {
    case "text": {
      return "";
    }
    case "block-video": {
      return "";
    }
    case "block-file": {
      return "";
    }
    case "block-image": {
      return "";
    }
  }
};
