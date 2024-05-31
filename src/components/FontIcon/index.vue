<template>
  <el-icon v-if="iconName">
    <component :is="iconName" />
  </el-icon>
</template>

<script setup>
// elementPlus https://element-plus.gitee.io/zh-CN/component/icon.html
// <FontIcon iconName="*" />
const props = defineProps({
  iconName: {
    type: String,
    required: true,
    default: "",
  },
});
</script>

<style lang="scss" scoped></style>
