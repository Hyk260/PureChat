import { ElMessageBox } from "element-plus";
import { $t } from "@/locales";

/**
 * 确认框配置选项接口
 */
export interface ConfirmationBoxOptions {
  /** 对话框显示内容 */
  message: string | VNode;
  /** 确认按钮文本，默认为"确认" */
  confirmText?: string;
  /** 取消按钮文本，默认为"取消" */
  cancelText?: string;
  /** 对话框标题，默认为"提示" */
  tip?: string;
  /** 图标类型，如 "warning" */
  iconType?: string | "success" | "warning" | "info" | "error";
  /** 输入框的初始值，用于 input 类型 */
  inputValue?: string;
  /** 是否居中显示 */
  center?: boolean;
  /** 是否可拖拽 */
  draggable?: boolean;
}

/**
 * 确认框类型枚举
 */
export type ConfirmationBoxType = "confirm" | "alert" | "prompt";

/**
 * 确认框返回值类型
 */
export type ConfirmationBoxResult = string | Error;

/**
 * 弹出确认框
 * @param data - 对话框配置选项
 * @param Type - 对话框类型，默认为 "confirm"
 * @returns Promise<string | Error> - 返回用户操作结果或错误
 */
export const showConfirmationBox = async (
  data: ConfirmationBoxOptions,
  Type: ConfirmationBoxType = "confirm"
): Promise<ConfirmationBoxResult> => {
  const {
    message,
    confirmText = `${$t('common.confirm')}`,
    cancelText = `${$t('common.cancel')}`,
    tip = `${$t("messageBox.title")}`,
    iconType = "",
    inputValue = "",
    center = false,
    draggable = false,
  } = data;

  try {
    const options: Record<string, any> = {
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      inputValue,
      center,
      lockScroll: false,
      draggable,
    };

    if (iconType) {
      options.type = iconType;
    }

    const formEl: string = await ElMessageBox[Type](message, tip, options);
    return formEl;
  } catch (error) {
    return error as Error;
  }
};
