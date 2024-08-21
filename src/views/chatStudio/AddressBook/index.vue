<template>
  <div class="flex w-full">
    <div class="aside">
      <div class="head">通讯录</div>
      <ListGrid />
    </div>
    <div class="main h-full w-full">
      <div class="head px-10">{{ title }}</div>
      <div class="list">
        <div>
          <CardGrid v-if="active === 'ForkSpoon'" type="C2C" :item="friend" />
          <CardGrid v-else-if="active === 'Sugar'" type="C2C" :item="robotList" />
          <CardGrid v-else-if="active === 'IceCreamRound'" type="GROUP" :item="groupList" />
          <!-- <CardGrid v-else-if="active === 'CollectionTag'" type="GROUP" :item="groupListInfo" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ROBOT_COLLECT } from "@/ai/constant";
import { getUserProfile } from "@/api/im-sdk-api/index";
import emitter from "@/utils/mitt-bus";
import { mapState } from "vuex";
import CardGrid from "./CardGrid.vue";
import ListGrid from "./ListGrid.vue";

export default {
  name: "AddressBook",
  data() {
    return {
      title: "常用联系人",
      active: "ForkSpoon",
      friend: [],
      robotList: [],
      groupListInfo: [],
    };
  },
  components: {
    ListGrid,
    CardGrid,
  },
  computed: {
    ...mapState({
      groupList: (state) => state.groupinfo.groupList,
    }),
  },
  async mounted() {
    this.getFriend();
    this.getRobot();
    emitter.on("onActive", ({ icon, title }) => {
      this.active = icon;
      this.title = title;
    });
    this.$store.dispatch("getGroupList");
  },
  methods: {
    // 获取机器人列表
    async getRobot() {
      const { code, data } = await getUserProfile(ROBOT_COLLECT);
      this.robotList = data;
    },
    // 获取好友列表
    async getFriend() {
      let list = ["huangyk", "admin", "linjx", "jinwx", "zhangal"];
      const { code, data } = await getUserProfile(list);
      this.friend = data;
    },
  },
};
</script>

<style lang="scss" scoped>
.aside {
  width: 180px;
  min-width: 180px;
  height: 100%;
  padding: 3px 8px 8px;
  border-right: 1px solid var(--color-border-default);
}
.head {
  height: 36px;
  display: flex;
  align-items: center;
}
.list {
  height: calc(100% - 36px);
  overflow: auto;
}
</style>
