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
import { nextTick } from "vue";
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
  commit("CREATE_GROUP", { groupName: result.value });
};

const opendialog = () => {
  createGroup();
};

const onBlur = () => {
  setAppoint();
};
const onFocus = () => {};

const fnAppoint = debounce((key) => {
  if (isEmpty(key)) {
    commit("SET_CONVERSATION_VALUE", { key: "filterConversationList", value: [] });
    return;
  }
  filterData.value = tabList.value.filter((item) => {
    if (item.type === "GROUP") {
      return item.lastMessage.messageForShow.includes(key) || item.groupProfile.name.includes(key);
    } else if (item.type === "C2C") {
      return item.userProfile.nick.includes(key) || item.lastMessage.messageForShow.includes(key);
    }
  });
  console.log(filterData.value);
  commit("SET_CONVERSATION_VALUE", { key: "filterConversationList", value: filterData.value });
}, 100);

watch(appoint, (value) => {
  fnAppoint(value);
});

emitter.on("setSearchForData", (value = "") => {
  setAppoint();
  commit("SET_CONVERSATION_VALUE", { key: "filterConversationList", value: [] });
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
