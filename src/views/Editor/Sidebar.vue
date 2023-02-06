<template>
  <el-aside width="68px">
    <div class="touxiang">
      <Portrait :size="40" shape="square" @click="dialogVisible = true" />
    </div>
    <!-- h -->
    <list-component :list="list" :active-index="activeIndex" @toggle="toggle" />
    <!-- list -->
    <!-- <ul v-for="item in list" :key="item.icon">
      <li class="aside-item" @click="active = item.icon">
        <div class="aside-list" :class="{ current: active == item.icon }">
          <svg-icon :iconClass="item.icon" class="style-svg" />
          <div class="icon-title">{{ item.title }}</div>
        </div>
      </li>
    </ul> -->

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
    icon: "yuying",
    title: "测试",
  },
];

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

function onClick() {
  console.log("Only triggered once when clicked many times quickly");
}

function toggle({ index, item }) {
  // window.TIMProxy.notifyMe();
  // window.TIMProxy.saveSelfToLocalStorage();
  commit("TAGGLE_OUE_SIDE", item);
  activeIndex.value = index;
}
// v-debounce-click:200="onClick"
const VDebounceClick = {
  mounted(el, binding) {
    const { arg, value } = binding;
    el.addEventListener("click", Debounce(value, arg), false);
  },
};

const ListComponent = (props, { slots, emit, attrs }) => {
  const { list, activeIndex } = props;
  // h 接收三个参数
  // type 元素的类型
  // propsOrChildren 数据对象, 这里主要表示(props, attrs, dom props, class 和 style)
  // children 子节点
  return h(
    "ul",
    list.map((item, index) => {
      return h(
        "li",
        {
          key: index,
          class: "aside-item",
          onClick: () => {
            emit("toggle", { index, item: item.icon });
          },
        },
        [
          h(
            "div",
            {
              class: ["aside-list", index === activeIndex ? "current" : ""],
            },
            h(SvgIcon, { iconClass: item.icon, class: "style-svg" }),
            h("div", { class: "icon-title" }, item.title)
          ),
        ]
      );
    })
  );
};

ListComponent.props = ["list", "activeIndex"];
</script>

<style lang="scss" scoped>
.el-aside {
  z-index: 9;
  box-shadow: 1px 0px 5px 0px rgb(0 0 0 / 10%);
  :deep(.aside-item) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  :deep(.style-svg) {
    color: #303133;
    font-size: 1.25rem;
  }
  :deep(.aside-list) {
    width: 54px;
    height: 54px;
    text-align: center;
    padding-top: 0.625rem;
    border-radius: 4px;
    cursor: pointer;
  }
  :deep(.current) {
    background: #d9ecff;
  }
  :deep(.icon-title) {
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
