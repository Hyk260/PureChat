<template>
  <div class="add-ress-book">
    <div class="aside">
      <div class="head">通讯录</div>
      <ListGrid />
    </div>
    <div class="list-right">
      <div class="head px-10">{{ title }}</div>
      <div class="list">
        <el-scrollbar>
          <div class="w-full">
            <CardGrid v-if="active === 'contacts'" type="C2C" :item="friend" />
            <CardGrid v-else-if="active === 'aiModel'" type="C2C" :item="robotList" />
            <CardGrid v-else-if="active === 'groupChat'" type="GROUP" :item="groupList" />
            <!-- <CardGrid v-else-if="active === ''" type="GROUP" :item="groupListInfo" /> -->
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import { ROBOT_COLLECT } from "@/ai/constant";
import { getUserProfile } from "@/api/im-sdk-api/index";
import { mapState } from "vuex";
import emitter from "@/utils/mitt-bus";
import CardGrid from "./CardGrid.vue";
import ListGrid from "./ListGrid.vue";

export default {
  name: "AddressBook",
  data() {
    return {
      title: "AI大模型",
      active: "aiModel",
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
    emitter.on("onActive", ({ id, title }) => {
      this.active = id;
      this.title = title;
    });
    this.$store.dispatch("getGroupList");
  },
  methods: {
    // 获取机器人列表
    async getRobot() {
      const { code, data } = await getUserProfile(ROBOT_COLLECT);
      console.log(data);
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
.add-ress-book {
  width: calc(100vw - 68px);
  display: flex;
}
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
  width: 100%;
  height: calc(100% - 36px);
}
.list-right {
  width: calc(100% - 180px);
  height: 100%;
}
</style>
