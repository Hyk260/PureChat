<template>
  <div class="mention-modal" :style="{ top: top, left: left }">
    <input
      class="mention-input"
      v-model="searchVal"
      ref="input"
      @keyup="inputKeyupHandler"
    />
    <ul class="mention-list">
      <el-scrollbar>
        <li
          v-for="item in searchedList"
          :key="item.joinTime"
          @click="insertMentionHandler(item.userID, item.nick)"
        >
          {{ item.nick }}
        </li>
      </el-scrollbar>
    </ul>
  </div>
</template>

<script>
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  computed,
  reactive,
  toRefs,
  ref,
} from "vue";
import TIM from "tim-js-sdk";
export default defineComponent({
  name: "MentionModal",
  props: {
    // 群组成员数据
    memberlist: {
      type: Object,
      default: () => {},
    },
    // 群主
    isOwner: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    // 根据 <input> value 筛选 list
    searchedList() {
      const searchVal = this.searchVal.trim().toLowerCase();
      return this.list.filter((item) => {
        const name = item.nick.toLowerCase();
        if (name.indexOf(searchVal) >= 0) {
          return true;
        }
        return false;
      });
    },
  },
  methods: {
    inputKeyupHandler(event) {
      // esc - 隐藏 modal
      if (event.key === "Escape") {
        this.$emit("hideMentionModal");
      }
      // enter - 插入 mention node
      if (event.key === "Enter") {
        // 插入第一个
        const firstOne = this.searchedList[0];
        if (firstOne) {
          console.log(firstOne);
          const { userID, nick } = firstOne;
          this.insertMentionHandler(userID, nick);
        }
      }
    },
    insertMentionHandler(id, name) {
      this.$emit("insertMention", id, name);
      this.$emit("hideMentionModal"); // 隐藏 modal
    },
  },
  setup(props, { attrs, emit, expose, slots }) {
    const input = ref(null);
    const { memberlist, isOwner } = toRefs(props);
    const state = reactive({
      // 定位信息
      top: "",
      left: "",
      // list 信息
      searchVal: "",
      list: [
        { joinTime: 0, userID: TIM.TYPES.MSG_AT_ALL, nick: "全体成员" },
        ...memberlist.value,
        // { id: "a", name: "A张三" },
      ],
    });

    onMounted(() => {
      if (!isOwner) {
        state.list.shift();
      }
      // 获取光标位置，定位 modal
      const domSelection = document.getSelection();
      const domRange = domSelection.getRangeAt(0);
      if (domRange == null) return;
      const selectionRect = domRange.getBoundingClientRect();
      // 获取编辑区域 DOM 节点的位置，以辅助定位
      // const containerRect = editor.getEditableContainer().getBoundingClientRect();
      // 定位 modal
      state.top = `${selectionRect.top + 20}px`;
      state.left = `${selectionRect.left + 5}px`;
      // focus input
      // input.value.focus();
    });

    onBeforeUnmount(() => {});

    return {
      input,
      // eslint-disable-next-line vue/no-dupe-keys
      memberlist,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
.mention-modal {
  position: fixed;
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 5px;
}
.mention-input {
  border: 1px solid #60626652;
  border-radius: 3px;
  width: 100px;
  outline: none;
}
.mention-list {
  height: 95px;
  overflow: hidden;
}
.mention-list li {
  cursor: pointer;
  padding: 3px 0;
  text-align: left;
  height: 24px;
}
.mention-modal ul li:hover {
  text-decoration: underline;
}
</style>
