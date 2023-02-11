import { IButtonMenu, IDomEditor, Boot } from "@wangeditor/editor";
import ctrlEnterModule from "@wangeditor/plugin-ctrl-enter";
import mentionModule, { MentionElement } from "@wangeditor/plugin-mention";

class YourMenuClass {
  constructor() {
    this.title = "表情"; // 自定义菜单标题
    this.iconSvg = "🌞"; // '<svg>...</svg>'可选
    this.tag = "select"; // button select
    this.width = 44;
  }
  // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
  getValue(editor) {
    return " hello ";
  }

  // 下拉框的选项
  getOptions(editor) {
    const options = [
      { value: "beijing", text: "北京" },
      { value: "shanghai", text: "上海" },
      { value: "shenzhen", text: "深圳" },
    ];
    return options;
  }

  // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
  isActive(editor) {
    return false;
  }

  // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
  isDisabled(editor) {
    return false;
  }

  // 点击菜单时触发的函数
  exec(editor, getValue) {
    if (this.isDisabled(editor)) return;
    // editor.insertText(value) // value 即 this.value(editor) 的返回值
  }
}

const menu1Conf = {
  key: "menu1", // 定义 menu key ：要保证唯一、不重复（重要）
  factory() {
    return new YourMenuClass(); // 把 `YourMenuClass` 替换为你菜单的 class
  },
};
// 注册。要在创建编辑器之前注册，且只能注册一次，不可重复注册。
Boot.registerMenu(menu1Conf);
Boot.registerModule(mentionModule);
Boot.registerModule(ctrlEnterModule);
