<template>
  <div class="friends-list">
    <div class="left-list">
      <div class="search-box">
        <el-input
          v-model="input"
          :placeholder="$t('chat.searchFor')"
          :prefix-icon="Search"
          clearable
        >
        </el-input>
      </div>
      <div class="quick-nav">
        <div
          class="quick-nav-item"
          v-for="(tab, index) in tabsCopy"
          :key="tab.id"
          @click="setActiveTab(tab)"
        >
          <div>{{ tab.name }}</div>
          <el-icon><ArrowRight /></el-icon>
        </div>
      </div>
      <div v-if="false" class="friends-tabs">
        <FriendsTabs />
      </div>
      <div class="friends-tree">
        <FriendsTree  />
      </div>
    </div>
    <div v-if="title" class="right-list">
      <div class="head px-10">{{ title }}</div>
      <div class="list">
        <el-empty class="h-full" :description="$t('common.emptyText')" :image-size="150" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, computed, watch, useTemplateRef, nextTick, onMounted } from "vue";
import { Search } from "@element-plus/icons-vue";
import FriendsTabs from "./FriendsTabs.vue";
import FriendsTree from "./FriendsTree.vue";

const tabsCopy = [
  { id: 1, name: "好友通知" },
  { id: 2, name: "群通知" },
];
const input = ref("");
const title = ref("");

function setActiveTab(tab) {
  title.value = tab.name;
}
</script>

<style lang="scss" scoped>
.friends-list {
  width: calc(100% - 68px);
  display: flex;
  .quick-nav {
    width: 280px;
    padding: 5px 10px;
    border-bottom: 1px solid #ebeef5;
    .quick-nav-item {
      cursor: pointer;
      padding: 0 5px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 30px;
      &:hover {
        background-color: var(--color-message-active);
      }
    }
  }
  .left-list {
    border-right: 1px solid #ebeef5;
    width: 280px;
    height: 100%;
    .search-box {
      padding: 14px;
      height: 60px;
      display: flex;
      align-items: center;
    }
  }
  .right-list {
    width: calc(100% - 180px);
    height: 100%;
    .head {
      height: 60px;
      border-bottom: 1px solid #ebeef5;
      display: flex;
      align-items: center;
    }
    .list {
      height: calc(100% - 60px);
    }
  }
  .friends-tabs {
    padding: 15px 10px 15px;
  }
  .friends-tree{
    height: calc(100% - 70px - 60px);
  }
}
</style>
