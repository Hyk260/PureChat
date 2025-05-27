const TRUNCATE_LENGTH = 78;
const ELLIPSIS = '...';

/**
 * 将数据转换为 Markdown 脚注格式
 * @param data 脚注数据数组
 * @returns 格式化后的 Markdown 脚注字符串
 */
export function convertToMarkdownFootnotes(data) {
  if (!data?.length) return '';
  const truncateContent = (text) =>
    text.length > TRUNCATE_LENGTH
      ? `${text.substring(0, TRUNCATE_LENGTH)}${ELLIPSIS}`
      : text;
  const footnotes = data.map(({ id, content, sourceUrl }) => {
    const truncatedContent = truncateContent(content?.trim() || '');
    return `[^${id}]: [${truncatedContent}](${sourceUrl || '#'})`;
  });
  return `\n${footnotes.join('\n\n')}\n\n`;
}
