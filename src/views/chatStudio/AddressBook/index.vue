<template>
  <div class="flex w-full">
    <div class="aside">
      <div class="head">通讯录</div>
      <ListGrid />
    </div>
    <div class="main h-full w-full">
      <div class="head">{{ title }}</div>
      <div class="list">
        <el-scrollbar class="">
          <CardGrid v-if="active === 'ForkSpoon'" type="C2C" :item="friend" />
          <CardGrid v-else-if="active === 'Sugar'" type="C2C" :item="robotList" />
          <CardGrid v-else-if="active === 'IceCreamRound'" type="GROUP" :item="groupList" />
          <!-- <CardGrid v-else-if="active === 'CollectionTag'" type="GROUP" :item="groupListInfo" /> -->
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import { ROBOT_COLLECT } from "@/ai/constant";
import { getUserProfile } from "@/api/im-sdk-api/index";
import { restApi } from "@/api/node-admin-api/index";
import emitter from "@/utils/mitt-bus";
import { mapState } from "vuex";
import CardGrid from "./CardGrid";
import ListGrid from "./ListGrid";

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
    // this.getGroupList();
    this.$store.dispatch("getGroupList");
  },
  methods: {
    async getRobot() {
      let list = ROBOT_COLLECT;
      // 获取机器人列表
      const { code, data } = await getUserProfile(list);
      this.robotList = data;
    },
    async getFriend() {
      let list = ["huangyk", "admin", "linjx", "jinwx", "zhangal"];
      // 获取好友列表
      const { code, data } = await getUserProfile(list);
      this.friend = data;
    },
    async getGroupList() {
      const { GroupIdList } = await restApi({
        funName: "getAppidGroupList",
      });
      const result = GroupIdList.map((t) => t.GroupId);
      const { GroupInfo } = await restApi({
        params: result,
        funName: "getGroupInfo",
      });
      console.log(GroupInfo);
      this.groupListInfo = GroupInfo;
    },
    onFriend({ id, type = "C2C" }) {
      // "GROUP" : "C2C";
      this.$store.commit("TAGGLE_OUE_SIDE", "message");
      this.$store.dispatch("CHEC_OUT_CONVERSATION", { convId: `${type}${id}` });
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
.aside {
  width: 180px;
  min-width: 180px;
  height: 100%;
  padding: 3px 8px 8px;
  border-right: 1px solid #00000017;
}
.main {
  padding: 0 10px;
}
.head {
  height: 36px;
  display: flex;
  align-items: center;
}
.list {
  height: calc(100% - 36px);
}
</style>
