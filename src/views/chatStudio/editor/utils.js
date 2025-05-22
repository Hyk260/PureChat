import { textExts } from '@shared/config/constant';

export const createMediaElement = (type, props) => ({
  type,
  ...props,
  children: [{ text: "" }]
});


export const insertEmoji = ({ url, item }, editor) => {
  if (!editor) {
    console.warn("editor is null")
    return
  }
  editor.restoreSelection();
  editor.insertNode(createMediaElement('image', {
    class: "EmoticonPack",
    src: url,
    alt: item,
    style: { width: "26px" }
  }));
  editor.focus(true);
};

export const TEXT_FILE_EXTENSIONS = new Set(
  textExts
);

export const isTextFile = (fileName) => {
  const extension = fileName.toLowerCase();
  return TEXT_FILE_EXTENSIONS.has(`.${extension}`);
};
