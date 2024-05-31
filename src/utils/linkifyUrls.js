const urlRegex = () =>
  /((?<!\+)https?:\/\/(?:www\.)?(?:[-\w.]+?[.@][a-zA-Z\d]{2,}|localhost)(?:[-\w.:%+~#*$!?&/=@]*?(?:,(?!\s))*?)*)/g;

const linkify = (href, options) => {
  return `<a href="${href}" class="linkUrl" target="_blank">${href}</a>`;
};

const isTruncated = (url, peek) => url.endsWith("...") || peek.startsWith("…");

const getAsString = (string, options) => {
  return string.replace(urlRegex(), (url, _, offset) => {
    return isTruncated(url, string.charAt(offset + url.length)) ? url : linkify(url, options);
  });
};

export default function linkifyUrls(string, options) {
  return getAsString(string, options);
}
