import { DomEditor } from "@wangeditor/editor";

function withCtrlEnter(editor) {
  const { insertBreak } = editor;
  const newEditor = editor;

  setTimeout(() => {
    // beforeInput 事件不能识别 ctrl+enter ，所以自己绑定 DOM 事件
    const { $textArea } = DomEditor.getTextarea(newEditor);
    if ($textArea == null) return;
    $textArea.on("keydown", (event) => {
      const isCtrl = event.ctrlKey || event.metaKey;
      if (event.key === "Enter" && isCtrl) {
        // ctrl+enter 触发换行
        newEditor.insertBreak();
      }
    });
  });

  newEditor.insertBreak = () => {
    const event = window.event;
    const isCtrl = event.ctrlKey || event.metaKey;
    // 只有 ctrl 才能换行
    if (isCtrl) {
      insertBreak();
    }
  };
  return newEditor;
}

const module = {
  editorPlugin: withCtrlEnter,
};

export default module;
