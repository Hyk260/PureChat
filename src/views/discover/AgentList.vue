<template>
  <div class="flex">
    <!-- <div v-if="market && tabsKey === 'assistant'" class="tags">
      <button
        :class="['item-tags', cur === item ? 'active' : '']"
        v-for="item in market.tags"
        :key="item"
        @click="emit('handleClick', item)"
      >
        {{ item }}
      </button>
    </div>
    <div class="mt-20" v-else>
      <el-skeleton :rows="4" animated />
    </div> -->
    <div class="agent-list" style="--rows: 2" v-if="tabsKey === 'model_provider'">
      <ModelProviderCard
        v-for="item in modelProvider"
        :key="item.userID"
        :agents="item"
        @click="providerClick(item)"
      />
    </div>
    <div class="agent-list" v-if="tabsKey === 'assistant'">
      <!-- <AgentSkeleton v-if="!market" /> -->
      <AgentCard
        v-for="item in agent"
        :key="item.identifier"
        :agents="item"
        @click="cardClick(item)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useSidebarStore } from "@/stores/modules/sidebar/index";
import { useStore } from "vuex";
import modelProvider from "@/database/bot.json";
import AgentCard from "./AgentCard.vue";
import ModelProviderCard from "./ModelProviderCard.vue";
import AgentSkeleton from "./AgentSkeleton.vue";
import emitter from "@/utils/mitt-bus";

const emit = defineEmits(["handleClick"]);
const { dispatch } = useStore();

const sidebarStore = useSidebarStore();

const props = defineProps({
  cur: {
    type: null || String,
    default: null,
  },
  market: {
    type: null || Object,
    default: null,
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

function cardClick(item) {
  emitter.emit("openAgentCard", item);
}

function providerClick(item) {
  sidebarStore.taggleOueSide({ path: "/chat" });
  dispatch("addConversation", { convId: `${"C2C"}${item.userID}` });
}
</script>

<style lang="scss" scoped>
.tags {
  margin-top: 20px;
  flex-wrap: wrap;
  display: flex;
  flex-direction: column;
  gap: 6px;
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
  padding: 20px 16px;
}
</style>
