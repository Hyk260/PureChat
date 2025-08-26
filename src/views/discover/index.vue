<template>
  <div class="discover-prompt">
    <DiscoverHeader @handle-click="handleClick" />
    <el-scrollbar class="wh-full">
      <div class="layout-body">
        <div class="layout-box">
          <TabsWrapper @handle-tabs="handleTabs" />
          <AgentList
            :agent="agent"
            :market="market"
            :current="current"
            :tabs-key="tabsKey"
            @handle-click="handleClick"
          />
          <StarMessage v-if="agent.length" />
        </div>
      </div>
    </el-scrollbar>
    <AgentCardBanner />
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { getPrompt } from "@/service/api";
import { localStg } from "@/utils/storage";
import { options } from "./utils";
import { marketJson } from "@database/market";
import AgentList from "./AgentList.vue";
import AgentCardBanner from "./AgentCardBanner.vue";
import DiscoverHeader from "./DiscoverHeader.vue";
import TabsWrapper from "./TabsWrapper.vue";
import StarMessage from "./StarMessage.vue";

const agent = ref([]);
const market = ref({});
const current = ref("");
const tabsKey = ref(options[0].value);
const marketLocal = localStg.get("marketJson");
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function handleTabs(key) {
  tabsKey.value = key;
}

function handleClick(key) {
  current.value = current.value === key ? "" : key;
  if (current.value === key) {
    agent.value = market.value.agents.filter((item) => {
      return (
        item.meta.title.includes(key) ||
        item.meta.tags.includes(key) ||
        item.meta.description.includes(key)
      );
    });
  } else {
    agent.value = market.value.agents;
  }
}

function setMarketData(data) {
  market.value = data;
  agent.value = data.agents;
}

async function initPrompt() {
  if (__LOCAL_MODE__) {
    setMarketData(marketJson);
    return;
  }

  if (marketLocal) {
    setMarketData(marketLocal);
  }

  try {
    const res = await getPrompt();
    // await delay(1000)
    setMarketData(res);
    localStg.set("marketJson", res);
  } catch (error) {
    console.error("Failed to fetch prompt:", error);
    setMarketData(marketJson);
    localStg.set("marketJson", marketJson);
  }
}

onBeforeMount(initPrompt);
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
    height: calc(100% - 60px);
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
