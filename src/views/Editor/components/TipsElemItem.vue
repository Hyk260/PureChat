<!-- <template>
  <div
    @click="addItem()"
    class="message-view_withdraw"
  >
    {{ getChangeType() }}
  </div>
</template> -->

<script>
import { toRefs, reactive, defineComponent } from "vue";
export default defineComponent({
  name: "TipElement",
  components: {},
  directives: {},
  props: {
    message: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      text: "test",
      extra: [],
    };
  },
  setup(props, { attrs, emit, expose, slots }) {
    const state = reactive({
      text: "wewe",
      visible: false,
      isMoving: false,
      interval: 0,
      abc: 1,
    });
    const getChangeType = () => {
      return "撤回一条消息";
    };
    return {
      getChangeType,
      ...toRefs(state),
    };
  },
  methods: {
    addItem(type = "item") {
      this.extra.push(type);
    },
    removeItem() {
      this.extra.pop();
    },
  },
  render() {
    return (
      <div class="message-view_withdraw" onClick={this.addItem()}>
        {this.getChangeType()}
      </div>
    );
  },
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
