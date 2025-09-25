<template>
  <div class="agent-list-box">
    <!-- <div v-if="tabsKey === 'assistant'">
      <div v-if="isSkeleton" class="tags">
        <button
          v-for="item in market.tags"
          :key="item"
          class="item-tags"
          :class="[current === item ? 'active' : '']"
          @click="emit('handleClick', item)"
        >
          {{ item }}
        </button>
      </div>
      <div v-else class="mt-20 px-15">
        <el-skeleton :rows="3" animated />
      </div>
    </div> -->

    <div v-if="tabsKey === 'assistant'" class="agent-list">
      <AgentSkeleton v-if="!isSkeleton" />
      <AgentCard v-for="item in agent" v-else :key="item.identifier" :agents="item" @click="cardClick(item)" />
    </div>

    <div v-if="tabsKey === 'model_provider'" class="agent-list" style="--rows: 3">
      <ModelProviderCard v-for="item in ProvidersList" :key="item.userID" :agents="item" @click="providerClick(item)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"

import { ProvidersList } from "@database/config"
import { isEmpty } from "lodash-es"

import { useChatStore, useSidebarStore } from "@/stores"
import emitter from "@/utils/mitt-bus"

import AgentCard from "./AgentCard.vue"
import AgentSkeleton from "./AgentSkeleton.vue"
import ModelProviderCard from "./ModelProviderCard.vue"

const emit = defineEmits(["handleClick"])

const sidebarStore = useSidebarStore()
const chatStore = useChatStore()

const props = defineProps({
  current: {
    type: String,
    default: "",
  },
  market: {
    type: Object,
    default: () => {},
  },
  tabsKey: {
    type: String,
    default: "",
  },
  agent: {
    type: Array,
    default: () => [],
  },
})

const isSkeleton = computed(() => {
  return !isEmpty(props.market)
})

function cardClick(item) {
  emitter.emit("openAgentCard", item)
}

function providerClick(item) {
  sidebarStore.toggleOutside({ path: "/chat" })
  chatStore.addConversation({ sessionId: `${"C2C"}${item.userID}` })
}
</script>

<style lang="scss" scoped>
.agent-list-box {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.tags {
  margin: 15px 15px 0 15px;
  flex-wrap: wrap;
  display: flex;
  // flex-direction: column;
  gap: 6px;
  // height: 100%;
  .item-tags {
    color: var(--color-text);
    height: 27px;
    line-height: 27px;
    border-radius: 27px;
    padding-inline-start: 13.5px;
    padding-inline-end: 13.5px;
    background: var(--color-text-tags);
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    &:hover {
      color: var(--color-tags-color);
      border-color: var(--color-tags-color);
      background: var(--color-tags-back);
    }
  }
  .active {
    background: var(--color-tags-active-back) !important;
    color: var(--color-tags-active) !important;
  }
}
.agent-list {
  height: fit-content;
  --rows: 4;
  --max-item-width: 240px;
  --gap: 1em;
  display: grid !important;
  grid-template-columns: repeat(
    auto-fill,
    minmax(max(var(--max-item-width), calc((100% - var(--gap) * (var(--rows) - 1)) / var(--rows))), 1fr)
  );
  gap: 1em;
  padding: 15px;
}
</style>
