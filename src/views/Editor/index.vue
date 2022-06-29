# 编辑器
<template>
  <div class="list-container">
    <div class="message-left">
      <div class="header-bar"></div>
      <el-scrollbar class="scrollbar-list">
        <p v-for="item in 20" :key="item" class="scrollbar-item">{{ item }}</p>
      </el-scrollbar>
    </div>
    <div class="message-right" id="svgBox">
      <header class="message-info-view-header"></header>
      <section
        class="message-info-view-content"
        id="svgTop"
        :style="{ height: `calc( 100% - 70px - ${newRect}px )` }"
      >
        <el-scrollbar class="scrollbar-content">
          <p v-for="item in 20" :key="item" class="scrollbar-item">
            {{ item }}
          </p>
        </el-scrollbar>
      </section>
      <div id="svgResize" @mouseover="dragControllerDiv"></div>
      <div
        class="Editor-style"
        id="svgDown"
        :style="{ height: msgHeight + 'px' }"
      >
        <Toolbar
          class="toolbar"
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
        />
        <Editor
          class="editor-content"
          v-model="valueHtml"
          :defaultConfig="editorConfig"
          @onCreated="handleCreated"
          @customPaste="customPaste"
          @keyup.enter="handleEnter"
        />
        <!-- @contextmenu.prevent -->
        <el-tooltip
          class="item"
          effect="dark"
          content="按Enter发送消息,Enter+Shift换行"
          placement="left-start"
          :open-delay="800"
        >
          <div class="btn-send" @click="sendMessage">发送</div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup>
import "@wangeditor/editor/dist/css/style.css";
import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref("");
const newRect = ref(206);
const msgHeight = ref(206);


// 模拟 ajax 异步获取内容
onMounted(() => {
  // setTimeout(() => {
  //     valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
  // }, 1500)
});

// 工具栏配置
const toolbarConfig = {
  /* 显示哪些菜单，如何排序、分组 */
  toolbarKeys: [
    "emotion", //表情
    "uploadImage",
    {
      key: "group-more-style", // 必填，要以 group 开头
      title: "更多样式", // 必填
      iconSvg: "<svg>....</svg>", // 可选
      menuKeys: ["through", "code", "clearStyle"], // 下级菜单 key ，必填
    },
  ],
  // insertKeys: {
  //   index: 2, // 插入的位置，基于当前的 toolbarKeys
  //   keys: ["menu-key1", "menu-key2"],
  // },
  /* 隐藏哪些菜单 */
  excludeKeys: [],
};

// 编辑器配置
const editorConfig = {
  placeholder: "请输入内容...",
  /* 菜单配置 */
  MENU_CONF: {},
};

const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！

  // 查看所有工具栏key
  console.log(editor.getAllMenuKeys());
  console.log(editor.getConfig());
};
// 回车
const handleEnter = () => {
  console.log("huiche");
};
// 发送消息
const sendMessage = () => {};
// 粘贴事件
const customPaste = (editor, event, callback) => {
  console.log(editor);
  console.log("ClipboardEvent 粘贴事件对象", event);
  // const html = event.clipboardData.getData("text/html"); // 获取粘贴的 html
  // const text = event.clipboardData.getData("text/plain"); // 获取粘贴的纯文本
  // const rtf = event.clipboardData.getData("text/rtf"); // 获取 rtf 数据（如从 word wsp 复制粘贴）
  // // console.log(html);
  // console.log(text);
  // console.log(rtf);

  if (event.clipboardData && event.clipboardData.items) {
    const items = event.clipboardData.items;
    console.log(items);
    // for (const { index, key } of items) {
    //   console.log(key);
    // }
  }

  // 自定义插入内容
  // editor.insertText("xxx");

  // 返回 false ，阻止默认粘贴行为
  event.preventDefault();
  callback(false); // 返回值（注意，vue 事件的返回值，不能用 return）

  // 返回 true ，继续默认的粘贴行为
  // callback(true)
};

const dragControllerDiv = () => {
  let svgResize = document.getElementById("svgResize");
  let svgTop = document.getElementById("svgTop");
  let svgDown = document.getElementById("svgDown");
  let svgBox = document.getElementById("svgBox");
  // 按下鼠标执行
  svgResize.onmousedown = (e) => {
    let startY = e.clientY; //鼠标按下 起始Y
    console.log(startY);
    svgResize.top = svgResize.offsetTop;
    // 事件会在鼠标指针移到指定的对象时发生。
    document.onmousemove = function (e) {
      let endY = e.clientY; //鼠标移动 结束得y
      //移动距离 = 原来高度+（结束y-开始y）
      let moveLen = svgResize.top + (endY - startY);
      // 最大移动距离 = 整个盒子高度 - 现在高度
      let maxT = svgBox.clientHeight - svgResize.offsetHeight;
      // 控制移动最小
      if (moveLen < 200) moveLen = 200;
      // 控制移动最大
      if (moveLen > maxT - 200) moveLen = maxT - 200;
      console.log(moveLen);
      svgResize.style.top = moveLen;
      svgTop.style.height = moveLen + "px";

      svgDown.style.height = svgBox.clientHeight - moveLen - 8 + "px";
    };
    // 鼠标按键被松开时执行
    document.onmouseup = (evt) => {
      document.onmousemove = null;
      document.onmouseup = null;
      svgDown.style.height = msgHeight.value + "px";
      // this.svgDownHeight = parseInt(svgDown.style.height)
      svgResize.releaseCapture && svgResize.releaseCapture();
    };
    svgResize.setCapture && svgResize.setCapture();
    return false;
  };
};

// 组件销毁时，及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
</script>

<style lang="scss" scoped>
.Editor-style {
  height: 206px;
  .toolbar {
    // border-bottom: 1px solid #ccc
    // 表情
    ::v-deep .w-e-bar-item .w-e-drop-panel {
      top: -292px;
      margin: 0;
    }
  }
  .editor-content {
    // height: 500px;
    height: calc(100% - 40px) !important;
    overflow-y: hidden;
    ::v-deep .w-e-text-container p {
      margin: 0;
    }
    ::v-deep .w-e-text-placeholder {
      top: 2px;
    }
  }
}
.list-container {
  width: 100%;
  height: 100%;
  display: flex;
}

.message-left {
  width: 280px;
}
.message-right {
  background: #fff;
  border-left: 1px solid rgba(0, 0, 0, 0.09);
  width: calc(100% - 280px);
}
.message-info-view-header {
  height: 60px;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
}
.message-info-view-content {
  height: calc(100% - 70px - 206px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
}
.header-bar {
  background: #fff;
  height: 60px;
}
.scrollbar-list {
  background: #fff;
  height: calc(100% - 60px);
}
.scrollbar-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
.btn-send {
  cursor: pointer;
  position: absolute;
  bottom: 8px;
  right: 16px;
  padding: 6px 6px 4px 4px;
  line-height: 20px;
  width: 60px;
  background-color: #f44336;
  color: #fff;
  border: 1px solid #e7e7e7;
  font-size: 14px;
  border-radius: 3px;
  text-align: center;
}
#svgResize {
  position: relative;
  height: 5px;
  // border-bottom: 1px solid rgba(0, 0, 0, 0.09);
  width: 100%;
  cursor: row-resize;
}
</style>
