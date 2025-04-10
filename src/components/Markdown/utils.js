export function convertToMarkdownFootnotes(data) {
  let result = '\n';
  data.forEach(item => {
    const shortContent = item.content.length > 100
      ? item.content.substring(0, 100) + '...'
      : item.content;
    result += ` [^${item.id}]: [${shortContent}](${item.sourceUrl})\n\n`;
  });
  result += '\n';
  return result;
}