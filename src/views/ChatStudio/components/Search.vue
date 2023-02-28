<template>
  <div class="header-bar">
    <!-- 搜索 -->
    <div class="header-search">
      <el-input
        placeholder="搜索"
        v-model="appoint"
        :prefix-icon="Search"
        class="text-input"
        clearable
      >
      </el-input>
      <div class="header-search-add">
        <el-icon @click="opendialog">
          <Plus />
        </el-icon>
      </div>
    </div>

    <el-dialog
      v-model="dialogVisible"
      :title="$t('common.createGroupChat')"
      width="30%"
      :before-close="handleClose"
    >
      <div>
        <el-input v-model="input" placeholder="请输入群名" clearable />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">{{
            $t("el.messagebox.cancel")
          }}</el-button>
          <el-button type="primary" @click="createGroupBtn">
            {{ $t("el.messagebox.confirm") }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { Search, Plus } from "@element-plus/icons-vue";
import { useDebouncedRef } from "@/utils";
import { useStore } from "vuex";
const appoint = ref("");
const input = ref("");
// const appoint = useDebouncedRef("");
const dialogVisible = ref(false);
const { state, commit, dispatch } = useStore();

const opendialog = () => {
  dialogVisible.value = true;
};
const createGroupBtn = () => {
  dialogVisible.value = false;
  dispatch("CREATE_GROUP", {
    groupName: input.value,
  });
  input.value = "";
};
const handleClose = done => {
  done();
};
watch(appoint, value => {
  console.log(value);
});
</script>

<style lang="scss" scoped>
.header-bar {
  background: #fff;
  height: 60px;
  padding: 14px;
  .header-search {
    :deep(.el-input) {
      width: 210px;
    }
    display: flex;
    justify-content: space-between;
  }
}
.header-search-add {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  background: #54b4ef;
  border-radius: 2px;
  font-size: 24px;
  color: #fff;
  cursor: pointer;
}
</style>
