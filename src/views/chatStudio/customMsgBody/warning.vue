<template>
  <div class="warning flex items-center">
    <el-icon><Warning /></el-icon>
    <span> API Key 不正确或为空，请检查 API Key 后重试</span>
    <span class="cursor-pointer ml-4 text-[#0072f5]" @click="openRobotBox()"> [配置] </span>
    <span class="cursor-pointer ml-4 text-[#0072f5]" @click="jumpLink()"> [文档] </span>
  </div>
</template>

<script setup>
import { openWindow } from "@/utils/common";
import { modelValue } from "@/ai/constant";
import emitter from "@/utils/mitt-bus";

defineOptions({
  name: "Warning",
});

const props = defineProps({
  payload: {
    type: Object,
    default: null,
  },
});
function openRobotBox() {
  emitter.emit("onRobotBox", { ApiKeyFocus: true });
}
function jumpLink() {
  const url = getDoubt(props.payload);
  openWindow(url);
}
function getDoubt(payload) {
  try {
    const provider = JSON.parse(payload.data).data.body.text.provider;
    let doubt = modelValue[provider].Token.doubt;
    return doubt;
  } catch (error) {
    console.log(error);
    return "";
  }
}
</script>

<style lang="scss" scoped>
.warning {
  font-size: 12px;
  color: #e6a23c;
  background-color: rgb(252.5, 245.7, 235.5);
  min-height: 36px;
  padding: 0 8px;
  border-radius: 3px;
  .el-icon {
    margin: 0 5px;
  }
}
</style>
