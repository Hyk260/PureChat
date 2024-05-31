import { DomEditor } from "@wangeditor/editor";
import { getFileType, renderFileIcon } from "@/utils/chat/index";
import { h } from "snabbdom";
/**
 * @param elem 附件元素，即上文的 myResume
 * @param children 元素子节点，void 元素可忽略
 * @param editor 编辑器实例
 * @returns vnode 节点（通过 snabbdom.js 的 h 函数生成）
 */
function renderMention(elem, children, editor) {
  const { fileName = "", link = "", fileSize } = elem;
  const fileType = getFileType(fileName);
  const selected = DomEditor.isNodeSelected(editor, elem);
  // 附件 icon 图标 vnode
  const iconVnode = h("img", {
    props: { src: renderFileIcon(fileType) },
    style: {
      width: "40px",
      height: "40px",
      marginLeft: "12px",
    },
  });
  const nameVnode = h(
    "div",
    {
      style: {
        color: "rgba(0, 0, 0, 0.68)",
        fontSize: "14px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        width: "120px",
        textOverflow: "ellipsis",
      },
    },
    fileName
  );
  const sizeVnode = h(
    "div",
    {
      style: {
        fontWeight: "400",
        color: "#999999",
        lineHeight: "18px",
        fontSize: "12px",
      },
    },
    [h("span", fileSize)]
  );
  const divVnode = h(
    "div",
    {
      style: {
        marginLeft: "12px",
        display: "flex",
        flexDirection: "column",
        alignContent: "flex-start",
        justifyContent: "space-between",
        height: "40px",
      },
    },
    [nameVnode, sizeVnode]
  );
  const attachVnode = h(
    "div",
    {
      props: { contentEditable: false }, // HTML 属性，驼峰式写法
      style: {
        width: "200px",
        height: "60px",
        display: "inline-flex",
        alignItems: "center",
        borderRadius: "3px",
        border: selected // 选中/不选中，样式不一样
          ? "1px solid var(--w-e-textarea-selected-border-color)" // wangEditor 提供了 css var https://www.wangeditor.com/v5/theme.html
          : "1px solid #eeeeee",
        userSelect: "none",
      },
      on: {
        click() {
          console.log("clicked", editor);
        },
      },
    },
    [iconVnode, divVnode]
  );
  return attachVnode;
}

const config = {
  type: "attachment",
  renderElem: renderMention,
};

export default config;
