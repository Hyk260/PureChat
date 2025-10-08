<template>
  <div class="header-bar">
    <!-- 搜索 -->
    <div class="flex-bc gap-10">
      <el-input v-model="input" placeholder="搜索" clearable @input="debounceSearch">
        <template #prefix>
          <el-icon><SearchIcon /></el-icon>
        </template>
      </el-input>
      <div v-if="!IS_LOCAL_MODE" class="header-search-add flex-c" @click="openDialog">
        <el-icon><Plus /></el-icon>
      </div>
      <!-- <div v-else class="header-search-add flex-c" @click="openDialog">
        <el-icon><Plus /></el-icon>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Search as SearchIcon } from "@element-plus/icons-vue"

import { debounce, isEmpty } from "lodash-es"

import { SessionModel } from "@/database/models/session"
import { useChatStore, useGroupStore } from "@/stores"
// import { onKeyStroke, useEventListener } from "@vueuse/core";
import { showConfirmationBox } from "@/utils/message"

const input = ref("")
const chatStore = useChatStore()
const groupStore = useGroupStore()
// ...existing code...

const createGroup = async () => {
  const data = { message: "创建群聊" }
  const result = await showConfirmationBox(data, "prompt")
  // showConfirmationBox returns Promise<string | Error>
  if (result instanceof Error) return
  if (result === "cancel") return
  // result is a string (the input value from prompt)
  groupStore.handleCreateGroup({ groupName: String(result), positioning: true })
}

const openDialog = () => {
  createGroup()
}

const matchesFilter = (item, searchStr) => {
  const lastMessage = item.lastMessage.messageForShow.toUpperCase()
  if (item.type === "GROUP") {
    return lastMessage.includes(searchStr) || item.groupProfile.name.toUpperCase().includes(searchStr)
  } else if (item.type === "C2C") {
    return item.userProfile.nick.toUpperCase().includes(searchStr) || lastMessage.includes(searchStr)
  }
  return false
}

const debounceSearch = debounce(async (key) => {
  if (__LOCAL_MODE__) {
    const data = await SessionModel.queryByKeyword(key)
    console.log(data)
    chatStore.$patch({ searchConversationList: data })
  } else {
    if (isEmpty(key)) {
      chatStore.$patch({ searchConversationList: [] })
      return
    }
    const filterData = chatStore.conversationList.filter((item) => matchesFilter(item, key.toUpperCase().trim()))
    if (isEmpty(filterData)) {
      chatStore.$patch({ searchConversationList: [] })
    } else {
      chatStore.$patch({ searchConversationList: filterData })
    }
  }
}, 200)
</script>

<style lang="scss" scoped>
.header-bar {
  height: 60px;
  padding: 14px;
  background: var(--color-body-bg);
  position: relative;
  .suffix {
    font-size: 12px;
    pointer-events: none;
    position: absolute;
    z-index: 5;
    right: 10px;
  }
}
.header-search-add {
  min-width: 32px;
  height: 32px;
  background: #54b4ef;
  border-radius: 2px;
  font-size: 18px;
  color: #fff;
  cursor: pointer;
}
</style>
