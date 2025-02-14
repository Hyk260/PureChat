<template>
  <div class="discover-prompt">
    <DiscoverHeader @handleClick="handleClick" />
    <el-scrollbar class="wh-full">
      <div class="layout-body">
        <div class="layout-box">
          <TabsWrapper />
          <!-- <div class="tags" v-if="false && market">
            <button
              :class="['item-tags', cur === item ? 'active' : '']"
              v-for="item in market.tags"
              :key="item"
              @click="handleClick(item)"
            >
              {{ item }}
            </button>
          </div> -->
          <!-- <div class="mt-20" v-else>
              <el-skeleton :rows="4" animated />
            </div> -->
          <div class="agent-list">
            <AgentSkeleton v-if="!market" />
            <AgentCard
              v-for="item in filterInput"
              :key="item.identifier"
              :agents="item"
              @click="cardClick(item)"
            />
          </div>
          <!-- <StarMessage v-if="filterInput.length" /> -->
        </div>
      </div>
    </el-scrollbar>
    <AgentCardBanner />
  </div>
</template>

<script setup>
import AgentSkeleton from "./AgentSkeleton.vue";
import AgentCardBanner from "./AgentCardBanner.vue";
import AgentCard from "./AgentCard.vue";
import DiscoverHeader from "./DiscoverHeader.vue";
import TabsWrapper from "./TabsWrapper.vue";
import StarMessage from './StarMessage.vue';
import { getPrompt } from "@/api/node-admin-api/index";
import { ref, watch, onBeforeMount } from "vue";
import emitter from "@/utils/mitt-bus";
import marketJson from "@/database/market.json";
import { localStg } from "@/utils/storage";

const cur = ref("");
const input = ref("");
const market = ref(null);
const filterInput = ref("");

function cardClick(item) {
  emitter.emit("openAgentCard", item);
}

function handleClick(key) {
  if (cur.value == key) {
    cur.value = "";
    filterInput.value = market.value.agents;
    return;
  }
  cur.value = key;
  filterInput.value = market.value.agents.filter((item) => {
    return (
      item.meta.title.includes(key) ||
      item.meta.tags.includes(key) ||
      item.meta.description.includes(key)
    );
  });
}

function initPrompt() {
  if (__LOCAL_MODE__) {
    market.value = marketJson;
    filterInput.value = marketJson.agents;
    return;
  }
  const marketLocal = localStg.get("marketJson");
  if (marketLocal) {
    market.value = marketLocal;
    filterInput.value = marketLocal.agents;
  }
  getPrompt()
    .then((res) => {
      market.value = res;
      filterInput.value = res.agents;
      localStg.set("marketJson", res);
    })
    .catch(() => {
      market.value = marketJson;
      filterInput.value = marketJson.agents;
      localStg.set("marketJson", marketJson);
    });
}

watch(input, (newVal) => {
  handleClick(newVal);
});

onBeforeMount(() => {
  initPrompt();
});
</script>

<style lang="scss" scoped>
.discover-prompt {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  align-items: center;
  background: var(--color-body-bg);
  .layout-body {
    padding: 0 16px;
    width: 100%;
    display: flex;
    justify-content: center;
    height: calc(100% - 60px);
    .layout-box {
      display: flex;
      justify-items: center;
      flex-direction: column;
      width: 100%;
      max-width: 1024px;
    }
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
  padding: 20px 0;
}

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
</style>
