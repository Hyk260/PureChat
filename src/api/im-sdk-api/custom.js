import loading from '@/database/custom/loading';
import dithering from '@/database/custom/dithering';
import toolCall from '@/database/custom/tool_call';
import warning from '@/database/custom/warning';

const collection = {
  "dithering": dithering,
  "loading": loading,
  'warning': warning,
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
