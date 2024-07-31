<template>
  <div class="desktop-crad" @click="onClick(station)">
    <div v-if="station" class="container animate__animated">
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
  box-shadow: var(--el-box-shadow-lighter);
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
  img {
    border-radius: 4px;
  }
}
</style>
