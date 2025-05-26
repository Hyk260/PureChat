import { h } from "snabbdom";
import { DomEditor } from "@wangeditor/editor";

const mentionStyles = {
  base: {
    borderRadius: "3px",
    padding: "0 3px",
    color: "#54b4ef",
  },
  selected: {
    border: "2px solid var(--w-e-textarea-selected-border-color)",
  },
  unselected: {
    border: "2px solid transparent",
  },
};

const getMentionStyles = (isSelected) => ({
  ...mentionStyles.base,
  ...(isSelected ? mentionStyles.selected : mentionStyles.unselected),
});

function renderMention(elem, children, editor) {
  const isSelected = DomEditor.isNodeSelected(editor, elem);
  const value = elem.value?.trim() ?? "";

  const vnode = h(
    "span",
    {
      props: {
        contentEditable: false,
      },
      style: getMentionStyles(isSelected),
    },
    `@${value}`
  );
  
  return vnode;
}

const config = {
  type: "mention",
  renderElem: renderMention,
};

export default config;
