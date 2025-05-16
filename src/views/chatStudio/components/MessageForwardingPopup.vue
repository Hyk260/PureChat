<template>
  <el-dialog
    v-model="dialog"
    title="选择要转发的联系人"
    width="600px"
    align-center
    :lock-scroll="false"
    :before-close="handleClose"
  >
    <div class="forward-action">
      <div
        v-for="item in getNonBotList"
        :key="item.toAccount"
        :class="{ 'forward-hover': multipleValue?.toAccount === item.toAccount }"
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
        <el-button @click="handleCancel()">
          {{ $t("common.cancel") }}
        </el-button>
        <el-button type="primary" @click="handleConfirm()">
          {{ $t("common.confirm") }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { mapState } from "pinia";
import { useState } from "@/utils/hooks/index";
import { chatName } from "../utils/utils";
import { squareUrl } from "../utils/menu";
import { getAiAvatarUrl } from "@/ai/utils";
import { useChatStore } from "@/stores/index";

const [dialog, setDialog] = useState();

export default {
  name: "MessageForwardingPopup",
  computed: {
    ...mapState(useChatStore, ["getNonBotList"]),
  },
  data() {
    return {
      getAiAvatarUrl,
      multipleValue: null,
      dialogType: "",
      squareUrl,
      chatName,
      dialog,
      setDialog,
    };
  },
  methods: {
    onClickItem(value) {
      this.setMultipleValue(value);
    },
    openPopup(type) {
      this.dialogType = type;
      this.setDialog(true);
    },
    setMultipleValue(value = null) {
      this.multipleValue = value;
    },
    handleClose(done) {
      this.setMultipleValue();
      done();
    },
    handleCancel() {
      this.setDialog(false);
      this.setMultipleValue();
    },
    handleConfirm() {
      this.$emit("confirm", {
        value: this.multipleValue,
        type: this.dialogType,
      });
      this.setDialog(false);
      this.setMultipleValue();
    },
  },
};
</script>
