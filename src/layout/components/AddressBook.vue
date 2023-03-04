<template>
  <div>
    <el-dialog
      v-model="drawer"
      title="地址本"
      class="address-style"
      align-center
    >
      <div class="address-box">
        <div class="header"></div>
        <div class="content"></div>
        <div class="footer"></div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">
            {{ $t("el.datepicker.cancel") }}
          </el-button>
          <el-button type="primary" @click="confirm">
            {{ $t("el.datepicker.confirm") }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {
  computed,
  ref,
  toRefs,
  reactive,
  onMounted,
  onBeforeUnmount,
} from "vue";
import { useStore } from "vuex";
import { useState } from "@/utils/hooks/useMapper";

const { dispatch, commit } = useStore();
const { isShowAddBook } = useState({
  isShowAddBook: (state) => state.groupinfo.isShowAddBook,
});
const state = reactive({ text: "wewe" });
const centerDialogVisible = ref(true);

const cancel = () => {
  commit("setAddbookStatus", false);
};
const confirm = () => {
  cancel();
};

const drawer = computed({
  get() {
    return isShowAddBook.value;
  },
  set(val) {
    cancel();
  },
});

onMounted(() => {});
onBeforeUnmount(() => {});
</script>

<style lang="scss" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
:deep(.el-dialog) {
  width: 860px;
  .el-dialog__body {
    padding: 0;
  }
}

.address-box {
  .header,
  .footer {
    border-top: 1px solid #00000017;
    border-bottom: 1px solid #00000017;
  }
  .header {
    height: 88px;
  }
  .content {
    height: 270px;
  }
  .footer {
    height: 92px;
  }
}
</style>
