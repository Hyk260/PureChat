<template>
  <el-icon :size="props.size">
    <component :is="props.iconName">
    </component>
  </el-icon>
</template>

<script setup>
const props = defineProps({
  // elementPlus https://element-plus.gitee.io/zh-CN/component/icon.html
  iconName: {
    type: String,
    default: 'Pouring',
  },
  custom: {
    type: String,
    default: '',
    // required:true,
  },
  size: {
    type: Number,
    default: 18,
  },
})
</script>

<style lang="scss" scoped>
.el-icon {
  cursor: pointer;
}
.fold-menu-custom {
  cursor: pointer;
  color: '#409EFC';
}
</style>