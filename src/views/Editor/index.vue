# 编辑器
<template>
  <div class="list-container">
    <div class="message-left">
      <div class="header-bar"></div>
      <el-scrollbar class="scrollbar-list">
        <p v-for="item in 20" :key="item" class="scrollbar-item">{{ item }}</p>
      </el-scrollbar>
    </div>
    <div class="message-right">
      <header class="message-info-view-header"></header>
      <section class="message-info-view-content">
        <el-scrollbar class="scrollbar-content">
          <p v-for="item in 20" :key="item" class="scrollbar-item">
            {{ item }}
          </p>
        </el-scrollbar>
      </section>
      <div class="Editor-style">
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
        />
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

// 模拟 ajax 异步获取内容
onMounted(() => {
  // setTimeout(() => {
  //     valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
  // }, 1500)
});

// 工具栏配置
const toolbarConfig = {
  /* 显示哪些菜单，如何排序、分组 */
  toolbarKeys: ["emotion"],
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
  }
  .editor-content {
    // height: 500px;
    height: calc(100% - 40px) !important;
    overflow-y: hidden;
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
</style>
