<template>
  <div>
    <el-button type="primary" @click="test1">获取群组列表</el-button>
    <el-button type="primary" @click="test2"> 查询帐号 </el-button>

    <!-- <el-button type="primary" @click="test2">获取 SDK 缓存的好友列表</el-button> -->

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
    return {};
  },
  methods: {
    ...mapMutations(["TAGGLE_OUE_SIDE"]),
    ...mapActions(["getGroupList", "CHEC_OUT_CONVERSATION"]),
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
  },
  setup(props, { attrs, emit, expose, slots }) {
    const state = reactive({ text: "wewe" });

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
