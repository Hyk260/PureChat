import loading from '@/database/custom/loading.json';
import dithering from '@/database/custom/dithering.json';
import toolCall from '@/database/custom/tool_call.json';

const collection = {
  "dithering": dithering,
  "loading": loading,
  // "tool_call": toolCall,
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
  if (type === 'tool_call') {
    _data.data = data
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
