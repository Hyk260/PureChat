<template>
  <div class="w-full">
    <div class="prompt">
      <div class="header">助手</div>
      <div class="layout-box">
        <el-input v-model="input" placeholder="搜索助手名称介绍或关键词..." clearable>
          <template #prefix>
            <el-icon class="el-input__icon"><search /></el-icon>
          </template>
        </el-input>
        <div class="tags">
          <button class="item-tags" v-for="item in market.tags" :key="item">
            {{ item }}
          </button>
        </div>
        <div>
          <AgentCard v-for="item in market.agents" :key="item.identifier" :agents="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getPrompt } from "@/api/node-admin-api/index";
import { ref } from "vue";
import AgentCard from "./AgentCard";
const input = ref("");
const market = ref("");

getPrompt().then((res) => {
  market.value = res;
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
.layout-box {
  display: flex;
  justify-items: center;
  flex-direction: column;
  width: 1024px;
  max-width: 1024px;
}
.prompt {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  align-items: center;
  .el-input {
    margin-top: 20px;
  }
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
</style>
