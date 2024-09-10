import withMention from "./plugin";
import renderElemConf from "./render-elem";
import elemToHtmlConf from "./elem-to-html";
import parseHtmlConf from "./parse-elem-html";

const module = {
  editorPlugin: withMention,
  renderElems: [renderElemConf],
  elemsToHtml: [elemToHtmlConf],
  parseElemsHtml: [parseHtmlConf],
};

export default module;
