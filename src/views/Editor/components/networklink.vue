<template>
  <div class="broken-links" v-if="show">
    <svg-icon iconClass="link" class="link-style" />
    <span>连接已断开</span>
  </div>
  <!-- <div style="height: 34px"></div> -->
</template>

<script setup>
import { defineProps, toRefs } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  }
});
const { show } = toRefs(props)
// console.log(props.show)
// console.log(show)
</script>

<style lang="scss" scoped>
.broken-links {
  height: 34px;
  width: 100%;
  // position: absolute;
  // top: 0;
  // z-index: 1;
  background: rgba(243, 218, 178);
  line-height: 34px;
  text-align: center;
  color: #c0843d;
}
.link-style {
  font-size: 14px;
  margin-right: 10px;
}
</style>
