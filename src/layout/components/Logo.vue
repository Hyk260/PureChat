<template>
  <div class="logo" v-if="show">
    <router-link :title="title" class="sidebar-logo-link" to="/">
      <FontIcon iconName="Monitor" style="width: 35px; height: 35px" /> 
      <span class="sidebar-title" v-if="!collapse">{{ title }}</span>
    </router-link>
  </div>
</template>

<script setup>
import { toRefs } from "vue";
import FontIcon from "@/layout/FontIcon/indx.vue";

const { title } = require("@/config/vue.custom.config");
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  collapse: {
    type: Boolean,
    default: false,
  },
});
const { show, collapse } = toRefs(props);
</script>

<style lang="scss" scoped>
.logo {
  position: relative;
  width: 100%;
  height: 48px;
  overflow: hidden;
  border-right: 1px solid #e8e8e8;
  // background: #002140;
  // text-align: center;
  // line-height: 48px;
}
.sidebar-logo-link {
  height: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  // margin-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  .sidebar-title {
    color: #1890ff;
    font-weight: 600;
    font-size: 20px;
    // margin-top: 10px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
  }
}
</style>
