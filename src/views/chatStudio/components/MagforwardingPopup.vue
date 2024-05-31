<template>
  <el-dialog
    v-model="dialogVisible"
    title="选择要转发的联系人"
    width="600px"
    align-center
    :before-close="handleClose"
  >
    <div class="tabulation-style">
      <div
        v-for="item in conversationList"
        :key="item.toAccount"
        :class="{ tabulationHover: multipleValue?.toAccount == item.toAccount }"
        @click="onClickItem(item)"
      >
        <img :src="item.userProfile?.avatar || squareUrl" alt="" />
        <div>{{ chatName(item) }}</div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel()">
          {{ $t("el.datepicker.cancel") }}
        </el-button>
        <el-button type="primary" @click="handleConfirm()">
          {{ $t("el.datepicker.confirm") }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { mapState } from "vuex";
import { useBoolean } from "@/utils/hooks/index";
import { chatName } from "../utils/utils";
import { squareUrl } from "../utils/menu";

const [dialogVisible, setDialogVisible] = useBoolean();
export default {
  name: "MagforwardingPopup",
  components: {},
  computed: {
    ...mapState({
      conversationList: (state) => state.conversation.conversationList,
    }),
  },
  props: {},
  data() {
    return {
      multipleValue: null,
      dialogType: "",
      squareUrl,
      chatName,
      dialogVisible,
      setDialogVisible,
    };
  },
  methods: {
    onClickItem(value) {
      this.setMultipleValue(value);
    },
    openPopup(type) {
      this.dialogType = type;
      this.setDialogVisible(true);
    },
    setMultipleValue(value = null) {
      this.multipleValue = value;
    },
    handleClose(done) {
      this.setMultipleValue();
      done();
    },
    handleCancel() {
      this.setDialogVisible(false);
      this.setMultipleValue();
    },
    handleConfirm() {
      this.$emit("confirm", {
        value: this.multipleValue,
        type: this.dialogType,
      });
      this.setDialogVisible(false);
      this.setMultipleValue();
    },
  },
};
</script>

<style lang="scss" scoped></style>
