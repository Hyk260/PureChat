<template>
  <div class="broken-links" v-show="show">
    <svg-icon iconClass="link" class="link-style" />
    <span>连接已断开</span>
  </div>
</template>

<script setup>
import { toRefs } from "vue";

// eslint-disable-next-line no-undef
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});
const { show } = toRefs(props);
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
