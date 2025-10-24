<template>
  <div class="header-bar">
    <!-- 搜索 -->
    <div class="flex-bc gap-10">
      <el-input v-model="input" placeholder="搜索" clearable @input="debounceSearch">
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
      <div v-if="!IS_LOCAL_MODE" class="header-search-add flex-c" @click="openDialog">
        <el-icon><MessageSquarePlus /></el-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, MessageSquarePlus } from "lucide-vue-next"

import { debounce, isEmpty } from "lodash-es"

import { SessionModel } from "@/database/models/session"
import { useChatStore, useGroupStore } from "@/stores"
// import { onKeyStroke, useEventListener } from "@vueuse/core";
import { showConfirmationBox } from "@/utils/message"

const input = ref("")
const chatStore = useChatStore()
const groupStore = useGroupStore()

const createGroup = async () => {
  const data = { message: "创建群聊" }
  const result = await showConfirmationBox(data, "prompt")
  if (result instanceof Error) return
  if (result === "cancel") return
  groupStore.handleCreateGroup({ groupName: result?.value, positioning: true })
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
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  color: rgb(96, 98, 102);
  transition:
    color 400ms cubic-bezier(0.215, 0.61, 0.355, 1),
    background 100ms cubic-bezier(0.215, 0.61, 0.355, 1);
  &:hover {
    background-color: rgba(0, 0, 0, 0.06);
  }
}
</style>
