import { h } from "snabbdom";
import { DomEditor } from "@wangeditor/editor";
import { getFileType, renderFileIcon } from "@/utils/chat";
import emitter from "@/utils/mitt-bus";

const FILE_ICON_STYLE = {
  width: "40px",
  height: "40px",
  marginLeft: "12px",
};

const FILE_NAME_STYLE = {
  color: "rgba(0, 0, 0, 0.68)",
  fontSize: "14px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  width: "120px",
  textOverflow: "ellipsis",
};

const FILE_SIZE_STYLE = {
  fontWeight: "400",
  color: "#999999",
  lineHeight: "18px",
  fontSize: "12px",
};

const FILE_INFO_CONTAINER_STYLE = {
  marginLeft: "12px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "40px",
};

const getContainerStyle = (selected) => ({
  width: "200px",
  height: "60px",
  display: "flex",
  cursor: "pointer",
  alignItems: "center",
  borderRadius: "3px",
  // css var https://www.wangeditor.com/v5/theme.html
  border: selected
    ? "1px solid var(--w-e-textarea-selected-border-color)"
    : "1px solid rgb(0 0 0 / 20%)",
  userSelect: "none",
});

const handleClick = (data) => {
  // console.log("handleClick", data.elem);
  // emitter.emit('handleFileViewer', data.elem)
};

function renderFileAttachment(data) {
  const { fileName, fileType, fileSize, selected } = data

  return h(
    "div",
    {
      props: { contentEditable: false },
      style: getContainerStyle(selected),
      on: { click: handleClick(data) },
    },
    [
      h(
        "img",
        {
          props: { src: renderFileIcon(fileType) },
          style: FILE_ICON_STYLE,
        }
      ),
      h(
        "div",
        { style: FILE_INFO_CONTAINER_STYLE },
        [
          h("div", { style: FILE_NAME_STYLE }, fileName),
          h("div", { style: FILE_SIZE_STYLE }, [h("span", fileSize)]),
        ]
      ),
    ]
  );
}

function renderMention(elem, children, editor) {
  const { fileName = "", fileSize } = elem;
  const fileType = getFileType(fileName);
  const selected = DomEditor.isNodeSelected(editor, elem);

  return renderFileAttachment({ elem, fileName, fileType, fileSize, selected })
}

export default {
  type: "attachment",
  renderElem: renderMention,
}