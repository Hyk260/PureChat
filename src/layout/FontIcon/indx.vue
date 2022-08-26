<template>
  <el-icon :size="size" v-if="iconName">
    <component :is="iconName" />
  </el-icon>
</template>

<script setup>
import { toRefs } from "vue";
const props = defineProps({
  // elementPlus https://element-plus.gitee.io/zh-CN/component/icon.html
  // <FontIcon iconName="***" />
  iconName: {
    type: String,
    required: true,
    default: "",
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
const { iconName, size } = toRefs(props);
</script>

<style lang="scss" scoped>
.el-icon {
  cursor: pointer;
}
.fold-menu-custom {
  cursor: pointer;
  color: "#409EFC";
}
</style>
