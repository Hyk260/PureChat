<template>
  <div class="panel-wrapper flex flex-col">
    <div class="title">{{ $t("common.setup") }}</div>
    <ul class="ui-menu-vertical">
      <li
        v-for="item in list"
        :key="item.id"
        @click="onClick(item)"
        class="menu-list"
        :class="{
          select: active === item.id,
        }"
      >
        <FontIcon v-if="item.icon" class="icon" :iconName="item.icon" />
        <SvgIcon v-else class="icon" :local-icon="item.svg_icon" />
        <div class="title-content">{{ item.title }}</div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useState } from "@/utils/hooks/index";
import { list } from "./enums";

const [active,setActive] = useState(list.value[0]);

const emit = defineEmits(["active"]);

function onClick(item) {
  setActive(item.id);
  emit("active", item);
}

onClick(list.value[0]);

defineExpose({ onClick });
</script>

<style lang="scss" scoped>
.panel-wrapper {
  position: relative;
  width: 256px;
  height: 100%;
  min-width: 256px;
  flex-grow: 0;
  flex-shrink: 0;
  padding: 20px 0;
  border-right: 1px solid var(--color-border-color-split);
}
.title {
  padding: 0 20px 20px 20px;
  font-size: 1.125rem;
}
.select {
  color: rgb(114, 184, 249);
  background-color: var(--color-message-active);
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
  }
  .title-content {
    margin-left: 10px;
  }
}
</style>
