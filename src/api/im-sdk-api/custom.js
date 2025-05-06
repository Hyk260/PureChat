import { loading, warning } from '@database/custom/index';

const collection = {
  "loading": loading,
  'warning': warning,
};

export function msgContent(data, type) {
  const _data = {
    data: {
      ...collection[type],
    },
    versions: __APP_INFO__.pkg.version,
    display: 0,
    onlyID: type,
    listMessage: ""
  };
  if (type === 'warning') {
    _data.data.body.text.value = data?.value || ""
    _data.data.body.text.provider = data?.provider || ""
  }
  return JSON.stringify(_data)
}

export function getCustomMsgContent({ data = null, type }) {
  return {
    data: msgContent(data, type),
    description: type,
    extension: "",
  }
}
