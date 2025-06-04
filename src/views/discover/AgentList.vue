<template>
  <div class="agent-list-box">
    <div v-if="tabsKey === 'assistant'">
      <div v-if="isSkeleton" class="tags">
        <button
          :class="['item-tags', current === item ? 'active' : '']"
          v-for="item in market.tags"
          :key="item"
          @click="emit('handleClick', item)"
        >
          {{ item }}
        </button>
      </div>
      <div class="mt-20 px-15" v-else>
        <el-skeleton :rows="3" animated />
      </div>
    </div>

    <div class="agent-list" v-if="tabsKey === 'assistant'">
      <AgentSkeleton v-if="!isSkeleton" />
      <AgentCard
        v-else
        v-for="item in agent"
        :key="item.identifier"
        :agents="item"
        @click="cardClick(item)"
      />
    </div>

    <div class="agent-list" style="--rows: 2" v-if="tabsKey === 'model_provider'">
      <ModelProviderCard
        v-for="item in ProvidersList"
        :key="item.userID"
        :agents="item"
        @click="providerClick(item)"
      />
    </div>
  </div>
</template>

<script setup>
import { useSidebarStore, useChatStore } from "@/stores/index";
import { ProvidersList } from "@database/config";
import { isEmpty } from "lodash-es";
import AgentCard from "./AgentCard.vue";
import ModelProviderCard from "./ModelProviderCard.vue";
import AgentSkeleton from "./AgentSkeleton.vue";
import emitter from "@/utils/mitt-bus";

const emit = defineEmits(["handleClick"]);

const sidebarStore = useSidebarStore();
const chatStore = useChatStore();

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
});

const isSkeleton = computed(() => {
  return !isEmpty(props.market);
});

function cardClick(item) {
  emitter.emit("openAgentCard", item);
}

function providerClick(item) {
  sidebarStore.toggleOutside({ path: "/chat" });
  chatStore.addConversation({ sessionId: `${"C2C"}${item.userID}` });
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
  --rows: 3;
  --max-item-width: 240px;
  --gap: 1em;
  display: grid !important;
  grid-template-columns: repeat(
    auto-fill,
    minmax(
      max(var(--max-item-width), calc((100% - var(--gap) * (var(--rows) - 1)) / var(--rows))),
      1fr
    )
  );
  gap: 1em;
  padding: 15px;
}
</style>
