<template>
  <div class="message-name" v-show="this.isGroup && !shouldDisplay">
    <span v-if="isSystem" class="isSystem">系统通知</span>
    <span v-else-if="isFound" class="isFound">管理员</span>
    <span
      v-else-if="isGroup"
      class="isGroup"
      :class="{ 'mention-self': isSelf(item) }"
      @click="handleAt"
    >
      <span :class="styleNick">{{ item.nick || item.from }}</span>
      <span class="mention" v-if="!isSelf(item)">@</span>
      <span class="admin" v-if="isLeader">群主</span>
    </span>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { isSelf } from "../utils/utils";
import { useGroupStore } from "@/stores/modules/group/index";
import store from "@/store/index";
import emitter from "@/utils/mitt-bus";

export default {
  name: "NameComponent",
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isSelf,
    };
  },
  computed: {
    ...mapState(useGroupStore, ["groupProfile"]),
    showCheckbox() {
      return store.state.conversation.showCheckbox;
    },
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
      if (isSelf(this.item)) return;
      emitter.emit("handleAt", { id: this.from, name: this.item.nick });
    },
  },
};
</script>

<style lang="scss" scoped>
.message-name {
  margin-bottom: 5px;
  white-space: nowrap;
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
.mention-self {
  display: flex;
  flex-direction: row-reverse;
  .admin {
    margin-right: 6px;
  }
}
</style>
