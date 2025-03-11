<template>
  <div class="desktop-crad" @click="onClick(station)">
    <div v-if="station" class="container animate__animated animate__faster" :class="mode">
      <el-icon class="close" @click.stop="onClose"><Close /></el-icon>
      <img class="avatar" :src="icon()" alt="" />
      <div class="right">
        <div>
          {{ extra.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ElIcon } from "element-plus";
import { Close } from "@element-plus/icons-vue";
import { cloneDeep } from "lodash-es";
import "element-plus/dist/index.css";
import "animate.css";

const station = ref(null);
const extra = ref(null);
const mode = ref("animate__fadeInRight");

window.addEventListener("notification-message", (e) => {
  const { title, body, icon, extraData } = e.detail;
  station.value = body;
  extra.value = e.detail;
  console.log("message:", e.detail);
});

function icon() {
  const icon = station.value.avatar || `${import.meta.env.VITE_CLOUD_BASE_URL}log.png`;
  return icon;
}

function onClick(data = {}) {
  console.log(window);
  console.log("click", data);
  const dody = cloneDeep(data);
  mode.value = "animate__zoomOutRight";
  setTimeout(() => {
    window.notification.doClick(dody || {});
  }, 500);
}

function onClose() {
  console.log("close");
  mode.value = "animate__zoomOutRight";
  setTimeout(() => {
    window.notification.close();
  }, 500);
}
</script>

<style lang="scss" scoped>
.desktop-crad {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  border-radius: 4px;
  .avatar {
    width: 50px;
    height: 50px;
  }
  .right {
    display: flex;
    div {
      margin-left: 5px;
    }
  }
  .container {
    border-radius: 4px;
    background: #fff;
    height: 100%;
    width: 100%;
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-shadow: #fff;
    border: 1px solid #d0d7de;
    .close {
      position: absolute;
      top: 8px;
      right: 8px;
      cursor: pointer;
    }
    img {
      border-radius: 4px;
    }
  }
}
</style>
