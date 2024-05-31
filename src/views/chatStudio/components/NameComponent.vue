<template>
  <div class="message_name" v-show="this.isGroup && !shouldDisplay">
    <span v-if="isSystem" class="isSystem">系统通知</span>
    <span v-else-if="isFound" class="isFound">管理员</span>
    <span v-else-if="isGroup" class="isGroup" @click="handleAt">
      <span :class="styleNick">{{ item.nick }}</span>
      <span class="mention">@</span>
      <span class="admin" v-if="isLeader">群主</span>
    </span>
  </div>
</template>

<script>
import emitter from "@/utils/mitt-bus";
import { mapGetters, mapState } from "vuex";
export default {
  name: "NameComponent",
  props: {
    item: Object,
  },
  computed: {
    ...mapGetters(["isOwner"]),
    ...mapState({
      showCheckbox: (state) => state.conversation.showCheckbox,
      groupProfile: (state) => state.groupinfo.groupProfile,
    }),
    isLeader() {
      return this.groupProfile?.ownerID === this.item.from;
    },
    from() {
      return this.item.from;
    },
    chatType() {
      return this.item.conversationType;
    },
    isGroup() {
      return this.chatType !== "C2C";
    },
    isSystem() {
      return this.from === "@TIM#SYSTEM";
    },
    isFound() {
      return this.from === "@TLS#NOT_FOUND";
    },
    shouldDisplay() {
      return this.item.isRevoked || this.item.type === "TIMGroupTipElem";
    },
    styleNick() {
      return this.showCheckbox ? "" : "nick";
    },
  },
  methods: {
    handleAt() {
      if (this.showCheckbox) return;
      emitter.emit("handleAt", { id: this.from, name: this.item.nick });
    },
  },
};
</script>

<style lang="scss" scoped>
.message_name {
  margin-bottom: 5px;
  color: var(--color-time-divider);
  font-size: 12px;
}
.admin {
  white-space: nowrap;
  background: #e6f7ff;
  border: 1px solid rgb(145, 213, 255);
  color: #1890ff;
  border-radius: 2px;
  font-size: 10px;
  padding: 0 4px;
  display: inline-block;
}
.isGroup {
  cursor: pointer;
  .mention {
    visibility: hidden;
  }
  &:hover {
    .mention,
    .nick {
      color: rgb(84, 180, 239);
      visibility: visible;
    }
  }
}
</style>
