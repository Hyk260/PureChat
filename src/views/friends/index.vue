<template>
  <div class="friends-list wh-full">
    <div class="left-list">
      <div class="search-box">
        <el-input v-model="input" :placeholder="$t('chat.searchFor')" :prefix-icon="Search" clearable> </el-input>
      </div>
      <div class="quick-nav">
        <!-- <div
          class="quick-nav-item"
          v-for="(tab, index) in tabsList"
          :key="tab.id"
          @click="setActiveTab(tab)"
        >
          <div>{{ tab.name }}</div>
          <el-icon><ArrowRight /></el-icon>
        </div> -->
      </div>
      <div v-if="false" class="friends-tabs">
        <FriendsTabs />
      </div>
      <div class="friends-tree">
        <FriendsTree />
      </div>
    </div>
    <div class="right-list">
      <div>
        <div class="head px-10"></div>
        <ProfileCard />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue"
import { Search } from "lucide-vue-next"

import emitter from "@/utils/mitt-bus"

import FriendsTabs from "./FriendsTabs.vue"
import FriendsTree from "./FriendsTree.vue"
import ProfileCard from "./ProfileCard.vue"

// const tabsList = [
//   { id: 1, name: "好友通知" },
//   { id: 2, name: "群通知" },
// ]
defineOptions({ name: "Friends" })

const input = ref("")
const title = ref("")

function setActiveTab(tab) {
  title.value = tab.name
}

onMounted(() => {
  emitter.on("handleActiveTab", setActiveTab)
})
onUnmounted(() => {
  emitter.off("handleActiveTab")
})
</script>

<style lang="scss" scoped>
.friends-list {
  display: flex;
  .quick-nav {
    width: 280px;
    .quick-nav-item {
      cursor: pointer;
      padding: 0 10px;
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
    border-right: 1px solid var(--color-border-default);
    width: 280px;
    height: 100%;
    .search-box {
      padding: 14px;
      height: 60px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid var(--color-border-default);
    }
  }
  .right-list {
    width: calc(100% - 180px);
    height: 100%;
    .head {
      height: 60px;
      border-bottom: 1px solid var(--color-border-default);
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
  .friends-tree {
    height: calc(100% - 60px);
  }
}
</style>
