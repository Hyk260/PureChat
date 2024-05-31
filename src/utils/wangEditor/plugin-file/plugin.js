import { DomEditor } from "@wangeditor/editor";
/**
 * @description 一个函数，接收一个 Slate 编辑器对象，并返回一个修改后的版本，使其能够处理附件节点作为内联或空节点。
 * @param {Editor} editor - 要修改的 Slate 编辑器对象
 * @returns {Editor} 具有修改后的 isInline 和 isVoid 函数的新 Slate 编辑器对象
 */
function withMention(editor) {
  const { isInline, isVoid } = editor;
  const newEditor = editor;
  newEditor.isInline = (elem) => {
    const type = DomEditor.getNodeType(elem);
    if (type === "attachment") return true; // 针对 type: attachment ，设置为 inline
    return isInline(elem);
  };
  newEditor.isVoid = (elem) => {
    const type = DomEditor.getNodeType(elem);
    if (type === "attachment") return true; // 针对 type: attachment ，设置为 void
    return isVoid(elem);
  };
  return newEditor;
}

export default withMention;
