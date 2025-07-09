const TRUNCATE_LENGTH = 80;
const ELLIPSIS = '...';

const truncateContent = (t) => {
  return t.length > TRUNCATE_LENGTH ? `${t.substring(0, TRUNCATE_LENGTH)}${ELLIPSIS}` : t;
}

/**
 * 将数据转换为 Markdown 脚注格式
 * @param data 脚注数据数组
 * @returns 格式化后的 Markdown 脚注字符串
 */
export function convertToMarkdownFootnotes(data) {
  if (!data?.length) return '';
  const footnotes = data.map(({ id, content, sourceUrl }) => {
    const truncatedContent = truncateContent(content?.trim() || '');
    return `[^${id}]: [${truncatedContent.replace(/\s+/g, ' ').trim()}](${sourceUrl || '#'})`;
  });
  return `\n\n${footnotes.join('\n\n')}\n\n`;
}

export const copySvg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="transparent" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>`
