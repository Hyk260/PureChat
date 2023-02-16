<script>
import {
  defineComponent,
  toRefs,
  reactive,
  onMounted,
  h,
  onBeforeUnmount,
} from "vue";
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";
export default defineComponent({
  name: "Componentname",
  components: {},
  computed: {},
  props: {
    className: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    },
    nickName: {
      type: String,
      default: "",
    },
  },
  methods: {},
  setup(props, { attrs, emit, expose, slots }) {
    const { url, nickName } = toRefs(props);
    const displayInfo = (info) => {
      if (!info) {
        return "unknown";
      }
      return info.slice(0, 2).toUpperCase();
    };
    return {
      url,
      nickName,
      displayInfo,
    };
  },
  render() {
    return [
      this.url
        ? h("div", {
            class: `avatar default ${this.className}`,
            style: { backgroundImage: `url(${this.url})` },
          })
        : h(
            "div",
            { class: `avatar default ${this.className}` },
            this.displayInfo(this.nickName)
          ),
    ];
  },
});
</script>

<style lang="scss" scoped>
// div {
//   margin-right: 12px;
//   margin-bottom: 12px;
// }
.avatar {
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  background-position: 0 0;
  background-repeat: no-repeat;
  text-align: center;
  font-size: 12px;
  background-color: #5cadff;
  color: #ffffff;
  font-weight: 400;
}
.default {
  width: 40px;
  height: 40px;
  background-size: 40px 40px;
  line-height: 40px;
}
</style>
