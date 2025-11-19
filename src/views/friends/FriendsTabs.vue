<template>
  <div class="tabs">
    <div class="tabs-nav">
      <div class="tabs-rail">
        <div class="tabs-capsule" :style="capsuleStyle"></div>
        <div
          v-for="(tab, index) in TABS"
          :key="tab.key"
          :ref="(el) => setTabRef(el, index)"
          class="tabs-tab-wrapper"
          :class="{ active: activeTab === index }"
          @click="handleTabClick(index, tab.key)"
        >
          <div class="tabs-tab">
            <span class="tabs-tab__label">{{ tab.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import emitter from "@/utils/mitt-bus"

const TABS = [
  { key: "friend", label: "好友" },
  { key: "group", label: "群聊" },
]

const activeTab = ref(0)
const activeTabPosition = ref(0)
const tabWidth = ref(0)
const tabRefs = ref(Array(TABS.length).fill(null))

const capsuleStyle = computed(() => ({
  transform: `translateX(${activeTabPosition.value}px)`,
  width: `${tabWidth.value}px`,
}))

const setTabRef = (el: Element | null, index: number) => {
  if (el) {
    tabRefs.value[index] = el
  }
}

const handleTabClick = (index: number, key: string) => {
  activeTab.value = index
  activeTabPosition.value = index * tabWidth.value
  emitter.emit("handleActiveTab", key)
}

onMounted(async () => {
  await nextTick()
  const firstTab = tabRefs.value[0]
  if (firstTab) {
    tabWidth.value = firstTab.getBoundingClientRect().width
    activeTabPosition.value = activeTab.value * tabWidth.value
  }
})
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

  &-nav {
    display: flex;
    transition: border-color 0.3s var(--bezier);
  }

  &-rail {
    position: relative;
    padding: 3px;
    border-radius: var(--tab-border-radius);
    width: 100%;
    background-color: var(--color-segment);
    transition: background-color 0.3s var(--bezier);
    display: flex;
    align-items: center;
  }

  &-capsule {
    position: absolute;
    border-radius: var(--tab-border-radius);
    height: 28px;
    background-color: var(--tab-color-segment);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
    transition: transform 0.3s var(--bezier);
    pointer-events: none;
  }

  &-tab {
    cursor: pointer;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--tab-text-color);
    font-size: var(--tab-font-size);
    padding: var(--tab-padding);
    border-radius: var(--tab-border-radius);
    transition: all 0.3s var(--bezier);

    &-wrapper {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__label {
      display: flex;
      align-items: center;
      z-index: 1;
    }
  }
}
</style>
