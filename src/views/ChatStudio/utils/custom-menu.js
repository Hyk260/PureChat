import {
  IButtonMenu,
  IDomEditor,
  SlateElement,
  Boot,
} from "@wangeditor/editor";
import ctrlEnterModule from "@wangeditor/plugin-ctrl-enter";
import mentionModule, { MentionElement } from "@wangeditor/plugin-mention";
import { h, VNode } from "snabbdom";

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
function withAttachment(editor) {
  // JS 语法
  const { isInline, isVoid } = editor;
  const newEditor = editor;

  newEditor.isInline = (elem) => {
    // const type = DomEditor.getNodeType(elem);
    // if (type === "attachment") return true; // 针对 type: attachment ，设置为 inline
    return isInline(elem);
  };

  newEditor.isVoid = (elem) => {
    // const type = DomEditor.getNodeType(elem);
    // if (type === "attachment") return true; // 针对 type: attachment ，设置为 void
    return isVoid(elem);
  };

  return newEditor; // 返回 newEditor ，重要！！！
}
/**
 * 渲染“附件”元素到编辑器
 * @param elem 附件元素，即上文的 myResume
 * @param children 元素子节点，void 元素可忽略
 * @param editor 编辑器实例
 * @returns vnode 节点（通过 snabbdom.js 的 h 函数生成）
 */
function renderAttachment(elem, children, editor) {
  // 获取“附件”的数据，参考上文 myResume 数据结构
  const { fileName = "", link = "" } = elem;

  // 附件 icon 图标 vnode
  const iconVnode = h(
    // HTML tag
    "img",
    // HTML 属性
    {
      props: { src: "xxxx.png" }, // HTML 属性，驼峰式写法
      style: { width: "1em", marginRight: "0.1em" /* 其他... */ }, // HTML style ，驼峰式写法
    }
    // img 没有子节点，所以第三个参数不用写
  );

  // 附件元素 vnode
  const attachVnode = h(
    // HTML tag
    "span",
    // HTML 属性、样式、事件
    {
      props: { contentEditable: false }, // HTML 属性，驼峰式写法
      style: { display: "inline-block", marginLeft: "3px" /* 其他... */ }, // style ，驼峰式写法
      on: {
        click() {
          console.log("clicked", link);
        } /* 其他... */,
      },
    },
    // 子节点
    [iconVnode, fileName]
  );

  return attachVnode;
}

const renderElemConf = {
  type: "attachment", // 新元素 type ，重要！！！
  renderElem: renderAttachment,
};
Boot.registerRenderElem(renderElemConf);

// 注册。要在创建编辑器之前注册，且只能注册一次，不可重复注册。
Boot.registerPlugin(withAttachment);
Boot.registerMenu(menu1Conf);
Boot.registerModule(mentionModule);
Boot.registerModule(ctrlEnterModule);
