<template>
  <div class="items-box">
    <div class="left-item">
      <UserAvatar
        words="3"
        shape="square"
        :sessionId="item.userID"
        :nickName="item.name || item.nick"
        :url="item.avatar || ''"
        :type="isGroup ? 'group' : 'single'"
      />
    </div>
    <div class="right-item">
      <p>{{ item.Name || item.name || item.nick }}</p>
      <!-- <p v-if="false" class="describe">
        {{ item.selfSignature }}
      </p> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "CardGrid",
  props: {
    item: {
      type: Object,
      default: () => ({}),
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
};
</script>

<style lang="scss" scoped>
.items-box {
  display: flex;
  border-radius: 6px;

  cursor: pointer;
  width: 100%;
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
