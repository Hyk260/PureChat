import { DomEditor } from "@wangeditor/editor";

function getMentionConfig(editor) {
  const { EXTEND_CONF } = editor.getConfig();
  return EXTEND_CONF?.mentionConfig || {};
}

function withMention(editor) {
  const { insertText, isInline, isVoid } = editor;
  const { showModal, hideModal, pinyinSearch } = getMentionConfig(editor);

  const hide = () => {
    if (hideModal && !pinyinSearch) {
      hideModal(editor);
    }
  }

  const hideOnChange = () => {
    if (editor.selection !== null) {
      hide();
      editor.off("change", hideOnChange);
    }
  }

  const setupHideListeners = () => {
    const events = [
      "fullScreen",
      "unFullScreen",
      "scroll",
      "modalOrPanelShow",
      "modalOrPanelHide"
    ];

    events.forEach(event => editor.once(event, hide));
    editor.on("change", hideOnChange);
  };

  editor.insertText = (text) => {
    const elems = DomEditor.getSelectedElems(editor);
    const isSelectedVoidElem = elems.some((elem) => editor.isVoid(elem));

    if (isSelectedVoidElem) {
      insertText(text);
      return;
    }

    if (text === "@") {
      setTimeout(() => {
        if (showModal) showModal(editor);
        setTimeout(setupHideListeners);
      });
    }

    insertText(text);
  };

  editor.isInline = (elem) => DomEditor.getNodeType(elem) === "mention" || isInline(elem);

  editor.isVoid = (elem) => DomEditor.getNodeType(elem) === "mention" || isVoid(elem);

  return editor;
}

export default withMention;
