<template>
  <el-dialog v-model="dialog" title="添加成员" width="600px" align-center>
    <div class="forward-action">
      <div
        v-for="item in chatStore.getNonBotC2CList"
        :key="item.toAccount"
        :class="{ 'forward-hover': memberValue?.toAccount === item.toAccount }"
        @click="onClickItem(item)"
      >
        <img
          :src="item.userProfile?.avatar || getAiAvatarUrl(item.conversationID) || squareUrl"
          alt=""
        />
        <div>{{ chatName(item) }}</div>
      </div>
    </div>
    <template #footer>
      <span>
        <el-button @click="close"> {{ $t("common.cancel") }} </el-button>
        <el-button type="primary" @click="define"> {{ $t("common.confirm") }} </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed } from "vue";
import { useState } from "@/utils/hooks/index";
import { chatName, squareUrl } from "@/utils/chat/index";
import { getAiAvatarUrl } from "@/ai/utils";
import { useChatStore } from "@/stores/index";

defineOptions({
  name: "AddMemberPopup",
});

const memberValue = ref(null);
const emits = defineEmits(["define"]);
const [dialog, setDialog] = useState();
const chatStore = useChatStore();

const onClickItem = (value) => {
  memberValue.value = value;
};
const openDialog = () => {
  setDialog(true);
};
const close = () => {
  setDialog(false);
};
const define = () => {
  emits("define", memberValue.value);
  setDialog(false);
};

defineExpose({ openDialog });
</script>
