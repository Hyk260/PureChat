<template>
  <div @click="addItem()" class="message-view_withdraw">
    {{ getChangeType() }}
  </div>
</template>

<script>
import {
  toRefs,
  reactive,
  defineComponent,
  onMounted,
  onBeforeUnmount,
} from "vue";
import {
  CONVERSATIONTYPE,
  GET_MESSAGE_LIST,
  HISTORY_MESSAGE_COUNT,
} from "@/store/mutation-types";
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";
export default defineComponent({
  name: "TipElement",
  components: {},
  directives: {},
  emits: [],
  props: {
    message: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapState({
      currentConversation: (state) => state.conversation.currentConversation,
    }),
    ...mapGetters(["toAccount", "isOwner", "tabList"]),
  },
  data() {
    return {
      text: "test",
      extra: [],
    };
  },
  methods: {
    ...mapMutations(["SET_NETWORK_STATUS"]),
    ...mapActions([GET_MESSAGE_LIST]),
    // this[GET_MESSAGE_LIST]();
    // this.SET_NETWORK_STATUS();
    addItem() {
      console.log(this.tabList);
    },
    removeItem() {},
  },
  setup(props, { attrs, emit, expose, slots }) {
    const { message } = toRefs(props);
    const state = reactive({
      visible: false,
      isMoving: false,
      interval: 0,
    });
    const getChangeType = () => {
      const { conversationType, flow, from, nick } = message.value;
      const isMine = flow == "out";
      if (conversationType === "C2C" && !isMine) {
        return "对方撤回了一条消息";
      }
      if (conversationType === "GROUP" && !isMine) {
        return `${nick}撤回了一条消息`;
      }
      return "你撤回了一条消息";
    };
    onMounted(() => {});

    onBeforeUnmount(() => {});
    return {
      getChangeType,
      ...toRefs(state),
    };
  },
  // render() {
  //   return (
  //     <div class="message-view_withdraw" onClick={this.addItem()}>
  //       {this.getChangeType()}
  //     </div>
  //   );
  // },
});
</script>

<style lang="scss" scoped>
.message-view_withdraw {
  font-size: 12px;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.05);
  vertical-align: middle;
  word-wrap: normal;
  word-break: break-all;
  color: rgba(0, 0, 0, 0.45);
  margin-top: 5px;
  padding: 4px 6px;
  line-height: 16px;
  justify-content: center;
}
</style>
