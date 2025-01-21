<template>
  <div class="w-full">
    <div class="prompt">
      <div class="header">Discover</div>
      <el-scrollbar class="h-full w-full">
        <div class="layout-body">
          <div class="layout-box">
            <el-input v-model="input" placeholder="搜索助手名称介绍或关键词..." clearable>
              <template #prefix>
                <el-icon class="el-input__icon">
                  <search />
                </el-icon>
              </template>
            </el-input>
            <div class="tags" v-if="market">
              <button
                :class="['item-tags', cur === item ? 'active' : '']"
                v-for="item in market.tags"
                :key="item"
                @click="handleClick(item)"
              >
                {{ item }}
              </button>
            </div>
            <div class="mt-20" v-else>
              <el-skeleton :rows="4" animated />
            </div>
            <div class="agent-box">
              <div class="agent-list">
                <AgentSkeleton v-if="!market" />
                <AgentCard
                  v-for="item in filterInput"
                  :key="item.identifier"
                  :agents="item"
                  @click="cardClick(item)"
                />
              </div>
            </div>
            <div
              v-show="filterInput.length"
              class="w-full py-16 flex-c text-sm/[12px] text-slate-500"
            >
              喜欢{{ VITE_APP_NAME }}？
              <a class="text-amber-600" :href="homepage" target="_blank">在 GitHub 给添加星标 </a>
              并
              <a class="text-amber-600" :href="bugs.url" target="_blank">分享您宝贵的建议 !</a>
            </div>
          </div>
        </div>
      </el-scrollbar>
      <AgentCardBanner />
    </div>
  </div>
</template>

<script setup>
import AgentSkeleton from "./AgentSkeleton.vue";
import AgentCardBanner from "./AgentCardBanner.vue";
import AgentCard from "./AgentCard.vue";
import { getPrompt } from "@/api/node-admin-api/index";
import { ref, watch, onBeforeMount } from "vue";
import emitter from "@/utils/mitt-bus";
import marketJson from "@/database/market.json";
import { localStg } from "@/utils/storage";

const { VITE_APP_NAME } = import.meta.env;
const { homepage, bugs } = __APP_INFO__.pkg;

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
.header {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 16px;
  height: 60px;
  border-block-end: 1px solid var(--color-border-default);
}

.layout-body {
  padding: 0 16px;
  width: 100%;
  display: flex;
  justify-content: center;
  height: calc(100% - 60px);
}

.layout-box {
  display: flex;
  justify-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1024px;
}

.prompt {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  align-items: center;
  background: var(--color-body-bg);
  .el-input {
    margin-top: 20px;
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
}

.agent-box {
  min-height: calc(100vh - 60px - 40px - 100px - 100px);
}

.active {
  background: var(--color-tags-active-back) !important;
  color: var(--color-tags-active) !important;
}
</style>
