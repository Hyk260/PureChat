<template>
  <div class="w-full">
    <div class="prompt">
      <div class="header">助手</div>
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
            <div class="tags">
              <button 
                :class="['item-tags', cur === item ? 'active' : '']" 
                v-for="item in market.tags" :key="item"
                @click="handleClick(item)"
              >
                {{ item }}
              </button>
            </div>
            <div class="agent-list">
              <AgentCard @click="cardClick(item)" v-for="item in filterInput" :key="item.identifier" :agents="item" />
            </div>
          </div>
        </div>
      </el-scrollbar>
      <AgentCardBanner />
    </div>
  </div>
</template>

<script setup>
import AgentCardBanner from './AgentCardBanner.vue';
import { getPrompt } from "@/api/node-admin-api/index";
import { ref, watch } from "vue";
import emitter from '@/utils/mitt-bus';
import AgentCard from "./AgentCard.vue";

const cur = ref('');
const input = ref("");
const market = ref("");
const filterInput = ref("");

function cardClick(item) {
  emitter.emit('openAgentCard',item)
}
function handleClick(key) {
  cur.value = key;
  filterInput.value = market.value.agents.filter((item) => {
    return item.meta.title.includes(key) || item.meta.tags.includes(key) || item.meta.description.includes(key);
  });
  console.log("🚀 ~ filterInput.value:", filterInput.value);
}

watch(input, (newVal) => {
  console.log("🚀 ~ newVal:", newVal);
  handleClick(newVal)
});

getPrompt().then((res) => {
  market.value = res;
  filterInput.value = res.agents;
  console.log("🚀 ~ getPrompt ~ res:", res);
});
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 16px;
  height: 60px;
  border-block-end: 1px solid #dddddd;
}

.layout-body {
  padding: 0 16px;
  width: 100%;
  display: flex;
  justify-content: center;
  height: calc(100vh - 60px);
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
  display: flex;
  flex-direction: column;
  align-content: space-between;
  align-items: center;
  background: rgb(248 248 248);

  .el-input {
    margin-top: 20px;
  }
}

.agent-list {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.tags {
  margin-top: 20px;
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  gap: 6px;

  .item-tags {
    color: rgb(8, 8, 8);
    height: 27px;
    line-height: 27px;
    border-radius: 27px;
    padding-inline-start: 13.5px;
    padding-inline-end: 13.5px;
    background: rgba(0, 0, 0, 0.03);
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;

    &:hover {
      color: #333333;
      border-color: #333333;
      background: rgba(0, 0, 0, 0.12);
    }
  }
}
.active {
  background: #222 !important;
  color: #f8f8f8 !important;
}
</style>
