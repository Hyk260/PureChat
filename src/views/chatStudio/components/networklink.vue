<template>
  <div class="broken-links" v-show="show">
    <svg-icon iconClass="link" class="link-style" />
    <span>连接已断开</span>
  </div>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.broken-links {
  height: 34px;
  width: 100%;
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
