<template>
  <div class="flex-box width-full style-mail">
    <div class="abv">
      <el-tabs v-model="activeName" class="style-tabs" @tab-click="taggleClick">
        <el-tab-pane label="通讯录" name="first">
          <el-tree
            :data="group_list"
            :props="defaultProps"
            @node-click="handleNodeClick"
          >
            <template #default="{ node, data }">
              <div class="custom-node">
                <span @click="handleClick(node, data)">
                  {{ node.data.name }}
                </span>
              </div>
            </template>
          </el-tree>
        </el-tab-pane>
        <el-tab-pane label="我的好友" name="second"> 我的好友 </el-tab-pane>
      </el-tabs>
    </div>
    <div class="right"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useState, useGetters } from "@/utils/hooks/useMapper";

const defaultProps = {
  children: "children",
  label: "label",
};
const activeName = ref("first");
const { state, dispatch, commit } = useStore();
const { groupList } = useState({
  groupList: (state) => state.groupinfo.groupList,
});

const taggleClick = (tab, event) => {
  // console.log(tab, event);
};
const handleClick = (node, { groupID = "" }) => {
  if (groupID == "") return;
  dispatch("CHEC_OUT_CONVERSATION", { convId: `GROUP${groupID}` });
  commit("TAGGLE_OUE_SIDE", "news");
};
const handleNodeClick = (data) => {
  // console.log(data);
};

const group_list = ref([
  {
    name: "群组",
    children: [],
  },
  {
    name: "联系人",
    children: [],
  },
  {
    name: "黑名单",
    children: [],
  },
]);

watch(
  groupList,
  (data) => {
    const list = groupList.value;
    list.map((t) => {
      group_list.value[0].children.push(t);
    });
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>

<style lang="scss" scoped>
.style-mail {
  background-color: #f0f2f5;
}
.abv {
  width: 200px;
  height: 100%;
  padding: 16px 16px 0 16px;
  background: #fff;
  box-shadow: 4px 0px 8px 0px rgb(0 0 0 / 15%);
}
.right {
  width: calc(100% - 200px);
  padding: 0 16px 0 16px;
}
.style-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
