<template>
  <div class="panel-group-panel-wrapper">
    <div class="title">{{ $t("common.setup") }}</div>
    <ul class="ui-menu-vertical">
      <li
        v-for="item in list"
        :key="item.icon"
        @click="onClick(item)"
        class="menu-list"
        :class="{
          selectd: active === item.icon,
        }"
      >
        <FontIcon class="icon" :iconName="item.icon" />
        <div class="title-content">{{ item.title }}</div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { list } from "./enums";
const emit = defineEmits(["active"]);
const active = ref("");

function onClick(item) {
  active.value = item.icon;
  emit("active", item);
}
onClick(list.value[0]);

defineExpose({ onClick });
</script>

<style lang="scss" scoped>
.panel-group-panel-wrapper {
  width: 256px;
  height: 100%;
  min-width: 256px;
  flex-grow: 0;
  flex-shrink: 0;
  display: flex;
  position: relative;
  padding: 20px 0;
  flex-direction: column;
  // background-color: #fcfcfd;
  border-right: 1px solid var(--color-border-color-split);
}
.title {
  padding: 0 20px 20px 20px;
  font-size: 1.125rem;
}
.selectd {
  color: rgb(147, 115, 238);
  background-color: rgb(236, 240, 252);
}
.ui-menu-vertical {
  margin: 0 20px;
  .menu-list {
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 16px;
    &:hover .title-content {
      color: rgb(147, 115, 238);
    }
    &:hover .el-icon {
      color: rgb(147, 115, 238);
    }
  }
  .title-content {
    margin-left: 10px;
  }
}
</style>
