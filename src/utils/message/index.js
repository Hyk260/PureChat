import { ElMessage } from "element-plus";

// 消息
const Message = (message) => {
  return ElMessage({
    showClose: true,
    message,
  });
};

// 成功
const successMessage = (message) => {
  return ElMessage({
    showClose: true,
    message,
    type: "success",
  });
};

// 警告
const warnMessage = (message) => {
  return ElMessage({
    showClose: true,
    message,
    type: "warning",
  });
};

// 失败
const errorMessage = (message) => {
  return ElMessage({
    showClose: true,
    message,
    type: "error",
  });
};

const verification = (code, msg) => {
  switch (code) {
    case 200:
      successMessage(msg);
      break;
    case 401:
      warnMessage(msg);
      break;
    case 400:
      warnMessage(msg);
      break;
  }
};

export { Message, successMessage, warnMessage, errorMessage, verification };
