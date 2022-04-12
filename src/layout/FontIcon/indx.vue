<template>
  <!-- <div class="nav-header"> -->
    <el-icon :size="18">
      <component class="fold-menu-custom" :is="props.iconName">
      </component>
    </el-icon>
  <!-- </div> -->
</template>

<script setup>
  const props = defineProps({
    // elementPlus https://element-plus.gitee.io/zh-CN/component/icon.html
    iconName: {
      type: String,
      default:'Place'
    },
  });

</script>

<style lang="scss" scoped>
// .fold-menu {
//   cursor: pointer;
// }
.fold-menu-custom { 
  cursor: pointer;
  color: "#409EFC";
}

</style>