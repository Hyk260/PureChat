<template>
  <div
    class="items-box"
    @click="onFriend({ id: item.GroupId || item.groupID || item.userID })"
    v-for="item in item"
    :key="item.GroupId || item.groupID || item.userID"
  >
    <div class="left-item">
      <UserAvatar
        words="3"
        shape="square"
        :convId="item.userID"
        :nickName="item.Name || item.name || item.nick"
        :url="item.avatar || ''"
        :type="isGroup ? 'group' : 'single'"
      />
    </div>
    <div class="right-item" :class="{ between: item.selfSignature }">
      <p>{{ item.Name || item.name || item.nick }}</p>
      <p class="describe">
        {{ item.selfSignature }}
      </p>
    </div>
  </div>
</template>

<script>
import { scrollToMessage } from "@/utils/chat/index";
export default {
  name: "CardGrid",
  props: {
    item: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: "GROUP", // C2C  GROUP
    },
  },
  computed: {
    isGroup() {
      return this.type === "GROUP";
    },
  },
  data() {
    return {};
  },
  methods: {
    onFriend({ id }) {
      // "GROUP" : "C2C";
      this.$store.commit("taggleOueSide", "message");
      this.$store.dispatch("CHEC_OUT_CONVERSATION", { convId: `${this.type}${id}` });
      scrollToMessage(`message_${this.type}${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.items-box {
  display: flex;
  min-height: 50px;
  border-radius: 6px;
  padding: 10px;
  cursor: pointer;
  width: 100%;
  &:hover {
    background: var(--hover-color);
  }
  .left-item {
    img {
      width: 40px;
      height: 40px;
    }
  }
  .right-item {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    padding-left: 10px;
    width: 100%;
    .describe {
      @include text-ellipsis;
      width: calc(100% - 40px);
      font-size: 12px;
      color: var(--color-time-divider);
    }
    .el-icon {
      cursor: pointer;
    }
  }
}
.between {
  justify-content: space-between !important;
}
</style>
