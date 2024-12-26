<template>
  <div class="header-bar">
    <!-- 搜索 -->
    <div class="flex-bc gap-10">
      <el-input
        v-model="input"
        :placeholder="$t('chat.searchFor')"
        :prefix-icon="Search"
        @focus="onFocus"
        @blur="onBlur"
        @input="debounceSearch"
        clearable
      >
        <!-- <template #suffix>
          <div class="suffix" v-show="suffix">Ctrl K</div>
        </template> -->
      </el-input>
      <div v-if="!isLocalMode" class="header-search-add flex-c" @click="opendialog">
        <FontIcon iconName="Plus" />
      </div>
    </div>
    <!-- 搜索结果 -->
    <SearchBox ref="searchBoxRef" />
  </div>
</template>

<script setup>
import { onKeyStroke, useEventListener } from "@vueuse/core";
import { useGetters } from "@/utils/hooks/useMapper";
import { showConfirmationBox } from "@/utils/message";
import { Search } from "@element-plus/icons-vue";
import { ref, watch } from "vue";
import { useStore } from "vuex";
import { debounce, isEmpty } from "lodash-es";
import SearchBox from "./SearchBox.vue";
import emitter from "@/utils/mitt-bus";

defineOptions({
  name: "Search",
});

const isLocalMode = __LOCAL_MODE__
const input = ref("");
const suffix = ref(true);
const filterData = ref([]);
const searchBoxRef = ref();
const { dispatch, commit } = useStore();
const { tabList } = useGetters(["tabList"]);

// onKeyStroke(["keydown"], (e) => {
//   console.log("onKeyStroke", e);
// });

// useEventListener(document, "keydown", (e) => {
//   console.log("useEventListener", e);
// });

const createGroup = async () => {
  const data = { message: "创建群聊" };
  const result = await showConfirmationBox(data, "prompt");
  if (result === "cancel") return;
  dispatch("handleCreateGroup", { groupName: result.value, positioning: true });
};

const opendialog = () => {
  createGroup();
};

const onBlur = () => {
  suffix.value = true;
};
const onFocus = () => {
  suffix.value = false;
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
    commit("setConversationValue", { key: "filterConversationList", value: [] });
    return;
  }
  const str = key.toUpperCase().trim();
  filterData.value = tabList.value.filter((item) => matchesFilter(item, str));
  commit("setConversationValue", { key: "filterConversationList", value: filterData.value });
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
