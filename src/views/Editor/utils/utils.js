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
      resp = "message-view__text";
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
export const fncopy = (data) => {
  let { message_elem_array } = data || {};
  let { elem_type: type, text_elem_content: content } = message_elem_array[0];
  // 文本
  if (type === 0) {
    console.log(content)
  }
};