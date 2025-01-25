<template>
  <div class="tabs">
    <div class="tabs-nav">
      <div class="tabs-rail">
        <div class="tabs-capsule" :style="fnStyle()"></div>
        <template v-for="(tab, index) in tabs" :key="tab.id">
          <div
            class="tabs-tab-wrapper"
            :ref="setRefs"
            :class="{ active: activeTab === index }"
            @click="setActiveTab(index, tab.id)"
          >
            <div class="tabs-tab">
              <span class="tabs-tab__label">
                {{ tab.name }}
              </span>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, computed, watch, useTemplateRef, nextTick, onMounted } from "vue";
import emitter from "@/utils/mitt-bus";
// 定义选项卡数据
const tabs = [
  { id: 1, name: "好友" },
  { id: 2, name: "群聊" },
];
// 当前激活的选项卡索引
const activeTab = ref(0);

// 当前高亮 capsule 的位置
const activeTabPosition = ref(0);

// 标签宽度
const tabWidth = ref(0);
// 在 mount 时计算单个标签宽度
const tabRefs = ref([]); // 存储每个 tab 的 DOM 引用

const setRefs = (el) => {
  if (el) {
    tabRefs.value.push(el);
  }
};

const fnStyle = () => {
  return {
    transform: `translateX(${activeTabPosition.value}px)`,
    width: `${tabWidth.value}px`,
  };
};

// 用于更新激活标签索引和 capsule 位置
const setActiveTab = (index, id) => {
  activeTab.value = index;
  emitter.emit('handleActiveTab', id)
  calculateTabPosition(index);
};

// 计算 capsule 的动态位置
const calculateTabPosition = (index) => {
  activeTabPosition.value = index * tabWidth.value;
};

onMounted(() => {
  // 保证 DOM 渲染完成后测量元素宽度
  nextTick(() => {
    if (tabRefs.value.length > 0) {
      // 假设每个 tab 宽度一致
      const firstTab = tabRefs.value[0];
      tabWidth.value = firstTab.getBoundingClientRect().width;

      // 初始化时计算 capsule 的位置
      calculateTabPosition(activeTab.value);
    }
  });
});
</script>

<style lang="scss" scoped>
.tabs {
  --color-segment: rgb(247, 247, 250);
  --tab-border-radius: 3px;
  --bezier: cubic-bezier(0.4, 0, 0.2, 1);
  --tab-text-color: rgb(31, 34, 37);
  --tab-padding: 6px 0;
  --tab-font-size: 14px;
  --tab-color-segment: #fff;
  width: 100%;
  .tabs-nav {
    box-sizing: border-box;
    line-height: 1.5;
    display: flex;
    transition: border-color 0.3s var(--bezier);
  }
  .tabs-rail {
    position: relative;
    padding: 3px;
    border-radius: var(--tab-border-radius);
    width: 100%;
    background-color: var(--color-segment);
    transition: background-color 0.3s var(--bezier);
    display: flex;
    align-items: center;
    .tabs-tab-wrapper {
      flex-basis: 0;
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      .tabs-tab {
        overflow: hidden;
        border-radius: var(--tab-border-radius);
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .tabs-capsule {
      border-radius: var(--tab-border-radius);
      position: absolute;
      pointer-events: none;
      background-color: var(--tab-color-segment);
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
      transition: transform 0.3s var(--bezier);
      height: 33px;
    }
  }
  .tabs-tab-wrapper {
    display: flex;
    flex-wrap: nowrap;
    flex-shrink: 0;
    flex-grow: 0;
  }
  .tabs-tab {
    cursor: pointer;
    white-space: nowrap;
    flex-wrap: nowrap;
    display: inline-flex;
    align-items: center;
    color: var(--tab-text-color);
    font-size: var(--tab-font-size);
    background-clip: padding-box;
    padding: var(--tab-padding);
    transition:
      box-shadow 0.3s var(--bezier),
      color 0.3s var(--bezier),
      background-color 0.3s var(--bezier),
      border-color 0.3s var(--bezier);

    .tabs-tab__label {
      display: flex;
      align-items: center;
      z-index: 1;
    }
  }
}
</style>
