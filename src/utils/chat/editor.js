export const insertMention = (options) => {
  const {
    id,
    name,
    backward = true,
    deleteDigit = 0,
    editor = null,
  } = options

  if (!editor) {
    console.warn("editor is null")
    return
  }

  const mentionNode = {
    type: "mention",
    value: `${name} `,
    info: { id },
    children: [{ text: "" }],
  };

  // 恢复选区
  editor?.restoreSelection();
  // 删除 '@'
  if (!!deleteDigit) {
    for (let i = 0; i < deleteDigit; i++) {
      editor.deleteBackward("character");
    }
  } else if (backward) {
    editor.deleteBackward("character");
  }
  // 插入 mention
  editor.insertNode(mentionNode);
  // 移动光标
  editor.move(1);
};