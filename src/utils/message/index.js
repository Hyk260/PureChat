import { ElMessage } from "element-plus";

// 消息
const Message = (message) => {
  return ElMessage({
    showClose: true,
    message
  });
};

// 成功
const successMessage = (message) => {
  return ElMessage({
    showClose: true,
    message,
    type: "success"
  });
};

// 警告
const warnMessage = (message) => {
  return ElMessage({
    showClose: true,
    message,
    type: "warning"
  });
};

// 失败
const errorMessage = (message) => {
  return ElMessage({
    showClose: true,
    message,
    type: "error"
  });
};

export { Message, successMessage, warnMessage, errorMessage };
