<template>
  <el-aside width="68px">
    <div class="touxiang">
      <Portrait :size="40" shape="square" @click="dialogVisible = true" />
    </div>
    <ul>
      <li
        class="aside-item"
        v-for="item in list"
        :key="item.icon"
        @click="toggle(item)"
      >
        <div
          v-show="visibile(item)"
          class="aside-list"
          :class="{ current: outside == item.icon }"
        >
          <el-badge
            :value="unreadMsg"
            :hidden="item.icon !== 'news' || unreadMsg == 0"
          >
            <svg-icon
              v-if="item.icon !== 'test'"
              :iconClass="item.icon"
              class="style-svg"
            />
            <el-icon v-else><SwitchFilled /></el-icon>
          </el-badge>
          <div class="icon-title">{{ item.title }}</div>
        </div>
      </li>
    </ul>

    <!-- <el-dialog
      v-model="dialogVisible"
      append-to-body="true"
      title="上传头像"
      width="30%"
      draggable
    >
      <div>123</div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false"> 取消 </el-button>
          <el-button type="primary" @click="dialogVisible = false">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog> -->
  </el-aside>
</template>

<script setup>
import {
  h,
  ref,
  onActivated,
  onDeactivated,
  onMounted,
  onBeforeUnmount,
  watch,
  nextTick,
  reactive,
  toRefs,
} from "vue";
import { useStore } from "vuex";
import SvgIcon from "@/components/SvgIcon";
import { useState, useGetters } from "@/utils/hooks/useMapper";
const { production } = require("@/config/vue.custom.config");

const { state, dispatch, commit } = useStore();
const dialogVisible = ref(false);
const active = ref("news");
const activeIndex = ref(0);
const list = [
  {
    icon: "news",
    title: "消息",
  },
  {
    icon: "mail_list",
    title: "通讯录",
  },
  {
    icon: "application",
    title: "应用",
  },
  {
    icon: "test",
    title: "测试",
    show: production,
  },
];
const { outside, unreadMsg } = useState({
  unreadMsg: (state) => state.conversation.TotalUnreadMsg,
  outside: (state) => state.conversation.outside,
});
function visibile(item) {
  if (item.icon == "test" && item.show) {
    return false;
  } else {
    return true;
  }
}
function onClick() {
  console.log("Only triggered once when clicked many times quickly");
}

function toggle(item) {
  // window.TIMProxy.notifyMe();
  // window.TIMProxy.saveSelfToLocalStorage();
  commit("TAGGLE_OUE_SIDE", item.icon);
}
function Debounce(fn, delay, immediate) {
  let timer = null;
  return function () {
    const context = this,
      args = arguments;
    if (timer) clearTimeout(timer);
    if (immediate) {
      const execute = !timer;
      setTimeout(() => {
        timer = null;
      }, delay);
      if (execute) fn.apply(context, args);
    } else {
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    }
  };
}
// v-debounce-click:200="onClick"
const VDebounceClick = {
  mounted(el, binding) {
    const { arg, value } = binding;
    el.addEventListener("click", Debounce(value, arg), false);
  },
};
</script>

<style lang="scss" scoped>
.el-aside {
  z-index: 9;
  box-shadow: 1px 0px 5px 0px rgb(0 0 0 / 10%);
}
.aside-item {
  display: flex;
  justify-content: center;
  align-items: center;
  .aside-list {
    width: 54px;
    height: 54px;
    text-align: center;
    padding-top: 0.625rem;
    border-radius: 4px;
    cursor: pointer;
  }
  .style-svg {
    color: #303133;
    font-size: 1.25rem;
  }

  .current {
    background: #d9ecff;
  }
  .icon-title {
    color: var(--color-text);
    font-size: 12px;
    margin-top: 3px;
  }
}

.touxiang {
  height: 42px;
  margin: 16px 0 10px 0;
  text-align: center;
}
</style>
