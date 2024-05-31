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
        :nickName="item.Name || item.name || item.nick"
        :url="item.avatar || ''"
        :type="isGroup ? 'group' : 'single'"
      />
    </div>
    <div
      class="right-item"
      :class="{
        between: item.selfSignature,
      }"
    >
      <p>{{ item.Name || item.name || item.nick }}</p>
      <p class="describe">
        {{ item.selfSignature }}
      </p>
      <!-- <FontIcon
        iconName="Position"
        @click="onFriend({ id: item.GroupId || item.groupID || item.userID })"
      /> -->
    </div>
  </div>
</template>

<script>
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
    onFriend({ id, type = "C2C" }) {
      // "GROUP" : "C2C";
      this.$store.commit("TAGGLE_OUE_SIDE", "message");
      this.$store.dispatch("CHEC_OUT_CONVERSATION", { convId: `${this.type}${id}` });
      setTimeout(() => {
        const dom = document.getElementById(`message_C2C${id}`);
        if (!dom) return;
        dom.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
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
  box-sizing: border-box;
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
    .describe {
      @include text-ellipsis();
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
