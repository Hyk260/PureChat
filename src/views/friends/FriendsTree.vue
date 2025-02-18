<template>
  <div class="h-full">
    <el-scrollbar>
      <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick">
        <template #default="{ data }">
          <div v-if="data.children" class="w-full flex-bc pr-12">
            <span>{{ data.label }}</span>
            <span>
              {{ data.children.length }}
            </span>
          </div>
          <div v-else>
            <CardGrid :type="data.type" :item="data" />
          </div>
        </template>
      </el-tree>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive, toRefs, computed, watch, nextTick } from "vue";
import { getUserProfile } from "@/api/im-sdk-api/index";
import { ROBOT_COLLECT } from "@/ai/constant";
import CardGrid from "./CardGrid.vue";
import { useStore } from "vuex";
import { scrollToMessage } from "@/utils/chat/index";
import emitter from "@/utils/mitt-bus";
import { useState } from "@/utils/hooks/useMapper";

const { commit, dispatch } = useStore();

const { groupList } = useState({
  groupList: (state) => state.groupinfo.groupList,
});

const robotList = ref([]);
const friendList = ref([]);
const defaultProps = {
  children: "children",
  label: "label",
};
const INITIAL_TREE_DATA = [
  {
    id: "aiModel",
    level: 0,
    label: "AI大模型",
    children: [],
  },
  {
    id: "contacts",
    level: 0,
    label: "常用联系人",
    children: [],
    hidden: __LOCAL_MODE__,
  },
  {
    id: "group",
    level: 0,
    label: "我的群聊",
    children: [],
    hidden: __LOCAL_MODE__,
  },
].filter((item) => !item.hidden);

const treeData = ref(INITIAL_TREE_DATA);

const handleNodeClick = (data) => {
  if (data.children) return;

  const convInfo = {
    id: data.GroupId || data.groupID || data.userID,
    type: data.type,
  };
  emitter.emit("handleActiveTab", "");
  emitter.emit("handleProfile", data);
  // handleConversation(convInfo);
};

const handleConversation = ({ id, type }) => {
  // commit("taggleOueSide", { id: "chat", path: "/chat" });
  // dispatch("addConversation", { convId: `${type}${id}` });
  // scrollToMessage(`message_${type}${id}`);
};

const transformUserData = (data) => {
  return data.map((item) => ({
    label: item.nick,
    type: "C2C",
    ...item,
  }));
};

const getRobotList = async () => {
  const { code, data } = await getUserProfile(ROBOT_COLLECT);
  robotList.value = data;
  treeData.value[0].children = transformUserData(data);
};

const getFriendList = async () => {
  if (__LOCAL_MODE__) return
  const list = ["huangyk", "admin", "linjx", "jinwx", "zhangal"];
  const { code, data } = await getUserProfile(list);
  friendList.value = data;

  treeData.value[1].children = transformUserData(data);
  treeData.value[2].children = groupList.value.map((item) => ({
    ...item,
    label: item.nick,
    type: "GROUP",
  }));
};

const setupEventListeners = () => {
  emitter.on("handleActiveTab", (id) => {
    console.log(id);
  });
};

const cleanupEventListeners = () => {
  emitter.off("handleActiveTab");
};

onMounted(() => {
  dispatch("getGroupList");
  getRobotList();
  getFriendList();
  setupEventListeners();
});

onUnmounted(() => {
  cleanupEventListeners();
});
</script>

<style lang="scss" scoped>
:deep(.el-tree-node__children) {
  .el-tree-node__content {
    height: 50px;
    padding: 0px 10px !important;
  }
  .el-tree-node__expand-icon {
    display: none;
  }
}
</style>
