<template>
  <div ref="popoverRef" v-if="showSearchBox" class="search-box-style">
    <el-tabs v-model="activeName" class="search-tabs" @tab-click="handleClick">
      <el-tab-pane v-for="{ label, name } in data" :label="label" :name="name" :key="label">
        <div class="head-tabs">
          {{ label }}
        </div>
        <div v-if="name == 'groupChat'" :class="name">
          <div
            class="item-list"
            @click="handleGroupClick(item)"
            v-for="item in groupList"
            :key="item.groupID"
          >
            <div>
              <img :src="item.avatar || squareUrl" alt="" />
              <span>{{ item.name }}</span>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { useState } from "@/utils/hooks/useMapper";
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";
import { useStore } from "vuex";
import { squareUrl } from "../utils/menu";
const activeName = ref("comprehensive");
const showSearchBox = ref(false);
const popoverRef = ref();
const { commit, dispatch } = useStore();

const { groupList } = useState({
  groupList: (state) => state.groupinfo.groupList,
});

const handleClick = (tab, event) => {
  console.log(tab, event);
  switch (tab.paneName) {
    case "groupChat":
      dispatch("getGroupList");
      break;
    default:
      console.log("default");
      break;
  }
};
const handleGroupClick = (item) => {
  setModal(false);
  dispatch("addConversation", { convId: `GROUP${item.groupID}` });
};
const data = [
  { label: "综合", name: "comprehensive" },
  { label: "联系人", name: "contacts" },
  { label: "群聊", name: "groupChat" },
  { label: "聊天记录", name: "chatLog" },
];
const setModal = (state) => {
  showSearchBox.value = state;
};

onClickOutside(popoverRef, (event) => {
  // if (!popover.value) return;
  setModal(false);
});

defineExpose({ setModal });
</script>

<style lang="scss" scoped>
.item-list {
  // height: 36px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  &:hover {
    background: #d9ecff;
  }
  & > div {
    cursor: pointer;
    width: 100%;
  }
  img {
    height: 36px;
  }
  span {
    margin-left: 12px;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.65);
  }
}
.search-box-style {
  // width: 266px;
  height: 514px;
  position: absolute;
  z-index: 3;
  left: 14px;
  background: #ffffff;
  box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
  border-radius: 3px;
}
.search-tabs {
  :deep(.el-tabs__header) {
    padding: 0 16px;
    margin: 0;
  }
  .head-tabs {
    padding: 0 16px;
    height: 35px;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
  }
}
</style>
