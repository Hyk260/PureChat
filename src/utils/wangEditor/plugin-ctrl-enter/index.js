import { DomEditor } from "@wangeditor/editor";

function withCtrlEnter(editor) {
  const { insertBreak } = editor;
  const newEditor = editor;

  setTimeout(() => {
    const { $textArea } = DomEditor.getTextarea(newEditor);
    if ($textArea === null) return;
    $textArea.on("keydown", (event) => {
      const isCtrl = event.ctrlKey || event.metaKey;
      if (event.key === "Enter" && isCtrl) {
        newEditor.insertBreak();
      }
    });
  });

  newEditor.insertBreak = () => {
    const event = window.event;
    const isCtrl = event.ctrlKey || event.metaKey;
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


