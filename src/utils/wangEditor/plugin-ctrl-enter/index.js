import { DomEditor } from "@wangeditor/editor";

function withCtrlEnter(editor) {
  const { insertBreak } = editor;

  setTimeout(() => {
    const { $textArea } = DomEditor.getTextarea(editor);
    if ($textArea === null) return;
    
    $textArea.on("keydown", (event) => {
      const isCtrl = event.ctrlKey || event.metaKey;
      if (event.key === "Enter" && isCtrl) {
        editor.insertBreak();
      }
    });
  });

  editor.insertBreak = () => {
    const event = window.event;
    const isCtrl = event.ctrlKey || event.metaKey;
    if (isCtrl) {
      insertBreak();
    }
  };

  return editor;
}

export default {
  editorPlugin: withCtrlEnter,
};


