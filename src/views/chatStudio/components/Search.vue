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
      <div class="header-search-add">
        <FontIcon @click="opendialog" iconName="Plus" />
      </div>
    </div>
    <!-- 搜索结果 -->
    <SearchBox ref="searchBoxRef" />
  </div>
</template>

<script setup>
import { showConfirmationBox } from "@/utils/message";
import { Search } from "@element-plus/icons-vue";
import { ref } from "vue";
import { useStore } from "vuex";
import SearchBox from "./SearchBox.vue";

const appoint = ref("");
const searchBoxRef = ref();
const { dispatch } = useStore();

const createGroup = async () => {
  const data = { message: "创建群聊" };
  const result = await showConfirmationBox(data, "prompt");
  if (result === "cancel") return;
  dispatch("CREATE_GROUP", { groupName: result.value });
};

const opendialog = () => {
  createGroup();
};
const onBlur = () => {};
const onFocus = () => {};
</script>

<style lang="scss" scoped>
.header-bar {
  background: var(--color-body-bg);
  height: 60px;
  padding: 14px;
  position: relative;
  .header-search {
    :deep(.el-input) {
      width: 210px;
    }
    display: flex;
    justify-content: space-between;
  }
}
.header-search-add {
  @include flex-center;
  width: 32px;
  height: 32px;
  background: #54b4ef;
  border-radius: 2px;
  font-size: 24px;
  color: #fff;
  cursor: pointer;
}
</style>
