import useClipboard from "vue-clipboard3";
import TIM from "tim-js-sdk";

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
      node.UpdateScrollbar();
    };
    svgResize.setCapture && svgResize.setCapture();
    return false;
  };
};

// 返回消息类型
export const Megtype = (item) => {
  const { message_elem_array } = item || [];
  const { elem_type } = message_elem_array[0] || {};
  let resp = null;
  switch (elem_type) {
    case 0:
      resp = "message-view__text"; // 文本
      break;
    case 5:
      resp = "group-tips-elem-item"; // 系统提示
      break;
  }
  return resp;
};

// 动态组件
export const loadMsgComponents = (item) => {
  const { message_elem_array } = item || {};
  const { elem_type } = message_elem_array[0];
  let resp = null;
  switch (elem_type) {
    case 0:
      resp = "TextElemItem"; // 文本消息
      break;
    case 1:
      resp = "pic-elem-item"; //图片消息
      break;
    case 4:
      resp = "file-elem"; // 文件消息
      break;
    case 6:
      resp = "emoji-elem"; // 表情消息
      break;
  }
  console.log(resp);
  return resp;
};

// 复制
export const fncopy = async (data) => {
  console.log(data);
  const { elements } = data;
  const { content, type } = elements[0];
  // 文本
  if (type === "TIMTextElem") {
    await toClipboard(content.text);
  }
};

export const GroupSystemNotice = (message) => {
  const groupName = message.payload.groupProfile.name || message.payload.groupProfile.groupID
  switch (message.payload.operationType) {
    case 1:
      return `${message.payload.operatorID} 申请加入群组：${groupName}`
    case 2:
      return `成功加入群组：${groupName}`
    case 3:
      return `申请加入群组：${groupName}被拒绝`
    case 4:
      return `你被管理员${message.payload.operatorID}踢出群组：${groupName}`
    case 5:
      return `群：${groupName} 已被${message.payload.operatorID}解散`
    case 6:
      return `${message.payload.operatorID}创建群：${groupName}`
    case 7:
      return `${message.payload.operatorID}邀请你加群：${groupName}`
    case 8:
      return `你退出群组：${groupName}`
    case 9:
      return `你被${message.payload.operatorID}设置为群：${groupName}的管理员`
    case 10:
      return `你被${message.payload.operatorID}撤销群：${groupName}的管理员身份`
    case 12:
      return `${message.payload.operatorID}邀请你加群：${groupName}`
    case 13:
      return `${message.payload.operatorID}同意加群：${groupName}`
    case 14:
      return `${message.payload.operatorID}拒接加群：${groupName}`
    case 255:
      return '自定义群系统通知: ' + message.payload.userDefinedField
  }
}

export const GroupTipContent = (message) => {
  let userID = ''
  let currentUserProfile = ''
  // 群通话tips
  let nick = message.nick || ((message.from === userID) && currentUserProfile?.nick) || message.from
  const userName = message.nick || message.payload.userIDList.join(',')
  switch (message.payload.operationType) {
    case TIM.TYPES.GRP_TIP_MBR_JOIN:
      return `群成员：${userName} 加入群组`
    case TIM.TYPES.GRP_TIP_MBR_QUIT:
      return `群成员：${userName} 退出群组`
    case TIM.TYPES.GRP_TIP_MBR_KICKED_OUT:
      return `群成员：${userName} 被${message.payload.operatorID}踢出群组`
    case TIM.TYPES.GRP_TIP_MBR_SET_ADMIN:
      return `群成员：${userName} 成为管理员`
    case TIM.TYPES.GRP_TIP_MBR_CANCELED_ADMIN:
      return `群成员：${userName} 被撤销管理员`
    case TIM.TYPES.GRP_TIP_GRP_PROFILE_UPDATED:
      return '群资料修改'
    case callTips:
      if (message.payload.text.indexOf('结束群聊') > -1) {
        return `"${message.payload.text}"`
      } else {
        return `"${nick}" ${message.payload.text}`
      }
    case TIM.TYPES.GRP_TIP_MBR_PROFILE_UPDATED:
      for (let member of message.payload.memberList) {
        if (member.muteTime > 0) {
          return `群成员：${member.userID}被禁言${member.muteTime}秒`
        } else {
          return `群成员：${member.userID}被取消禁言`
        }
      }
      break
    default:
      return '[群提示消息]'
  }
}