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
import { ref, onMounted, onUnmounted } from "vue";
import { ROBOT_COLLECT } from '@shared/provider/config';
import { getUserProfile } from "@/service/im-sdk-api/index";
import { useGroupStore } from '@/stores/modules/group/index';
import CardGrid from "./CardGrid.vue";
import emitter from "@/utils/mitt-bus";

const groupStore = useGroupStore()

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
  emitter.emit("handleActiveTab", "");
  emitter.emit("handleProfile", data);
};

const transformUserData = (data) => {
  return data.map((item) => ({
    label: item.nick,
    type: "C2C",
    ...item,
  }));
};

const transformGroupData = (data = groupStore.groupList) => {
  return data.map((item) => ({
    ...item,
    label: item.nick,
    type: "GROUP",
  }));
};

const getRobotList = async () => {
  const { code, data } = await getUserProfile(ROBOT_COLLECT);
  robotList.value = data;
  treeData.value[0].children = transformUserData(data);
};

const getFriendList = async () => {
  if (__LOCAL_MODE__) return;
  const list = ["huangyk", "admin", "linjx", "jinwx", "zhangal"];
  const { code, data } = await getUserProfile(list);
  friendList.value = data;
  treeData.value[1].children = transformUserData(data);
  treeData.value[2].children = transformGroupData();
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
  groupStore.handleGroupList()
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
