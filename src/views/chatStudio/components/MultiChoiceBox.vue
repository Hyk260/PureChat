<template>
  <div class="checkbox-style" id="editor" v-if="showCheckbox">
    <FontIcon class="close" iconName="CircleCloseFilled" @click="onClose" />
    <div v-for="item in buttonList" :key="item.icon">
      <div class="icon" :class="disabled ? 'disabled' : ''" @click="onClock(item)">
        <svg-icon :class="item.class" :iconClass="item.icon" />
      </div>
      <span class="text">
        {{ item.value }}
      </span>
    </div>
  </div>
  <ShareModal @onClose="onClose" />
  <MagforwardingPopup @confirm="confirm" ref="wardingRef" />
</template>

<script>
import emitter from "@/utils/mitt-bus";
import { createForwardMsg, createMergerMsg, deleteMessage, sendMsg } from "@/api/im-sdk-api/index";
import { showConfirmationBox } from "@/utils/message";
import { mapMutations, mapState } from "vuex";
import MagforwardingPopup from "./MagforwardingPopup.vue";
import ShareModal from "@/views/components/ShareModal/index.vue";

const buttonList = [
  {
    type: "share",
    value: "截图分享",
    icon: "share",
    class: "",
  },
  {
    type: "MergeForward",
    value: "合并转发",
    icon: "mergeForward",
    class: "", // noDrop
  },
  {
    type: "ForwardItemByItem",
    value: "逐条转发",
    icon: "aQuickForward",
    class: "",
  },
  {
    type: "removalMsg",
    value: "删除消息",
    icon: "delete",
    class: "",
  },
];

export default {
  name: "MultiChoiceBox",
  data() {
    return {
      buttonList,
      multipleValue: null,
    };
  },
  components: {
    ShareModal,
    MagforwardingPopup,
  },
  computed: {
    ...mapState({
      isChatBoxVisible: (state) => state.conversation.isChatBoxVisible,
      forwardData: (state) => state.conversation.forwardData,
      showCheckbox: (state) => state.conversation.showCheckbox,
      userProfile: (state) => state.user.userProfile,
      conversationList: (state) => state.conversation.conversationList,
      currentConversation: (state) => state.conversation.currentConversation,
    }),
    disabled() {
      return this.forwardData.size == 0;
    },
  },
  methods: {
    ...mapMutations(["setCheckboxState"]),
    onClock(item) {
      switch (item.type) {
        case "share": // 截图分享
          emitter.emit("handleShareModal");
          break;
        case "MergeForward": // 合并转发
          this.setDialogVisible(item.type);
          break;
        case "ForwardItemByItem": // 逐条转发
          this.setDialogVisible(item.type);
          break;
        case "removalMsg":
          this.deleteMsg(); // 删除消息
          break;
      }
    },
    handleConfirm(type) {
      switch (type) {
        case "MergeForward": // 合并转发
          this.mergeForward();
          break;
        case "ForwardItemByItem": // 逐条转发
          this.aQuickForward();
          break;
      }
    },
    confirm({ value, type }) {
      this.setMultipleValue(value);
      this.handleConfirm(type);
    },
    onClose() {
      this.shutdown();
    },
    // 多选删除
    async deleteMsg() {
      const result = await showConfirmationBox({ message: "确定删除?", iconType: "warning" });
      if (result == "cancel") return;
      const { code, messageList } = await deleteMessage([...this.filterate()]);
      if (code !== 0) return;
      this.$store.commit("removeMessage", {
        convId: this.currentConversation.conversationID,
        message: messageList,
      });
      this.shutdown();
    },
    transformData(data) {
      return data.map((item) => {
        if (item.type === "TIMTextElem") {
          return `${item.nick}: ${item.payload.text}`;
        } else if (item.type === "TIMImageElem") {
          return `${item.nick}: [图片]`;
        } else if (item.type === "TIMFileElem") {
          return `${item.nick}: [文件]`;
        } else if (item.type === "TIMRelayElem") {
          return `${item.nick}: [合并消息]`;
        } else if (item.type === "TIMCustomElem") {
          return `${item.nick}: [自定义消息]`;
        } else {
          return `${item.nick}: [待开发]`;
        }
      });
    },
    mergeTitle() {
      const { type, userProfile } = this.currentConversation || {};
      const self = this.userProfile.nick;
      return type == "GROUP" ? "群聊" : `${userProfile?.nick}和${self}的聊天记录`;
    },
    // 合并转发
    async mergeForward() {
      if (!this.multipleValue) return;
      const { toAccount, type } = this.multipleValue; // 选中转发 人 群 详细信息
      const forwardData = this.filterate();
      const forwardMsg = await createMergerMsg({
        title: this.mergeTitle(),
        convId: toAccount,
        convType: type,
        abstractList: this.transformData(forwardData),
        List: forwardData,
      });
      const { code, message: data } = await sendMsg(forwardMsg);
      if (code == 0) {
        const { conversationID } = data || "";
        this.$store.commit("updateHistoryMessageCache", {
          convId: conversationID,
          message: [data],
        });
      }
      this.shutdown();
    },
    // 逐条转发
    async aQuickForward() {
      const forwardData = this.filterate();
      if (!this.multipleValue) return;
      const { toAccount, type } = this.multipleValue;
      forwardData.map(async (t) => {
        await this.sendSingleMessage({
          convId: toAccount,
          message: t,
          type,
        });
      });
      this.shutdown();
    },
    async sendSingleMessage({ convId, type, message }) {
      const forwardMsg = await createForwardMsg({
        convId: convId,
        convType: type,
        message: message,
      });
      const { code, message: data } = await sendMsg(forwardMsg);
      if (code == 0) {
        const { conversationID } = data || "";
        this.$store.commit("updateHistoryMessageCache", {
          convId: conversationID,
          message: [data],
        });
      }
    },
    filterate() {
      let myObj = Object.fromEntries(this.forwardData);
      const obj = Object.values(myObj).map((item) => item);
      return obj.sort((a, b) => a.clientTime - b.clientTime);
    },
    shutdown() {
      // 清空多选数据
      this.$store.commit("setForwardData", {
        type: "clear",
        payload: null,
      });
      // 关闭多选框
      this.setCheckboxState(false);
      this.closedState();
      this.setMultipleValue();
    },
    closedState() {
      const checkBoxElements = Array.from(document.querySelectorAll(".check-btn"));
      const messageElement = document.querySelector(".message-view");
      const childElements = Array.from(messageElement.children);
      checkBoxElements.forEach((t) => {
        t.checked = false;
      });
      childElements.forEach((t) => {
        t.classList.remove("style-select");
      });
    },
    setDialogVisible(type = "") {
      this.$refs.wardingRef.openPopup(type);
    },
    setMultipleValue(value = null) {
      this.multipleValue = value;
    },
  },
};
</script>
<style lang="scss">
.tabulation-style {
  height: 400px;
  max-height: 400px;
  overflow: auto;
  .tabulationHover {
    background: hsl(220, 20%, 91%);
  }
  img {
    height: 60%;
    border-radius: 5px;
    margin-right: 10px;
  }
  & > div {
    height: 52px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    border-radius: 5px;
  }
  :hover {
    background: hsl(220, 20%, 91%);
  }
}
</style>
<style lang="scss" scoped>
.checkbox-style {
  position: relative;
  z-index: 1;
  height: 206px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-top: 1px solid var(--color-border-default);
  .close {
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 22px;
    color: rgb(140, 140, 140);
  }
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  svg {
    color: rgb(128, 128, 128);
  }
}
.icon {
  @include flex-center;
  width: 56px;
  height: 56px;
  background: #e5e6eb;
  border-radius: 50%;
  cursor: pointer;
  .svg-icon {
    font-size: 22px;
  }
}
.disabled {
  cursor: not-allowed !important;
  opacity: 0.25;
  pointer-events: none;
}
.noDrop {
  cursor: no-drop;
}
.text {
  user-select: none;
  margin-top: 8px;
}
</style>
