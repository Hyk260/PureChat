export const EPUB_RULES = {
  footnote_ref: ["<a", '<a epub:type="noteref" target="_blank" rel="noopener noreferrer"'],
  footnote_open: ["<li", '<li epub:type="footnote"'],
  footnote_anchor: ["<a", '<a aria-label="back to url"']
};

// 自定义脚注规则
export const configureFootnoteRules = (md, results = []) => {
  // 脚注引用样式 (正文中的 [^1] 样式)
  md.renderer.rules.footnote_ref = (tokens, id) => {
    const n = Number(tokens[id].meta.id + 1).toString();
    const data = results?.find((t) => t.id == n);
    if (data?.sourceUrl) {
      return `<sup class="footnote-ref"><a href="${data.sourceUrl}">[${n}]</a></sup>`;
    } else {
      return `<sup class="footnote-ref">[${n}]</sup>`;
    }
  };

  // 脚注容器 (底部脚注列表)
  md.renderer.rules.footnote_block_open = () => `
    <section class="footnotes">
      <h2 class="footnotes-title">
        参考文献
      </h2>
      <ol class="footnotes-list">
  `;

  md.renderer.rules.footnote_block_close = () => `</ol></section> `;

  md.renderer.rules.footnote_open = () => `<li class="footnote-item">`;

  md.renderer.rules.footnote_close = () => "</li>\n";

  md.renderer.rules.footnote_anchor = (tokens, id) => {
    const n = Number(tokens[id].meta.id + 1).toString();
    const data = results?.find((t) => t.id == n);
    if (data?.sourceUrl) {
      return ""
      // return `<a href="${data.sourceUrl}" target="_blank" rel="noopener noreferrer" class="footnote-backref">\u21a9\ufe0e</a>`;
    } else {
      return "";
    }
  };
}

// 链接添加 target="_blank"
export const applyLinkOpenRules = (md) => {
  md.renderer.rules.link_open = (tokens, id) => {
    tokens[id].attrSet("target", "_blank");
    tokens[id].attrSet("rel", "noopener noreferrer");
    return md.renderer.renderToken(tokens, id);
  };
}

export const applyEpubRules = (md) => {
  Object.keys(EPUB_RULES).map((rule) => {
    let defaultRender = md.renderer.rules[rule];
    md.renderer.rules[rule] = (tokens, id, options, env, self) => {
      return defaultRender(tokens, id, options, env, self).replace(...EPUB_RULES[rule]);
    };
  });
}
