<template>
  <div class="h-full">
    <ElScrollbar>
      <ElTree :data="treeData" :props="defaultProps" @node-click="handleNodeClick">
        <template #default="{ data }">
          <div v-if="data.children" class="w-full flex-bc pr-12">
            <span> {{ data.label }} </span>
            <span> {{ data.children.length }} </span>
          </div>
          <div v-else>
            <CardGrid :type="data.type" :item="data" />
          </div>
        </template>
      </ElTree>
    </ElScrollbar>
  </div>
</template>

<script setup lang="ts">
import { ElTree } from "element-plus"
import { ModelIDList } from "@shared/provider"
import { getUserProfile } from "@/service/im-sdk-api"
import { useGroupStore } from "@/stores/modules/group"
import emitter from "@/utils/mitt-bus"
import CardGrid from "./CardGrid.vue"

type TreeNode = {
  key: string
  label: string
  type?: "C2C" | "GROUP"
  children?: TreeNode[]
  hidden?: boolean
}

const groupStore = useGroupStore()

const treeData = ref<TreeNode[]>([])
const robotList = ref([])
const friendList = ref([])

const defaultProps = {
  children: "children",
  label: "label",
}
const ROBOT_MODEL_IDS = ModelIDList
const FRIEND_IDS = ["huangyk", "admin", "linjx", "jinwx", "zhangal"]
const INITIAL_TREE_DATA = [
  {
    key: "provider",
    label: "服务商",
    children: [],
  },
  {
    key: "contacts",
    label: "常用联系人",
    children: [],
    hidden: __LOCAL_MODE__,
  },
  {
    key: "group",
    label: "我的群聊",
    children: [],
    hidden: __LOCAL_MODE__,
  },
].filter((item) => !item.hidden)

treeData.value = INITIAL_TREE_DATA

const handleNodeClick = (data) => {
  if (data.children) return
  emitter.emit("handleActiveTab", "")
  emitter.emit("handleProfile", data)
}

const transformUserData = (data) => {
  return data.map((item) => ({
    label: item.nick,
    type: "C2C",
    ...item,
  }))
}

const transformGroupData = (data) => {
  return data.map((item) => ({
    ...item,
    label: item.nick,
    type: "GROUP",
  }))
}

const getRobotList = async () => {
  try {
    const { code, data } = await getUserProfile(ROBOT_MODEL_IDS)
    if (data && Array.isArray(data)) {
      robotList.value = data
      treeData.value[0].children = transformUserData(data)
    }
  } catch (err) {
    console.error("[getRobotList] failed:", err)
  }
}

const getFriendList = async () => {
  if (__LOCAL_MODE__) return
  try {
    const { code, data } = await getUserProfile(FRIEND_IDS)
    if (data && Array.isArray(data)) {
      friendList.value = data
      treeData.value[1].children = transformUserData(data)
      treeData.value[2].children = transformGroupData(groupStore.groupList)
    }
  } catch (err) {
    console.error("[getFriendList] failed:", err)
  }
}

const setupEventListeners = () => {
  emitter.on("handleActiveTab", (id) => {
    console.log(id)
  })
}

const cleanupEventListeners = () => {
  emitter.off("handleActiveTab")
}

onMounted(() => {
  groupStore.handleGroupList()
  getRobotList()
  getFriendList()
  setupEventListeners()
})

onUnmounted(() => {
  cleanupEventListeners()
})
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
