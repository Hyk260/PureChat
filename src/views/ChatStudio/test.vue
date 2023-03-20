<template>
  <div>
    <el-button type="primary" @click="setTheme('light')">白色</el-button>
    <el-button type="primary" @click="setTheme('dark')">黑色</el-button>
    <p>设置主题色 {{ theme }}</p>
    <br />
    <el-button type="primary" @click="setState(true)">true</el-button>
    <el-button type="primary" @click="setState(false)">false</el-button>
    <p>useToggle {{ state }}</p>
    <br />
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
import { getFriendList } from "@/api/im-sdk-api";
import { getGroupList } from "@/api/im-sdk-api/group";
import { accountCheck, restSendMsg } from "@/api/rest-api";
import { ACCESS_TOKEN } from "@/store/mutation-types";
import { setCookies, getCookies } from "@/utils/Cookies";
import { useDataThemeChange } from "@/utils/hooks/useDataThemeChange";
import { useToggle } from "@/utils/hooks/index";
import axios from "axios";
import io from "socket.io-client";

const variable = process.env;

export default defineComponent({
  name: "Test",
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
            console.log(variable);
          },
        },
        {
          title: "openapi",
          onclick: () => {
            this.callApi();
          },
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
    setCookies() {
      setCookies("key", "123", 10);
    },
    getCookies() {
      console.log(getCookies(ACCESS_TOKEN));
    },
    sendMsg() {
      restSendMsg();
    },
    async test2() {
      const res = await accountCheck({ userid: "admin" });
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
    callApi() {
      console.log(process.env.VUE_APP_API_URL);
      console.log(process.env.VUE_APP_API_KEY);
      // axios.defaults.withCredentials = true;
      const apiKey = process.env.VUE_APP_API_KEY;
      const prompt = "你好 叫什么名字";

      axios.defaults.headers.common["Authorization"] = `Bearer ${apiKey}`;
      axios.defaults.headers.post["Content-Type"] = "application/json";
      axios
        .post(
          process.env.VUE_APP_API_URL,
          {
            prompt: prompt,
            max_tokens: 128,
          }
          // {
          //   headers: {
          //     Authorization: `Bearer ${process.env.VUE_APP_API_KEY}`,
          //     "Access-Control-Allow-Credentials": "true",
          //     "Access-Control-Allow-Origin": "http://localhost:8082",
          //   },
          // }
        )
        .then((response) => {
          console.log(response.data.choices[0].text);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  setup(props, { attrs, emit, expose, slots }) {
    // const state = reactive({ text: "" });
    const { theme, setTheme } = useDataThemeChange();
    const [state, setState] = useToggle();

    onMounted(() => {});
    onBeforeUnmount(() => {});
    return {
      state,
      setState,
      theme,
      setTheme,
      accountCheck,
      // ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped></style>
