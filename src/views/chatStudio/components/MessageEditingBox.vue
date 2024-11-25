<template>
  <div class="edit">
    <el-input
      v-model="input"
      resize="none"
      :autosize="{ minRows: 1, maxRows: 20 }"
      class="min-w-500"
      type="textarea"
    />
    <div class="flex justify-end">
      <el-button size="small" @click="handleCancel"> {{ $t("common.cancel") }} </el-button>
      <el-button size="small" type="primary" @click="handleConfirm">
        {{ $t("common.confirm") }}
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useState } from "@/utils/hooks/useMapper";

const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
});

const input = ref(props.item.payload.text);

const { commit } = useStore();
// const { messageEdit } = useState({
//   messageEdit: (state) => state.conversation.messageEdit,
// });

function handleCancel() {
  commit("setMessageEdit", null);
}

function handleConfirm() {
  handleCancel();
}
</script>

<style lang="scss" scoped>
.edit {
  transition: background-color 100ms cubic-bezier(0.215, 0.61, 0.355, 1);
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  max-width: 100%;
  width: 100%;
  padding-block: 8px 12px;
  padding-inline: 12px;
  border: 1px solid #e3e3e3;
  display: flex;
  flex-direction: column;
  gap: 10px;
  :deep(.el-textarea__inner) {
    border: none;
    box-shadow: none;
  }
}
</style>
