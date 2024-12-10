<template>
  <div
    v-for="item in filterList"
    :key="item.icon"
    :class="{
      selectd: active === item.id,
    }"
    class="list"
    @click="onClick(item)"
  >
    <div class="icon">
      <svg-icon v-if="item.type === 'svg'" :iconClass="item.icon" />
      <FontIcon v-else :iconName="item.icon" />
    </div>
    <div class="title">{{ item.title }}</div>
  </div>
</template>

<script>
import emitter from "@/utils/mitt-bus";

export default {
  name: "ListGrid",
  data() {
    return {
      list: [
        {
          id: "contacts",
          title: "常用联系人",
          icon: "ForkSpoon",
        },
        {
          id: "groupChat",
          title: "我的群聊",
          icon: "IceCreamRound",
        },
        {
          id: "aiModel",
          title: "AI大模型",
          icon: "robot",
          type: "svg",
        },
      ],
      active: "aiModel",
    };
  },
  computed: {
    filterList() {
      return this.list.filter((item) => {
        if (window?.__LOCAL_MODE) {
          return item.id === "aiModel";
        } else {
          return item;
        }
      });
    },
  },
  methods: {
    onClick(data) {
      this.active = data.id;
      emitter.emit("onActive", data);
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
}
.icon {
  height: 35px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.title {
  padding-left: 5px;
}
.selectd {
  background-color: var(--color-message-active);
  color: rgb(114, 184, 249);
  .el-icon {
    color: rgb(114, 184, 249);
  }
}
</style>
