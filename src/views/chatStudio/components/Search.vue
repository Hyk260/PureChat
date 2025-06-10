<template>
  <div class="header-bar">
    <!-- 搜索 -->
    <div class="flex-bc gap-10">
      <el-input
        v-model="input"
        :placeholder="$t('chat.searchFor')"
        :prefix-icon="Search"
        @input="debounceSearch"
        clearable
      >
      </el-input>
      <div v-if="!IS_LOCAL_MODE" class="header-search-add flex-c" @click="openDialog">
        <FontIcon iconName="Plus" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { onKeyStroke, useEventListener } from "@vueuse/core";
import { showConfirmationBox } from "@/utils/message";
import { Search } from "@element-plus/icons-vue";
import { debounce, isEmpty } from "lodash-es";
import { useGroupStore, useChatStore } from "@/stores/index";

defineOptions({
  name: "Search",
});

const input = ref("");
const chatStore = useChatStore();
const groupStore = useGroupStore();

const createGroup = async () => {
  const data = { message: "创建群聊" };
  const result = await showConfirmationBox(data, "prompt");
  if (result === "cancel") return;
  groupStore.handleCreateGroup({ groupName: result.value, positioning: true });
};

const openDialog = () => {
  createGroup();
};

const matchesFilter = (item, searchStr) => {
  const lastMessage = item.lastMessage.messageForShow.toUpperCase();
  if (item.type === "GROUP") {
    return (
      lastMessage.includes(searchStr) || item.groupProfile.name.toUpperCase().includes(searchStr)
    );
  } else if (item.type === "C2C") {
    return (
      item.userProfile.nick.toUpperCase().includes(searchStr) || lastMessage.includes(searchStr)
    );
  }
  return false;
};

const debounceSearch = debounce((key) => {
  if (isEmpty(key)) {
    chatStore.$patch({ searchConversationList: [] });
    return;
  }
  const str = key.toUpperCase().trim();
  const filterData = chatStore.conversationList.filter((item) => matchesFilter(item, str));
  chatStore.$patch({ searchConversationList: filterData });
}, 200);
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
