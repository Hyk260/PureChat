<template>
  <div v-show="isVisible" class="mention-modal" :style="{ top: top, left: left }">
    <ul ref="listRef" class="mention-list">
      <el-scrollbar>
        <div class="mention-list-box">
          <li
            v-for="(item, i) in searchedList"
            :key="item.joinTime"
            :class="{ 'mention-active': isActive(item) }"
            @mouseover="setActive(i)"
            @click="handleAit(item.userID, item.nick)"
          >
            <UserAvatar
              words="1"
              shape="square"
              class-name="mention-avatar"
              :url="item.avatar"
              :type="item.avatar ? 'single' : 'group'"
              :nick-name="item.userID === magAtAll ? '@' : item.nick || item.userID"
            />
            <span class="nick truncate">{{ item.nick || item.userID }}</span>
          </li>
        </div>
      </el-scrollbar>
    </ul>
  </div>
</template>

<script lang="ts">
import { mapState } from "pinia";
import { onClickOutside, useEventListener } from "@vueuse/core";
import { cloneDeep } from "lodash-es";
import { prioritizeRBTUserID, insertMention } from "@/utils/chat";
import { useGroupStore, useChatStore } from "@/stores";
import emitter from "@/utils/mitt-bus";

const MSG_AT_ALL = "__kImSDK_MesssageAtALL__";

export default {
  name: "MentionModal",
  props: {
    // 群主
    isOwner: {
      type: Boolean,
      default: false,
    },
    // 是否开启拼音搜索
    pinyinSearch: {
      type: Boolean,
      default: false,
    },
    // 编辑器实例
    editor: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      top: "",
      left: "",
      list: [],
      filtering: "", // 搜索模式 all success empty
      searchValue: 0, // 模糊搜索内容长度
      tabIndex: 0,
      magAtAll: MSG_AT_ALL,
      allMembers: {
        joinTime: 0,
        userID: MSG_AT_ALL,
        nick: "全体成员",
      },
    };
  },
  computed: {
    ...mapState(useGroupStore, ["currentMemberList", "currentMembersWithoutSelf"]),
    searchedList() {
      // 群成员小于2人，不显示@列表
      if (this.currentMemberList.length <= 1) return [];
      return this.list;
    },
    isVisible() {
      return this.filtering !== "empty" && this.currentMemberList.length > 1;
    },
    currentMembersWithoutSelfList() {
      return this.currentMembersWithoutSelf.filter((t) => t.userID !== "@TLS#NOT_FOUND");
    },
  },
  created() {
    this.initList();
  },
  mounted() {
    document.body.appendChild(this.$el);
    this.initMention();
  },
  beforeUnmount() {
    emitter.off("handleInputKeyupHandler");
    emitter.off("setMentionModal");
    this.setMentionStatus(); // 隐藏 modal
  },
  methods: {
    initList(owner = this.isOwner, data = []) {
      this.list = this.filterList(data);
      // 仅群主支持@全员
      if (owner) this.list.unshift(this.allMembers);
    },
    filterList(data) {
      if (data.length) {
        return prioritizeRBTUserID(data);
      } else {
        return this.filterData();
      }
    },
    filterData() {
      const data = this.currentMembersWithoutSelfList;
      return prioritizeRBTUserID(data);
    },
    updateMention() {
      // 获取光标位置，定位 modal
      const domSelection = document.getSelection();
      const domRange = domSelection.getRangeAt(0);
      if (domRange == null) return;
      const selectionRect = domRange.getBoundingClientRect();
      // 获取编辑区域 DOM 节点的位置，以辅助定位
      // const containerRect = editor.getEditableContainer().getBoundingClientRect();
      const height = this.$refs.listRef?.clientHeight;
      // 定位 modal
      this.top = `${selectionRect.top - height - 15}px`;
      this.left = `${selectionRect.left + 5}px`;
    },
    initMention() {
      this.updateMention();
      onClickOutside(this.$refs.listRef, (event) => {
        this.setMentionStatus();
      });
      useEventListener(document, "keydown", (e) => {
        this.onKeydown(e);
      });
      emitter.on("handleInputKeyupHandler", (data) => {
        this.inputKeyupHandler(data);
      });
      emitter.on("setMentionModal", (data) => {
        const { content = [], type, searchlength = 0 } = cloneDeep(data);
        console.log(content, type, searchlength);
        this.filtering = type; // all success empty
        if (type === "all") {
          this.initList();
        } else if (type === "empty") {
          this.setMentionStatus();
        } else if (type === "success") {
          this.initList(false, content);
          this.searchValue = searchlength;
        }
        this.$nextTick(() => {
          this.updateMention();
        });
      });
    },
    setMentionStatus(status = false) {
      useChatStore().toggleMentionModal(status);
    },
    inputKeyupHandler(event) {
      if (event.key === "Enter") {
        const firstOne = this.searchedList[this.tabIndex];
        if (!firstOne) return;
        const { userID, nick } = firstOne;
        this.handleAit(userID, nick);
      }
    },
    handleAit(id, name) {
      let nick = name ? name : id;
      insertMention({ id, name: nick, deleteDigit: this.searchValue, editor: this.editor });
      this.setMentionStatus(); // 隐藏 modal
      this.searchValue = 0;
    },
    onKeydown(event) {
      switch (event.keyCode) {
        case 38: // 上
          if (this.tabIndex > 0) {
            this.tabIndex--;
            this.scrollToSelectedItem();
          }
          break;
        case 40: //下
          if (this.tabIndex < this.searchedList?.length - 1) {
            this.tabIndex++;
            this.scrollToSelectedItem();
          }
          break;
      }
    },
    setActive(i) {
      this.tabIndex = i;
    },
    isActive(item) {
      if (!item) return;
      if (this.tabIndex > -1) {
        return item?.userID == this.searchedList[this.tabIndex]?.userID;
      } else {
        return false;
      }
    },
    scrollToSelectedItem() {
      const element = document.querySelector(".mention-active");
      if (!element) return;
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    },
  },
};
</script>

<style lang="scss" scoped>
.mention-modal {
  position: fixed;
  z-index: 11;
  width: 168px;
  padding: 5px;
  border-radius: 5px;
  background-color: var(--color-body-bg);
  box-shadow: var(--el-box-shadow-lighter);
  border: 1px solid var(--color-border-default);
}
.mention-input {
  border: 1px solid #60626652;
  border-radius: 3px;
  width: 100px;
  outline: none;
}
.mention-list {
  .mention-list-box {
    max-height: 123px;
  }
  .nick {
    font-size: 14px;
    display: flex;
    align-items: center;
    margin-left: 5px;
    max-width: 125px;
  }
  li {
    cursor: pointer;
    padding: 3px 3px;
    text-align: left;
    height: 24px;
    border-radius: 4px;
    display: flex;
  }
}
.mention-active {
  background: var(--color-mention-active);
}
</style>
