<template>
  <el-popover
    ref="popoverRef"
    popper-class="popover-style"
    :visible="visible"
    :placement="placement"
    :show-arrow="false"
  >
    <!-- trigger="click" -->
    <!-- @after-enter="handleAfterEnter" -->
    <!-- v-model:visible="visible" -->
    <!-- @click.stop="handleClick" -->
    <!-- <template #reference>
      <el-avatar :size="36" shape="square" :src="circleUrl" />
    </template> -->
    <template #default>
      <div class="robot-box">
        <div class="title">
          <img :src="sculpture" alt="头像" />
          <span>ChatGPT</span>
        </div>
        <div class="content">
          <div class="characters">
            <span>
              一个基于自然语言处理的对话式AI技术机器人，可以解答你的各种问题！
            </span>
          </div>
        </div>
        <div class="footer">
          <el-button @click="define" type="primary">Primary</el-button>
        </div>
      </div>
    </template>
  </el-popover>
</template>

<script setup>
import { ref, reactive, toRefs, onMounted, onUnmounted } from "vue";
import { ElPopover, ElAvatar } from "element-plus";

const props = defineProps({
  circleUrl: String,
  content: String,
  // visible: Boolean,
  placement: {
    type: String,
    default: "right",
  },
});

const state = reactive({
  sculpture: require("@/assets/images/ChatGPT.png"),
  back: require("@/assets/images/gptBack.png"),
});
const { sculpture, back } = toRefs(state);
const visible = ref(false);
const popoverRef = ref();

const handleClick = () => {
  visible.value = !visible.value;
};
function handleDocumentClick() {
  console.log(popoverRef.value);
}
const define = () => {
  popoverRef.value.hide();
};

const handleClose = () => {
  popoverRef.value.hide();
};
// 在组件挂载时监听窗口滚动事件
onMounted(() => {
  console.log(123);
  window.addEventListener("scroll", handleClose);
});

// 在组件卸载时移除窗口滚动事件监听器
onUnmounted(() => {
  console.log(321);
  window.removeEventListener("scroll", handleClose);
});

// const handleAfterEnter = (el) => {
//   console.log(el);
//   // const popover = el.querySelector(".el-popover__popper");
//   // setPosition(popover);
// };

const setPosition = (popover) => {
  const avatar = document.querySelector(".my-popover__avatar");
  if (avatar && popover) {
    const avatarRect = avatar.getBoundingClientRect();
    const popoverRect = popover.getBoundingClientRect();
    const top = avatarRect.top - popoverRect.height - 12;
    const left = avatarRect.left + avatarRect.width / 2 - popoverRect.width / 2;
    popover.style.top = `${top}px`;
    popover.style.left = `${left}px`;
  }
};
</script>

<style lang="scss" scoped>
.my-popover__avatar {
  cursor: pointer;
}
.robot-box {
  width: 320px;
  height: 220px;
  padding: 24px;
  background: url(../../../assets/images/gptBack.png);
  background-size: 320px;
  .title {
    height: 54px;
    img {
      height: 54px;
    }
    span {
      margin-left: 16px;
      font-family: MicrosoftYaHei;
      font-size: 18px;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 400;
    }
  }
  .content {
    padding: 24px 0;
    .characters {
      height: 38px;
    }
  }
  .footer {
    :deep(.el-button) {
      width: 100%;
    }
  }
}
</style>
