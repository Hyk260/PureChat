<template>
  <span :class="['label', labelClass()]">
    <span class="all" v-if="isallStaff(item)">全员</span>
    <svg-icon iconClass="robot" v-else-if="isRobot(userID)" />
    <span class="model" v-if="isRobot(userID) && model">{{ model }}</span>
  </span>
</template>

<script setup>
import { isRobot } from "@/utils/chat/index";
import { isallStaff } from "../utils/utils";

const props = defineProps({
  userID: {
    type: String,
    default: "",
  },
  item: {
    type: Object,
    default: () => {},
  },
  model: {
    type: String,
    default: "",
  },
});

const labelClass = (data) => {
  return "";
};
</script>

<style lang="scss" scoped>
.label {
  text-align: center;
  border-radius: 2px;
  font-size: 10px;
  font-weight: 400;
  svg {
    stroke: unset;
  }
  .model {
    margin-left: 5px;
  }
  .all,
  .model {
    white-space: nowrap;
    background: #e6f7ff;
    border: 1px solid rgb(145, 213, 255);
    color: #1890ff;
    border-radius: 2px;
    font-size: 10px;
    padding: 0 4px;
    display: inline-block;
    line-height: initial;
    height: 16px;
  }
}
</style>
