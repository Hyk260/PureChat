<template>
  <div>
    <p>设置主题色</p>
    <el-button type="primary" @click="setTheme('light')">白色</el-button>
    <el-button type="primary" @click="setTheme('dark')">黑色</el-button>
    <br />

    <p>礼花🎉</p>
    <el-button type="primary" @click="confetti()">🎉</el-button>
    <br />

    <p>useBoolean {{ flag }}</p>
    <el-button type="primary" @click="setFlag(true)">true</el-button>
    <el-button type="primary" @click="setFlag(false)">false</el-button>
    <br />

    <el-button v-for="{ title, onclick } in buttons" :key="title" type="primary" @click="onclick">
      {{ title }}
    </el-button>

    <el-button type="primary" @click="test">测试</el-button>
    <el-button type="primary" @click="test1">获取群组列表</el-button>
    <el-button type="primary" @click="test2"> 查询帐号 </el-button>
    <el-button type="primary" @click="test3"> 拉取运营数据 </el-button>
  </div>
</template>

<script>
import { setTheme } from "@/utils/common";
import { useBoolean } from "@/utils/hooks/index";
import { defineComponent } from "vue";
import { mapActions, mapMutations, mapState } from "vuex";
const [flag, setFlag] = useBoolean();

export default defineComponent({
  name: "Test",
  computed: {
    ...mapState({
      appearance: (state) => state.settings.appearance,
      groupList: (state) => state.groupinfo.groupList,
      timProxy: (state) => state.user.timProxy,
    }),
  },
  props: {},
  data() {
    return {
      flag,
      setFlag,
      setTheme,
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
          title: "设置Cookes",
          onclick: () => this.setCookies(),
        },
        {
          title: "获取Cookes",
          onclick: () => this.getCookies(),
        },
        {
          title: "单发单聊消息",
          onclick: () => this.sendMsg(),
        },
        {
          title: "环境变量",
          onclick: () => {
            this.timProxy.saveSelfToLocalStorage();
            console.log(this.timProxy);
            console.log(process.env);
          },
        },
        {
          title: "openapi",
          onclick: async () => {
            await this.callApi();
          },
        },
      ],
    };
  },
  methods: {
    ...mapMutations(["TAGGLE_OUE_SIDE", "UPDATE_USER_SETUP"]),
    ...mapActions(["getGroupList", "CHEC_OUT_CONVERSATION"]),
    confetti() {
      if (!confetti) return;
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    },
    openSetup() {
      // emitter.emit("openSetup", true);
    },
    test() {},
    test1() {},
    async test3() {},
    setCookies() {},
    getCookies() {},
    sendMsg() {},
    async test2() {},
    handleGroupClick(groupID) {
      this.TAGGLE_OUE_SIDE("message");
      this.CHEC_OUT_CONVERSATION({ convId: `GROUP${groupID}` });
    },
    fileupload() {},
    async callApi() {},
  },
});
</script>

<style lang="scss" scoped></style>
