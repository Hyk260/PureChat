<template>
  <div class="panel-wrapper flex flex-col">
    <div class="title">{{ $t("common.setup") }}</div>
    <ul class="menu-list">
      <li
        v-for="item in list"
        :key="item.id"
        class="menu-item"
        :class="{
          'menu-item--active': activeId === item.id,
        }"
        @click="handleItemClick(item)"
      >
        <el-icon v-if="item.icon">
          <component :is="item.icon" />
        </el-icon>
        <SvgIcon v-else :local-icon="item.svg_icon" />
        <div class="menu-item__title">{{ item.title }}</div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { list } from "./enums";

const activeId = ref(list.value[0].id);

const emit = defineEmits(["active"]);

function handleItemClick(item) {
  activeId.value = item.id;
  emit("active", item);
}

defineExpose({ handleItemClick });
</script>

<style lang="scss" scoped>
.panel-wrapper {
  position: relative;
  width: 256px;
  min-width: 256px;
  height: 100%;
  flex: 0 0 auto;
  padding: 20px 0;
  border-right: 1px solid var(--color-border-color-split);
  .title {
    padding: 0 20px 20px;
    font-size: 1.125rem;
  }
  .menu-list {
    margin: 0 20px;
    list-style: none;
    padding: 0;
  }
  .menu-item {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    &__title {
      margin-left: 10px;
    }
    &--active {
      color: rgb(114, 184, 249);
      background-color: var(--color-message-active);
    }
  }
}

// .panel-wrapper {
//   position: relative;
//   width: 256px;
//   height: 100%;
//   min-width: 256px;
//   flex-grow: 0;
//   flex-shrink: 0;
//   padding: 20px 0;
//   border-right: 1px solid var(--color-border-color-split);
// }
// .title {
//   padding: 0 20px 20px 20px;
//   font-size: 1.125rem;
// }
// .select {
//   color: rgb(114, 184, 249);
//   background-color: var(--color-message-active);
// }
// .ui-menu-vertical {
//   margin: 0 20px;
//   .menu-list {
//     border-radius: 4px;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     height: 40px;
//     padding: 0 16px;
//   }
//   .title-content {
//     margin-left: 10px;
//   }
// }
</style>
