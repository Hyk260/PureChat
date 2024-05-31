import { DomEditor } from "@wangeditor/editor";

function getMentionConfig(editor) {
  const { EXTEND_CONF } = editor.getConfig();
  const { mentionConfig } = EXTEND_CONF;
  return mentionConfig;
}

function withMention(editor) {
  const { insertText, isInline, isVoid } = editor;
  const newEditor = editor;
  // mention 相关配置
  const { showModal, hideModal, pinyinSearch } = getMentionConfig(newEditor);

  function hide() {
    if (hideModal && !pinyinSearch) hideModal(newEditor);
  }

  function hideOnChange() {
    if (newEditor.selection != null) {
      hide();
      newEditor.off("change", hideOnChange);
    }
  }
  // 重写 insertText
  newEditor.insertText = (t) => {
    // 选过选中了 void 元素
    const elems = DomEditor.getSelectedElems(newEditor);
    const isSelectedVoidElem = elems.some((elem) => newEditor.isVoid(elem));
    if (isSelectedVoidElem) {
      insertText(t);
      return;
    }
    if (t === "@") {
      setTimeout(() => {
        if (showModal) {
          showModal(newEditor);
        }
        setTimeout(() => {
          newEditor.once("fullScreen", hide);
          newEditor.once("unFullScreen", hide);
          newEditor.once("scroll", hide);
          newEditor.once("modalOrPanelShow", hide);
          newEditor.once("modalOrPanelHide", hide);
          newEditor.on("change", hideOnChange);
        });
      });
    }
    insertText(t);
  };

  newEditor.isInline = (elem) => {
    const type = DomEditor.getNodeType(elem);
    if (type === "mention") return true;
    return isInline(elem);
  };

  newEditor.isVoid = (elem) => {
    const type = DomEditor.getNodeType(elem);
    if (type === "mention") return true;
    return isVoid(elem);
  };
  return newEditor;
}

export default withMention;
