<template>
  <span :class="['label', labelClass()]">
    <span class="all" v-if="isFullStaffGroup(item)">全员</span>
    <span class="author" v-else-if="isAuthor(item)">作者</span>
    <SvgIcon local-icon="robot" v-else-if="isRobot(userID)" />
    <span class="model" v-if="isRobot(userID) && model">
      <svg-icon v-if="model.icon" :local-icon="model.icon" />
      <svg-icon v-else :local-icon="getModelSvg(userID.replace('C2C', ''))" />
      <span>{{ model.id }}</span>
    </span>
  </span>
</template>

<script setup>
import { isRobot } from "@/utils/chat/index";
import { getValueByKey, prefix, isFullStaffGroup } from "@/ai/utils";
import { getModelSvg } from "@/ai/utils";

defineOptions({
  name: "Label",
});

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
    type: Object,
    default: () => {},
  },
});

const isAuthor = (data) => {
  return getValueByKey(data?.groupProfile?.groupCustomField, prefix("Role")) === "author";
};

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
  display: flex;
  align-items: center;

  svg {
    stroke: unset;
  }

  .model {
    margin-left: 5px;
  }

  .all,
  .model,
  .author,
  .role-title {
    white-space: nowrap;
    background: #e6f7ff;
    border: 0.64px solid rgb(145, 213, 255);
    color: #1890ff;
    border-radius: 2px;
    font-size: 12px;
    padding: 0 5px;
    height: 18px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
}
</style>
