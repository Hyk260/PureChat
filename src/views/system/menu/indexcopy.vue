<template>
  <div class="content-wrap">
    <el-row :gutter="20">
      <el-col :span="10">
        <el-card>
          <template #header>
            <el-button size="small" plain @click="addMenuBtn">
              添加菜单
            </el-button>
            <el-button size="small" plain @click="Putall(isExpand)">
              {{ isExpand ? "全部展开" : " 全部收起" }}
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="delMenuBtn"
              v-if="showDelBtn"
            >
              删除
            </el-button>
          </template>
          <el-skeleton animated :rows="10" :loading="true">
            <template #default>
              <div></div>
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card>
          <template #header>
            <span> GitHub饼图信息 </span>
          </template>
          <el-skeleton animated :rows="10" :loading="true">
            <template #default>
              <div></div>
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from "vue";

const isExpand = ref(false);
const showDelBtn = ref(true);

// 添加菜单按钮
const addMenuBtn = () => {
  // dialogFormVisible.value = true
};
// 全部收起
const Putall = (val) => {
  // const tree = data.value;
  // isExpand.value = !isExpand.value;
  // tree.map((t, i) => {
  //   treeRef.value.store.nodesMap[tree[i].id].expanded = val;
  // });
};

const delMenuBtn = () => {
  // const {
  //   meta: { modify, title },
  // } = state.treeData;
  // if (modify) return warnMessage("没有权限删除系统菜单!");
  // ElMessageBox.confirm(`是否删除菜单 ${title}?`, "提示", {
  //   confirmButtonText: "确定",
  //   cancelButtonText: "取消",
  //   type: "warning",
  // })
  //   .then(() => {
  //     delMenu();
  //   })
  //   .catch(() => {});
};
</script>

<style lang="scss" scoped></style>
