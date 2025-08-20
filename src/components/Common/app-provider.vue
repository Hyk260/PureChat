<template>
  <div class="h-full">
    <ContextHolder />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { createTextVNode, defineComponent } from "vue";
import { useClipboard } from "@vueuse/core";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";

defineOptions({ name: "AppProvider" });

const { copy, isSupported } = useClipboard();

const ContextHolder = defineComponent({
  name: "ContextHolder",
  setup() {
    function register() {
      window.$notification = ElNotification;
      window.$messageBox = ElMessageBox;
      window.$message = ElMessage;
    }

    function copyToClipboard(str: string) {
      if (isSupported) {
        copy(str);
        ElMessage.success("复制成功");
      } else {
        ElMessage.warning("您的浏览器不支持剪贴板API");
      }
    }

    window.copyToClipboard = copyToClipboard;

    register();

    return () => createTextVNode();
  },
});
</script>

<style scoped></style>
