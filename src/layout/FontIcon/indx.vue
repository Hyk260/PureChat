<template>
  <el-icon :size="size" :color="color" class="style-icon" v-if="iconName">
    <component :is="iconName" />
  </el-icon>
</template>

<script setup>
import { toRefs } from "vue";
// eslint-disable-next-line no-undef
const props = defineProps({
  // elementPlus https://element-plus.gitee.io/zh-CN/component/icon.html
  // <FontIcon iconName="***" />
  iconName: {
    type: String,
    required: true,
    default: "",
  },
  color: {
    type: String,
    default: "#303133",
  },
  custom: {
    type: String,
    default: "",
  },
  size: {
    type: Number,
    default: 18,
  },
});
const { iconName, size, color } = toRefs(props);
</script>

<style lang="scss" scoped>
.style-icon {
  color: var(--color-text);
}
.el-icon {
  cursor: pointer;
}
.fold-menu-custom {
  cursor: pointer;
  color: "#409EFC";
}
</style>
