<template>
  <div class="agent-list">
    <!-- <div class="tags" v-if="market">
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
    <!-- <AgentSkeleton v-if="!market" /> -->
    <ModelProviderCard
      v-if="tabsKey === 'model_provider'"
      v-for="item in modelProvider"
      :key="item.userID"
      :agents="item"
      @click="providerClick(item)"
    />
    <AgentCard
      v-if="tabsKey === 'assistant'"
      v-for="item in agent"
      :key="item.identifier"
      :agents="item"
      @click="cardClick(item)"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import modelProvider from "@/database/bot.json";
import AgentCard from "./AgentCard.vue";
import ModelProviderCard from "./ModelProviderCard.vue";
import AgentSkeleton from "./AgentSkeleton.vue";
import emitter from "@/utils/mitt-bus";
import { useStore } from "vuex";

const emit = defineEmits(["handleClick"]);
const { commit, dispatch } = useStore();

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
  commit("taggleOueSide", "chat");
  dispatch("addConversation", { convId: `${"C2C"}${item.userID}` });
}
</script>

<style lang="scss" scoped>
.tags {
  margin-top: 20px;
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
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
