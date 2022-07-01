<script setup>
  import { ref, onMounted } from 'vue'
  const dragControllerDiv =() => {
          var svgResize = document.getElementById("svgResize");
          var svgTop = document.getElementById("svgTop");
          var svgDown = document.getElementById("svgDown");
          var svgBox = document.getElementById("svgBox");
          svgResize.onmousedown = function(e){
            var startY = e.clientY;
            svgResize.top = svgResize.offsetTop;
            document.onmousemove = function(e){
              var endY = e.clientY;
              var moveLen = svgResize.top + (endY - startY);
              var maxT = svgBox.clientHeight - svgResize.offsetHeight;
              if(moveLen<200) moveLen = 200;
              if(moveLen>maxT-200) moveLen = maxT-200;
              svgResize.style.top = moveLen;
              svgTop.style.height = moveLen + "px";
              svgDown.style.height = (svgBox.clientHeight - moveLen - 5) + "px";
            }
            document.onmouseup = function(evt){
              document.onmousemove = null;
              document.onmouseup = null;
              svgResize.releaseCapture && svgResize.releaseCapture();
            }
            svgResize.setCapture && svgResize.setCapture();
            return false;
          }
  }
</script>

<template>
 <div id="svgBox">
        <div id="svgTop">
          <svg width="100%" id="controllerSvg"></svg>
        </div>
        <div id="svgResize" @mouseover="dragControllerDiv"></div>
        <div id="svgDown" style="border-top: 1px solid #b5b9a9; ">
          <svg width="100%" height="auto" id="serverSvg"></svg>
        </div>
      </div>
</template>

<style lang="scss" scoped>
 #svgBox{
    width:100%;
    height:100%;
    position: relative;
    overflow:hidden;
  }
  #svgTop{
    height:calc(30% - 5px);
    width:100%;
    float:left;
    overflow: auto;
  }

  #svgResize{
    position: relative;
    height:5px;
    width:100%;
    cursor: s-resize;
    float:left;
  }

  #svgDown{
    height:70%;
    width:100%;
    float:left;
    overflow: hidden;
  }
</style>