<template>
  <div class="menubar">
    <div class="flex">
      <div class="menubar-item flex-c" v-for="item in list" :key="item.id">
        <FontIcon :iconName="item.icon" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { isSelf } from "../utils/utils";

const props = defineProps({
  item: {
    type: Object,
    default: null,
  },
});

const list = [
  {
    id: 1,
    title: "编辑",
    icon: "Edit",
    // <el-icon><Edit /></el-icon>
  },
  {
    id: 2,
    title: "复制",
    icon: "CopyDocument",
    // <el-icon><CopyDocument /></el-icon>
  },
  {
    id: 3,
    title: "设置",
    icon: "MoreFilled",
    // <el-icon><MoreFilled /></el-icon>
  },
];
</script>

<style lang="scss" scoped>
.menubar {
  font-size: 12px;
  height: 100%;
  display: flex;
  align-items: flex-end;
  // pointer-events: none;
  opacity: 0;
  transition: opacity 200ms cubic-bezier(0.215, 0.61, 0.355, 1);
  & > div {
    background-color: rgba(0, 0, 0, 0.015);
    border: 1px solid var(--color-border-default);
    border-radius: 5px;
    padding: 2px;
  }
  .menubar-item {
    cursor: pointer;
    color: #999999;
    border-radius: 5px;
    height: 22px;
    width: 22px;
    &:hover {
      color: #080808;
      background-color: rgba(0, 0, 0, 0.06);
    }
  }
}
</style>
