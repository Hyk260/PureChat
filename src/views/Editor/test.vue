<template>
  <div>
    <el-button type="primary" @click="test1">获取群组列表</el-button>
    <el-button type="primary" @click="test2">获取 SDK 缓存的好友列表</el-button>
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
export default defineComponent({
  name: "Componentname",
  components: {},
  computed: {},
  props: {},
  data() {
    return {};
  },
  methods: {
    test1() {
      getGroupList();
    },
    test2() {
      getFriendList();
    },
  },
  setup(props, { attrs, emit, expose, slots }) {
    const state = reactive({ text: "wewe" });

    onMounted(() => {});
    onBeforeUnmount(() => {});
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped></style>
