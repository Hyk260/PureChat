<template>
  <el-dialog v-model="dialog" title="添加成员" width="600px" align-center>
    <div class="forward-ation">
      <div
        v-for="item in filterList"
        :key="item.toAccount"
        :class="{ 'forward-hover': memberValue?.toAccount == item.toAccount }"
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
import { useBoolean } from "@/utils/hooks/index";
import { isRobot } from "@/utils/chat/index";
import { squareUrl } from "../utils/menu";
import { chatName } from "../utils/utils";
import { getAiAvatarUrl } from "@/ai/utils";
import store from "@/store/index";

defineOptions({
  name: "AddMemberPopup",
});

const memberValue = ref(null);
const emits = defineEmits(["define"]);
const [dialog, setDialog] = useBoolean();

const filterList = computed(() => {
  return store.state.conversation.conversationList.filter((t) => t.type === "C2C" && !isRobot(t.conversationID));
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
