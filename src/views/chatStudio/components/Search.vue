<template>
  <div class="header-bar">
    <!-- 搜索 -->
    <div class="header-search">
      <el-input
        :placeholder="$t('chat.searchFor')"
        v-model="appoint"
        :prefix-icon="Search"
        class="text-input"
        clearable
        @focus="onFocus"
        @blur="onBlur"
      >
      </el-input>
      <div class="header-search-add flex-c">
        <FontIcon @click="opendialog" iconName="Plus" />
      </div>
    </div>
    <!-- 搜索结果 -->
    <SearchBox ref="searchBoxRef" />
  </div>
</template>

<script setup>
import { useGetters } from "@/utils/hooks/useMapper";
import { showConfirmationBox } from "@/utils/message";
import { Search } from "@element-plus/icons-vue";
import { ref, watch } from "vue";
import { useStore } from "vuex";
import { debounce, isEmpty } from "lodash-es";
import SearchBox from "./SearchBox.vue";
import emitter from "@/utils/mitt-bus";

const appoint = ref("");
const filterData = ref([]);
const searchBoxRef = ref();
const { dispatch, commit } = useStore();
const { tabList } = useGetters(["tabList"]);

const setAppoint = (value = "") => {
  appoint.value = value;
};

const createGroup = async () => {
  const data = { message: "创建群聊" };
  const result = await showConfirmationBox(data, "prompt");
  if (result === "cancel") return;
  dispatch("handleCreateGroup", { groupName: result.value });
};

const opendialog = () => {
  createGroup();
};

const onBlur = () => {
  setAppoint();
};
const onFocus = () => {};

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

const fnAppoint = debounce((key) => {
  if (isEmpty(key)) {
    commit("setConversationValue", { key: "filterConversationList", value: [] });
    return;
  }
  const str = key.toUpperCase().trim()
  filterData.value = tabList.value.filter((item) => matchesFilter(item, str));
  console.log(filterData.value);
  commit("setConversationValue", { key: "filterConversationList", value: filterData.value });
}, 100);

watch(appoint, (value) => {
  fnAppoint(value);
});

emitter.on("setSearchForData", (value = "") => {
  setAppoint();
  commit("setConversationValue", { key: "filterConversationList", value: [] });
});
</script>

<style lang="scss" scoped>
.header-bar {
  background: var(--color-body-bg);
  height: 60px;
  padding: 14px;
  position: relative;
  .header-search {
    display: flex;
    justify-content: space-between;
    :deep(.el-input) {
      width: 210px;
    }
  }
}
.header-search-add {
  width: 32px;
  height: 32px;
  background: #54b4ef;
  border-radius: 2px;
  font-size: 24px;
  color: #fff;
  cursor: pointer;
}
</style>
