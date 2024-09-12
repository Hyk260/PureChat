<template>
  <div class="desktop-crad" @click="onClick(station)">
    <div v-if="station" class="container animate__animated" :class="fnStyle()">
      <el-icon class="close" @click.stop="onClose"><Close /></el-icon>
      <img class="size-50" :src="icon()" alt="" />
      <div class="flex">
        <div class="ml-5 text-sm">
          {{ extra.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { cloneDeep } from "lodash-es";

const tip = "有人提到了你";
const station = ref(null);
const extra = ref(null);
const mode = "enter"; // enter leave

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
  window.notification.doClick(dody || {});
}

function onClose() {
  console.log("close");
  window.notification.close();
}

function fnStyle(t = mode) {
  switch (t) {
    case "enter":
      return "animate__fadeInRightBig";
    case "leave":
      return "animate__bounceOutRight";
    default:
      return "";
  }
}
</script>

<style lang="scss" scoped>
.close {
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
}
.desktop-crad {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  border-radius: 4px;
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
  box-shadow: var(--el-box-shadow-lighter);
  border: 1px solid var(--color-border-default);
  img {
    border-radius: 4px;
  }
}
</style>
