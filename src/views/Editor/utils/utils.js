export const dragControllerDiv = () => {
  let svgResize = document.getElementById("svgResize"); // 滑块
  let svgTop = document.getElementById("svgTop"); //聊天框
  let svgDown = document.getElementById("svgDown"); //编辑器
  let svgBox = document.getElementById("svgBox");
  // 按下鼠标执行
  svgResize.onmousedown = (e) => {
    let startY = e.clientY; //鼠标按下 起始Y
    svgResize.top = svgResize.offsetTop;
    // 事件会在鼠标指针移到指定的对象时发生。
    document.onmousemove = function (e) {
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
    };
    svgResize.setCapture && svgResize.setCapture();
    return false;
  };
};