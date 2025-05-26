import { DomEditor } from "@wangeditor/editor";

function withAttachment(editor) {
  const { isInline, isVoid } = editor;

  editor.isInline = (elem) => DomEditor.getNodeType(elem) === "attachment" || isInline(elem);

  editor.isVoid = (elem) => DomEditor.getNodeType(elem) === "attachment" || isVoid(elem);

  return editor;
}

export default withAttachment;
