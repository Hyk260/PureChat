<template>
  <div>
    <el-button
      v-for="{ title, onclick } in buttons"
      :key="title"
      type="primary"
      @click="onclick"
    >
      {{ title }}
    </el-button>
    <el-button type="primary" @click="test1">获取群组列表</el-button>
    <el-button type="primary" @click="test2"> 查询帐号 </el-button>
    <el-button type="primary" @click="refresh"> Refresh </el-button>

    <div v-for="item in groupList" :key="item.groupID">
      <p @click="handleGroupClick(item.groupID)">
        {{ item.name }}
      </p>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  toRefs,
  reactive,
  onMounted,
  onBeforeUnmount,
} from "vue";
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";
import { getGroupList, getFriendList } from "@/api/im-sdk-api";
import { accountCheck } from "@/api/rest-api";
import io from "socket.io-client";

export default defineComponent({
  name: "Componentname",
  components: {},
  computed: {
    ...mapState({
      groupList: (state) => state.groupinfo.groupList,
    }),
  },
  props: {},
  data() {
    return {
      buttons: [
        {
          title: "文件上传",
          onclick: () => this.fileupload(),
        },
        {
          title: "设置",
          onclick: () => this.openSetup(),
        },
        {
          title: "地址本",
          onclick: () => this.openAddress(),
        },
      ],
      message: "Hello, world!",
    };
  },
  methods: {
    ...mapMutations(["TAGGLE_OUE_SIDE", "setAddbookStatus", "updateSettings"]),
    ...mapActions(["getGroupList", "CHEC_OUT_CONVERSATION"]),
    openAddress() {
      this.setAddbookStatus(true);
    },
    openSetup() {
      this.updateSettings({ key: "setswitch", value: true });
    },
    test1() {
      this.getGroupList();
    },
    async test2() {
      const res = await accountCheck({ userid: "wangj" });
      console.log(res);
    },
    handleGroupClick(groupID) {
      this.TAGGLE_OUE_SIDE("news");
      this.CHEC_OUT_CONVERSATION({ convId: `GROUP${groupID}` });
    },
    refresh() {},
    fileupload() {
      console.log(123);
    },
    handleonClick(key) {
      console.log(key);
    },
  },
  setup(props, { attrs, emit, expose, slots }) {
    const state = reactive({ text: "" });

    onMounted(() => {});
    onBeforeUnmount(() => {});
    return {
      accountCheck,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped></style>
