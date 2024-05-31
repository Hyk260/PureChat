import { ElMessage, ElMessageBox } from "element-plus";
import { $t } from "@/plugins/i18n";

// 成功
export const successMessage = (message) => {
  return ElMessage({
    showClose: true,
    message,
    type: "success",
  });
};

// 警告
export const warnMessage = (message) => {
  return ElMessage({
    showClose: true,
    message,
    type: "warning",
  });
};

// 失败
export const errorMessage = (message) => {
  return ElMessage({
    showClose: true,
    message,
    type: "error",
  });
};

export const verification = (code, msg) => {
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

/**
 * 弹出确认框
 * @param {object} data - 对话框配置选项
 * @param {string} data.message - 对话框显示内容
 * @param {string} [data.confirmText="确定"] - 确认按钮文本
 * @param {string} [data.cancelText="取消"] - 取消按钮文本
 * @param {string} [data.tip="提示"] - 对话框标题
 * @return {string} - cancel | confirm
 */
export const showConfirmationBox = async (data, Type = "confirm") => {
  const {
    message,
    confirmText = `${$t("el.datepicker.confirm")}`, //"确认",
    cancelText = `${$t("el.datepicker.cancel")}`, //"取消",
    tip = `${$t("el.messagebox.title")}`,
    iconType = "", // warning
    inputValue = "", // input
    draggable = false,
  } = data;
  try {
    const formEl = await ElMessageBox[Type](message, tip, {
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      type: iconType,
      inputValue,
      draggable,
    });
    return formEl;
  } catch (error) {
    return error;
  }
};
