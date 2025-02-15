<template>
  <div class="discover-prompt">
    <DiscoverHeader @handleClick="handleClick" />
    <el-scrollbar class="wh-full">
      <div class="layout-body">
        <div class="layout-box">
          <TabsWrapper @handleTabs="handleTabs" />
          <AgentList
            :cur="cur"
            :agent="agent"
            :market="market"
            :tabsKey="tabsKey"
            @handleClick="handleClick"
          />
          <!-- <StarMessage v-if="agent.length" /> -->
        </div>
      </div>
    </el-scrollbar>
    <AgentCardBanner />
  </div>
</template>

<script setup>
import { ref, watch, onBeforeMount } from "vue";
import AgentList from "./AgentList.vue";
import AgentCardBanner from "./AgentCardBanner.vue";
import DiscoverHeader from "./DiscoverHeader.vue";
import TabsWrapper from "./TabsWrapper.vue";
import StarMessage from "./StarMessage.vue";
import emitter from "@/utils/mitt-bus";
import marketJson from "@/database/market.json";
import { getPrompt } from "@/api/node-admin-api/index";
import { localStg } from "@/utils/storage";
import { options } from './utils.js';

const cur = ref("");
const agent = ref("");
const tabsKey = ref(options[0].value);
const market = ref(null);

function handleTabs(key) {
  tabsKey.value = key;
}

function handleClick(key) {
  if (cur.value === key) {
    cur.value = "";
    agent.value = market.value.agents;
  } else {
    cur.value = key;
    agent.value = market.value.agents.filter((item) => {
      return (
        item.meta.title.includes(key) ||
        item.meta.tags.includes(key) ||
        item.meta.description.includes(key)
      );
    });
  }
}

function initPrompt() {
  if (__LOCAL_MODE__) {
    market.value = marketJson;
    agent.value = marketJson.agents;
    return;
  }
  const marketLocal = localStg.get("marketJson");
  if (marketLocal) {
    market.value = marketLocal;
    agent.value = marketLocal.agents;
  }
  getPrompt()
    .then((res) => {
      market.value = res;
      agent.value = res.agents;
      localStg.set("marketJson", res);
    })
    .catch(() => {
      market.value = marketJson;
      agent.value = marketJson.agents;
      localStg.set("marketJson", marketJson);
    });
}

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
    width: 100%;
    display: flex;
    justify-content: center;
    .layout-box {
      display: flex;
      justify-items: center;
      flex-direction: column;
      width: 100%;
      max-width: 1024px;
    }
  }
}
</style>
