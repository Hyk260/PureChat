<template>
  <div class="h-full">
    <el-scrollbar>
      <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick">
        <template #default="{ data }">
          <div v-if="data.children">{{ data.label }}</div>
          <div v-else>
            <CardGrid type="C2C" :type="data.type" :item="[data]" />
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
const treeData = ref([
  {
    id: "contacts",
    level: 0,
    label: "常用联系人",
    children: [],
  },
  {
    id: "aiModel",
    level: 0,
    label: "AI大模型",
    children: [],
  },
  {
    id: "group",
    level: 0,
    label: "我的群聊",
    children: [],
  },
]);

const handleNodeClick = (data) => {
  if (data.children) return;
  console.log(data);
  onFriend(data);
};

function onFriend(item) {
  const id = item.GroupId || item.groupID || item.userID;
  const type = item.type;
  // "GROUP" : "C2C";
  commit("taggleOueSide", "chat");
  dispatch("addConversation", { convId: `${type}${id}` });
  scrollToMessage(`message_${type}${id}`);
}

async function getRobotList() {
  const { code, data } = await getUserProfile(ROBOT_COLLECT);
  robotList.value = data;

  treeData.value[1].children = data.map((item) => ({
    label: item.nick,
    type: "C2C",
    ...item,
  }));
  console.log(robotList.value);
}

async function getFriendList() {
  let list = ["huangyk", "admin", "linjx", "jinwx", "zhangal"];
  const { code, data } = await getUserProfile(list);
  friendList.value = data;
  treeData.value[0].children = data.map((item) => ({
    label: item.nick,
    type: "C2C",
    ...item,
  }));
  treeData.value[2].children = groupList.value.map((item) => ({
    ...item,
    label: item.nick,
    type: "GROUP",
  }));
}

onMounted(() => {
  dispatch("getGroupList");
  getRobotList();
  getFriendList();

  emitter.on("handleActiveTab", (id) => {
    console.log(id);
  });
});
onUnmounted(() => {
  emitter.off("handleActiveTab");
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
