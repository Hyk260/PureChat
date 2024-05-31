<template>
  <el-dialog v-model="dialog" title="添加成员" width="600px" align-center draggable>
    <div class="tabulation-style">
      <div
        v-for="item in conversationList"
        :key="item.toAccount"
        :class="{ tabulationHover: memberValue?.toAccount == item.toAccount }"
        @click="onClickItem(item)"
      >
        <img :src="item.userProfile?.avatar || squareUrl" alt="" />
        <div>{{ chatName(item) }}</div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close"> 取消 </el-button>
        <el-button type="primary" @click="define"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { useBoolean } from "@/utils/hooks/index";
import { useState } from "@/utils/hooks/useMapper";
import { ref } from "vue";
import { squareUrl } from "../utils/menu";
import { chatName } from "../utils/utils";

const memberValue = ref(null);
const emits = defineEmits(["define"]);
const [dialog, setDialog] = useBoolean();
const { conversationList } = useState({
  conversationList: (state) => state.conversation.conversationList.filter((t) => t.type == "C2C"),
});
const onClickItem = (value) => {
  memberValue.value = value;
};
const onenDialog = () => {
  setDialog(true);
};
const close = () => {
  setDialog(false);
};
const define = () => {
  emits("define", memberValue.value);
  setDialog(false);
};

defineExpose({ onenDialog });
</script>

<style lang="scss" scoped></style>
