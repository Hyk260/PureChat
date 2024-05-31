const loading = {
  data: {
    body: {
      bodyType: "loadingBody",
      text: {
        loadingIcon: "",
        value: "正在输入中...",
      },
    },
  },
};
const dithering = {
  data: {
    body: {
      text: {
        value: "你发送了一个窗口抖动。",
      },
    },
  },
};
const collection = {
  dithering,
  loading,
};

function constant({ onlyID, listMessage = "" }) {
  return {
    versions: "",
    display: 0,
    onlyID,
    listMessage,
  };
}

export function msgContent(type) {
  return {
    ...collection[type],
    ...constant({ onlyID: type }),
  };
}
