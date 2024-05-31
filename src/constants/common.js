// token
export const ACCESS_TOKEN = "Access-Token";
// 用户设置
export const USER_SETUP = "User-Setup";
// 用户信息
export const USER_MODEL = "User-Model";
// 免登录信息
export const ACCOUNT = "ACCOUNT";
// 表情包最近使用
export const EMOJI_RECENTLY = "Emoji-Recently";
// im数据
export const TIM_PROXY = "timProxy";

export const GET_MESSAGE_LIST = "GET_MESSAGE_LIST"; //获取消息列表
export const HISTORY_MESSAGE_COUNT = 15; //历史消息计数
export const MULTIPLE_CHOICE_MAX = 20; //多选消息最大计数
export const MIN_RESIZE_HEIGHT = 250;

export const CONVERSATIONTYPE = {
  UPDATE_NOMORE: "UPDATE_NOMORE", //更新加载更多
  UPDATE_MESSAGES: "UPDATE_MESSAGES", //更新消息
  ADD_MORE_MESSAGE: "ADD_MORE_MESSAGE", //加载更多
  UPDATE_CURRENT_SESSION: "UPDATE_CURRENT_SESSION", // 更新当前会话
  UPDATE_CACHE: "UPDATE_CACHE", // 更新缓存
  ADD_MESSAGE: "ADD_MESSAGE", // 添加消息
  MARKE_MESSAGE_AS_READED: "MARKE_MESSAGE_AS_READED", //消息已读
  UPDATE_SCROLL_DOWN: "UPDATE_SCROLL_DOWN", //更新滚动条位置
  CLEAR_HISTORY: "CLEAR_HISTORY", //清除历史记录
  DELETE_MESSAGE: "DELETE_MESSAGE", //删除消息
  RECIVE_MESSAGE: "RECIVE_MESSAGE", //接收消息
  REPLACE_CONV_LIST: "REPLACE_CONV_LIST", // 更新会话列表
  UPDATE_CURRENT_SELECTED_CONVERSATION: "UPDATE_CURRENT_SELECTED_CONVERSATION", //跳转会话
};

// 请求头-内容类型
export const ContentType = {
  JSON: "application/json;charset=UTF-8",
  FORM: "application/x-www-form-urlencoded;charset=UTF-8",
  UPLOAD: "multipart/form-data",
  STREAM: "application/octet-stream;charset=UTF-8",
};
