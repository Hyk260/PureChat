import { ElMessageBox } from "element-plus";
import { $t } from "@/locales/index";

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
    confirmText = `${$t('common.confirm') }`, //"确认",
    cancelText = `${$t('common.cancel') }`, //"取消",
    tip = `${$t("messageBox.title")}`,
    iconType = "", // warning
    inputValue = "", // input
    center = false,
    draggable = false,
  } = data;
  try {
    const formEl = await ElMessageBox[Type](message, tip, {
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      type: iconType,
      inputValue,
      center,
      lockScroll: false,
      draggable,
    });
    return formEl;
  } catch (error) {
    return error;
  }
};
