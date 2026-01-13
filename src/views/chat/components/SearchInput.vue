<template>
  <div class="header-bar">
    <div class="flex-bc gap-10">
      <ElInput v-model="input" placeholder="搜索" clearable @input="debounceSearch">
        <template #prefix>
          <ElIcon><Search /></ElIcon>
        </template>
      </ElInput>
      <Dropdown :trigger="['click']">
        <div v-if="!IS_LOCAL_MODE" class="header-search-add flex-c">
          <ElIcon><Plus /></ElIcon>
        </div>
        <template #overlay>
          <Menu>
            <MenuItem>
              <div class="flex-c gap-5" @click="handleCreateGroup">
                <ElIcon><MessageSquarePlus /></ElIcon>
                <span>创建群聊</span>
              </div>
            </MenuItem>
            <MenuItem v-if="false">
              <div class="flex-c gap-5" @click="handleCreateAssistant">
                <ElIcon><Bot /></ElIcon>
                <span>新建助手</span>
              </div>
            </MenuItem>
          </Menu>
        </template>
      </Dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus } from "@element-plus/icons-vue"
import { Bot, Search, MessageSquarePlus } from "lucide-vue-next"
import { Dropdown, Menu, MenuItem } from "ant-design-vue"
import { debounce, isEmpty } from "lodash-es"
import { ElMessageBox } from "element-plus"

import { SessionModel } from "@pure/database"
import { useChatStore, useGroupStore } from "@/stores"
// import { onKeyStroke, useEventListener } from "@vueuse/core";
import { $t } from "@/locales"

import { DB_Session } from "@pure/database/schemas"

const input = ref("")
const chatStore = useChatStore()
const groupStore = useGroupStore()

const handleCreateGroup = async () => {
  ElMessageBox.prompt("创建群聊", "提示", {
    confirmButtonText: $t("common.confirm"),
    cancelButtonText: $t("common.cancel"),
  })
    .then(({ value }) => {
      groupStore.handleCreateGroup({ groupName: value, positioning: true })
    })
    .catch(() => {
      console.log("取消")
    })
}

const handleCreateAssistant = async () => {}

const matchesFilter = (item: DB_Session, searchStr: string) => {
  const lastMessage = item.lastMessage?.messageForShow?.toUpperCase()
  if (item.type === "GROUP") {
    return lastMessage?.includes(searchStr) || item.groupProfile?.name?.toUpperCase().includes(searchStr)
  }
  if (item.type === "C2C") {
    return item.userProfile?.nick?.toUpperCase().includes(searchStr) || lastMessage?.includes(searchStr)
  }
  return false
}

const debounceSearch = debounce(async (key) => {
  const trimmedKey = key?.trim() ?? ""

  if (__LOCAL_MODE__) {
    const data = await SessionModel.queryByKeyword(trimmedKey)
    chatStore.$patch({ searchConversationList: data })
    return
  }

  if (isEmpty(trimmedKey)) {
    chatStore.$patch({ searchConversationList: [] })
    return
  }

  const searchStr = trimmedKey.toUpperCase()
  const filterData = chatStore.conversationList.filter((item) => matchesFilter(item, searchStr))
  chatStore.$patch({ searchConversationList: filterData })
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
  background-color: rgba(0, 0, 0, 0.06);
  // transition:
  //   color 400ms cubic-bezier(0.215, 0.61, 0.355, 1),
  //   background 100ms cubic-bezier(0.215, 0.61, 0.355, 1);
  // &:hover {
  //   background-color: rgba(0, 0, 0, 0.06);
  // }
}
</style>
